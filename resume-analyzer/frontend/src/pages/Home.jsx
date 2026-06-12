import { useState } from "react";
import UploadForm from "../components/UploadForm";
import JobDescriptionInput from "../components/JobDescriptionInput";
import AnalysisResult from "../components/AnalysisResult";

function Home() {
  const [resumeId, setResumeId] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
  className={`min-h-screen ${
    darkMode
      ? "bg-slate-950 text-white"
      : "bg-slate-100 text-black"
  }`}
>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-Blue-600 via-violet-600 to-black-600 text-white">

        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="flex justify-end mb-6">

  <button
    onClick={() =>
      setDarkMode(!darkMode)
    }
    className="
      bg-white/20
      px-4
      py-2
      rounded-xl
      backdrop-blur
      hover:bg-white/30
      transition
    "
  >
    {darkMode ? "☀ Light" : "🌙 Dark"}
  </button>

</div>

          <h1 className="text-6xl font-extrabold mb-4">
            HireLens
          </h1>

          <p className="text-xl md:text-2xl opacity-90">
            Optimize. Analyze. Get Hired.
          </p>

          <p className="mt-4 text-lg opacity-80">
            ATS scoring, skill-gap analysis, and AI-powered career insights.
          </p>

        </div>

      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6 -mt-10">

        <div
  className={`
    rounded-2xl
    shadow-xl
    p-6
    mb-6
    ${
      darkMode
        ? "bg-slate-900"
        : "bg-white"
    }
  `}
>
          <UploadForm
  setResumeId={setResumeId}
  darkMode={darkMode}
/>
        </div>

        <div
  className={`
    rounded-2xl
    shadow-xl
    p-6
    mb-6
    ${
      darkMode
        ? "bg-slate-900"
        : "bg-white"
    }
  `}
>
          <JobDescriptionInput
            resumeId={resumeId}
            setAnalysisResult={setAnalysisResult}
            darkMode={darkMode}
          />
        </div>

        {analysisResult && (
          <div
  className={`
    rounded-2xl
    shadow-xl
    p-6
    mb-6
    ${
      darkMode
        ? "bg-slate-900"
        : "bg-white"
    }
  `}
>
            <AnalysisResult result={analysisResult}
            darkMode={darkMode} />
          </div>
        )}

      </div>

    </div>
  );
}

export default Home;