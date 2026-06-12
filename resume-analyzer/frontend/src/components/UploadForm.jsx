import { useState } from "react";
import API from "../services/api";

function UploadForm({ setResumeId ,
  darkMode}) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await API.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResumeId(response.data.id);

      alert(
        `Resume uploaded successfully! ID: ${response.data.id}`
      );
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };
  return (
  <div>

    <h2 className="text-3xl font-bold mb-6">
      Upload Resume
    </h2>

    <div
  className={`
    border-2
    border-dashed
    border-blue-400
    rounded-2xl
    p-10
    text-center
    ${
      darkMode
        ? "bg-slate-800 text-white"
        : "bg-blue-50 text-black"
    }
  `}
>

      <p className="text-lg font-medium mb-3">
        Drag & Drop Resume PDF
      </p>

      <p
  className={`mb-4 ${
    darkMode
      ? "text-gray-300"
      : "text-gray-500"
  }`}
>
        or click below to browse
      </p>

   <label
  className="
    inline-block
    bg-slate-800
    text-white
    px-6
    py-3
    rounded-xl
    shadow-lg
    cursor-pointer
    hover:bg-slate-700
    transition
    mb-4
  "
>
  Choose Resume

  <input
    type="file"
    accept=".pdf"
    hidden
    onChange={(e) =>
      setFile(e.target.files[0])
    }
  />
</label>

      {file && (
        <p className="text-green-600 font-semibold mb-4">
          {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
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
         Upload Resume
      </button>

    </div>

  </div>
);
}

export default UploadForm;