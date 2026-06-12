from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.resume import router as resume_router

from app.database.db import engine
from app.database.models import Base

# Create tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routes
app.include_router(
    resume_router,
    prefix="/resume",
    tags=["Resume"]
)

# Root Endpoint
@app.get("/")
def root():
    return {
        "message": "Resume Analyzer API"
    }