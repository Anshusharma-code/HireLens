import { useState } from "react";
import API from "../services/api";

function JobDescriptionInput({
  resumeId,
  setAnalysisResult,
  darkMode,
}) {
  const [jobDescription, setJobDescription] =
    useState("");

  const handleAnalyze = async () => {
    if (!resumeId) {
      alert("Upload resume first");
      return;
    }

    try {
      const response = await API.post(
        "/resume/full-analysis",
        {
          resume_id: resumeId,
          job_description: jobDescription,
        }
      );

      setAnalysisResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
  Job Description
</h2>

      <textarea
  rows="8"
  value={jobDescription}
  onChange={(e) =>
    setJobDescription(e.target.value)
  }
  placeholder="Paste Job Description Here..."
  className={`
    w-full
    h-56
    p-4
    rounded-2xl
    border
    shadow
    outline-none
    focus:ring-2
    focus:ring-blue-500
    mb-4
    ${
      darkMode
        ? "bg-slate-800 text-white border-slate-700 placeholder:text-slate-400"
        : "bg-white text-black border-gray-300 placeholder:text-gray-400"
    }
  `}
/>

      <br />

      <button
  onClick={handleAnalyze}
  className="
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-6
    py-3
    rounded-xl
    font-semibold
    shadow-lg
    transition-all
    hover:scale-105
  "
>
  Analyze 
</button>
    </div>
  );
}

export default JobDescriptionInput;