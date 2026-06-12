import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function AnalysisResult({ result , darkMode}) {
  if (!result) return null;

  return (
    <div>

      <h2 className="text-3xl font-bold mb-8 text-center">
        Resume Analysis Report
      </h2>

      {/* Score Section */}

      <div className="grid md:grid-cols-2 gap-8 mb-10">

        <div
  className={`rounded-2xl p-6 shadow ${
    darkMode
      ? "bg-slate-800 text-white"
      : "bg-slate-50 text-black"
  }`}
>
          <h3 className="text-center font-semibold mb-4">
            Keyword Match Score
          </h3>

          <div className="w-40 h-40 mx-auto">
            <CircularProgressbar
              value={result.keyword_match_score}
              text={`${result.keyword_match_score}%`}
              styles={buildStyles({
                pathColor: "#2563eb",
                textColor: "#2563eb",
              })}
            />
          </div>
        </div>

        <div
  className={`rounded-2xl p-6 shadow ${
    darkMode
      ? "bg-slate-800 text-white"
      : "bg-slate-50 text-black"
  }`}
>
          <h3 className="text-center font-semibold mb-4">
            ATS Score
          </h3>

          <div className="w-40 h-40 mx-auto">
            <CircularProgressbar
              value={
                result.ai_feedback.ats_score_estimate
              }
              text={`${result.ai_feedback.ats_score_estimate}%`}
              styles={buildStyles({
                pathColor: "#16a34a",
                textColor: "#16a34a",
              })}
            />
          </div>
        </div>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* Missing Skills */}

        <div
  className={`rounded-2xl p-5 shadow ${
    darkMode
      ? "bg-red-950 text-white"
      : "bg-red-50 text-black"
  }`}
>

          <h3 className="text-xl font-bold mb-4 text-red-600">
            🚨 Skill Gaps
          </h3>

          <ul className="space-y-2">

            {result.ai_feedback.missing_skills.map(
              (skill, index) => (
                <li key={index}>
                  • {skill}
                </li>
              )
            )}

          </ul>

        </div>

        {/* Strengths */}

        <div
  className={`rounded-2xl p-5 shadow ${
    darkMode
      ? "bg-green-950 text-white"
      : "bg-green-50 text-black"
  }`}
>

          <h3 className="text-xl font-bold mb-4 text-green-600">
            ✅ Strengths
          </h3>

          <ul className="space-y-2">

            {result.ai_feedback.strengths.map(
              (item, index) => (
                <li key={index}>
                  • {item}
                </li>
              )
            )}

          </ul>

        </div>

        {/* Improvements */}

        <div
  className={`rounded-2xl p-5 shadow ${
    darkMode
      ? "bg-yellow-950 text-white"
      : "bg-yellow-50 text-black"
  }`}
>

          <h3 className="text-xl font-bold mb-4 text-yellow-600">
            🚀 Improvements
          </h3>

          <ul className="space-y-2">

            {result.ai_feedback.improvements.map(
              (item, index) => (
                <li key={index}>
                  • {item}
                </li>
              )
            )}

          </ul>

        </div>

      </div>

    </div>
  );
}

export default AnalysisResult;