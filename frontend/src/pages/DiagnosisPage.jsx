import { useEffect, useState } from "react";
import { analyzeScan } from "../services/diagnosisService";

const scanOptions = [
  {
    key: "brain_mri",
    label: "Brain MRI",
    uploadText: "Upload a brain MRI image",
  },
  { key: "lung_ct", label: "Lung CT", uploadText: "Upload a lung CT image" },
];

export default function DiagnosisPage() {
  const [selectedScan, setSelectedScan] = useState("brain_mri");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return undefined;
    }

    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const selectedOption =
    scanOptions.find((option) => option.key === selectedScan) || scanOptions[0];

  const handleAnalyze = async (event) => {
    event.preventDefault();
    if (!imageFile) {
      setError("Please upload an image.");
      return;
    }

    setError("");
    setIsAnalyzing(true);

    try {
      const result = await analyzeScan({ imageFile, scanType: selectedScan });
      setAnalysis({
        ...result,
        scanType: result.scanType || selectedScan,
        confidence: Number(result.confidence),
      });
    } catch (requestError) {
      setError(requestError.message || "Unable to analyze image.");
      setAnalysis(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          Research Tool
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          Medical Image Analysis
        </h2>
      </div>

      <form onSubmit={handleAnalyze} className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-700">
            Select a scan type
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {scanOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => {
                  setSelectedScan(option.key);
                  setAnalysis(null);
                  setError("");
                }}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  selectedScan === option.key
                    ? "border-teal-500 bg-teal-50 text-teal-800 shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
                }`}
              >
                <div className="text-base font-bold">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-700">
            {selectedOption.uploadText}
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageFile(e.target.files?.[0] || null);
              setError("");
              setAnalysis(null);
            }}
            className="block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-teal-600 file:px-3 file:py-2 file:text-white"
          />
        </div>

        {previewUrl && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <img
              src={previewUrl}
              alt="Selected upload preview"
              className="max-h-72 w-full rounded-xl object-contain"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!imageFile || isAnalyzing}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isAnalyzing ? "Analyzing image..." : "Analyze Image"}
        </button>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {analysis && (
          <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-slate-800">
                Model Prediction
              </h3>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm">
                {analysis.scanType === "brain_mri" ? "Brain MRI" : "Lung CT"}
              </span>
            </div>

            <div className="space-y-3 text-slate-700">
              <p>
                <span className="font-semibold">Prediction:</span>{" "}
                {analysis.prediction}
              </p>
              <p>
                <span className="font-semibold">Confidence Score:</span>{" "}
                {Number(analysis.confidence).toFixed(2)}%
              </p>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          This system is developed for educational and research purposes and is
          not a substitute for professional medical diagnosis.
        </div>
      </form>
    </div>
  );
}
