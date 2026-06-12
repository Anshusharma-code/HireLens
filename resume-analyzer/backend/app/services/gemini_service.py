import os
import json
import google.generativeai as genai

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_resume_with_gemini(
    resume_text: str,
    job_description: str
):
    prompt = f"""
You are an ATS Resume Expert.

Analyze the resume against the job description.

IMPORTANT RULES:

- Return ONLY valid JSON.
- No markdown.
- No explanations.
- Keep every point SHORT.
- Maximum 5 words per point.
- Maximum 5 strengths.
- Maximum 5 improvements.
- Maximum 5 missing skills.
- Use concise dashboard-friendly phrases.

Resume:
{resume_text}

Job Description:
{job_description}

Return format:

{{
  "missing_skills": [],
  "strengths": [],
  "improvements": [],
  "ats_score_estimate": 0
}}
"""

    response = model.generate_content(prompt)

    try:
        cleaned_text = response.text.strip()

        cleaned_text = cleaned_text.replace(
        "```json", ""
        )

        cleaned_text = cleaned_text.replace(
        "```", ""
        )

        cleaned_text = cleaned_text.strip()

        return json.loads(cleaned_text)

    except Exception as e:
        return {
        "error": str(e),
        "raw_response": response.text
    }