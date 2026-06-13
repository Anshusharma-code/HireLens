from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import shutil
import os

from app.database.dependencies import get_db
from app.database.models import Resume
from app.services.resume_parser import extract_text_from_pdf
from app.schemas.analysis import AnalyzeRequest
from app.services.ats_scorer import calculate_match_score
from app.schemas.ai_feedback import AIFeedbackRequest
from app.services.gemini_service import (
    analyze_resume_with_gemini
)

router = APIRouter()


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Save uploaded file
    os.makedirs("uploads", exist_ok=True)
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from PDF
    extracted_text = extract_text_from_pdf(file_path)

    # Save metadata + extracted text in database
    resume = Resume(
        filename=file.filename,
        filepath=file_path,
        extracted_text=extracted_text
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "id": resume.id,
        "filename": resume.filename,
        "filepath": resume.filepath,
        "text_preview": extracted_text[:200]
    }
@router.post("/analyze")
def analyze_resume(
    request: AnalyzeRequest,
    db: Session = Depends(get_db)
):
    resume = db.query(Resume).filter(
        Resume.id == request.resume_id
    ).first()

    if not resume:
        return {
            "error": "Resume not found"
        }

    score = calculate_match_score(
        resume.extracted_text,
        request.job_description
    )

    return {
        "resume_id": resume.id,
        "filename": resume.filename,
        "match_score": score
    }
@router.post("/ai-feedback")
def ai_feedback(
    request: AIFeedbackRequest,
    db: Session = Depends(get_db)
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == request.resume_id
        )
        .first()
    )

    if not resume:
        return {
            "error": "Resume not found"
        }

    result = analyze_resume_with_gemini(
        resume.extracted_text,
        request.job_description
    )

    return result
@router.post("/full-analysis")
def full_analysis(
    request: AIFeedbackRequest,
    db: Session = Depends(get_db)
):
    try:
        resume = (
            db.query(Resume)
            .filter(
                Resume.id == request.resume_id
            )
            .first()
        )

        if not resume:
            return {
                "error": "Resume not found"
            }

        keyword_match_score = calculate_match_score(
            resume.extracted_text,
            request.job_description
        )

        ai_feedback = analyze_resume_with_gemini(
            resume.extracted_text,
            request.job_description
        )

        return {
            "resume_id": resume.id,
            "filename": resume.filename,
            "keyword_match_score": keyword_match_score,
            "ai_feedback": ai_feedback
        }

    except Exception as e:
        return {
            "error": str(e)
        }