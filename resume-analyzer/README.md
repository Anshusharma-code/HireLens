# HireLens 

HireLens is an AI-powered Resume Analyzer that helps job seekers evaluate their resumes against job descriptions using ATS scoring, keyword matching, and AI-generated feedback.

## Features

* Resume Upload (PDF)
* AI-Powered Resume Analysis using Gemini
* ATS Score Estimation
* Keyword Match Scoring
* Skill Gap Detection
* Resume Strength Analysis
* Personalized Improvement Suggestions
* Dark Mode Support
* Interactive Score Visualizations


## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Circular Progressbar

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Python

### AI & Machine Learning

* Google Gemini API
* Scikit-Learn (TF-IDF Similarity)
* Resume Parsing

---

## Project Architecture

AI RESUME ANALYZER/
│──resume-analyzer
    │
    ├── frontend/
    │   ├── src/
    │   ├── public/
    │   ├── package.json
    │   └── vite.config.js
    │
    ├── backend/
    │   ├── app/
    │   ├── uploads/
    │   ├── requirements.txt
    │   └── .env
    │
    └── README.md

---

## How It Works

1. Upload a resume in PDF format.
2. Resume text is extracted and stored.
3. Enter a job description.
4. TF-IDF similarity calculates keyword match score.
5. Gemini AI analyzes the resume against the job description.
6. HireLens generates:

   * ATS Score
   * Missing Skills
   * Strengths
   * Improvement Suggestions

---

## Installation

### Clone Repository

git clone https://github.com/Anshusharma-code/HireLens.git

cd resume-analyzer

---

### Backend Setup

cd backend

pip install -r requirements.txt

Create a .env file:

DATABASE_URL=your_database_url

GEMINI_API_KEY=your_gemini_api_key

Run Backend:

uvicorn app.main:app --reload

Backend URL:

http://127.0.0.1:8000

---

### Frontend Setup

cd frontend

npm install

npm run dev

Frontend URL:

http://localhost:5173

---

## Future Improvements

* Resume Download Feature
* Resume Version Tracking
* Interview Question Generator
* AI Career Roadmap Generator
* Resume Template Suggestions
* User Authentication
* Cloud File Storage

---

## Author

Anshu Sharma

B.Tech Student | AI/ML Enthusiast | Python Developer

Passionate about building AI-powered applications that solve real-world problems.


## License

This project is developed for educational and portfolio purposes.
