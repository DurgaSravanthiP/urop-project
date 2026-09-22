import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { analyzeScan, savePrediction } from "../services/diagnosisService";

export default function DiagnosisPage() {
  const [modality, setModality] = useState("MRI");
  const [patientId, setPatientId] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [saving, setSaving] = useState(false);
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

  const handleAnalyze = async (event) => {
    event.preventDefault();
    if (!imageFile || !patientId.trim()) return;
    setError("");
    try {
      const created = await analyzeScan({
        imageFile,
        patientId,
        modality,
        age,
        gender,
      });
      setAnalysis(created);
      setAnalyzed(true);
    } catch (requestError) {
      setError(requestError.message || "Unable to create analysis.");
    }
  };

  const handleSave = async () => {
    if (!analysis?._id) return;
    setSaving(true);
    try {
      setAnalysis(await savePrediction(analysis._id));
    } catch (requestError) {
      setError(requestError.message || "Unable to save result.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="page-intro">
        <span className="eyebrow">New analysis</span>
        <h2>Analyze a scan</h2>
        <p>
          Select a modality, add the minimum patient context, and upload an
          image for model analysis.
        </p>
      </div>
      <div className="analysis-grid">
        <form className="surface" onSubmit={handleAnalyze}>
          <div className="surface-header">
            <div>
              <h3>Scan details</h3>
              <p>Choose the model pathway for this case.</p>
            </div>
            <span className="status-pill teal">Step 1 of 2</span>
          </div>
          <div className="surface-body">
            <label className="field-label">Select imaging modality</label>
            <div className="modality-toggle">
              {["MRI", "CT"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`modality-option ${modality === item ? "active" : ""}`}
                  onClick={() => {
                    setModality(item);
                    setAnalyzed(false);
                  }}
                >
                  {item === "MRI" ? "Brain MRI" : "Lung CT"}
                  <small className="block mt-1 font-normal opacity-70">
                    {item === "MRI" ? "Neuro imaging" : "Thoracic imaging"}
                  </small>
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="patient-id">
                  Patient ID
                </label>
                <input
                  id="patient-id"
                  className="field-input"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  placeholder="e.g. P-004"
                  required
                />
              </div>
              <div>
                <label className="field-label" htmlFor="age">
                  Age
                </label>
                <input
                  id="age"
                  className="field-input"
                  type="number"
                  min="0"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Years"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  className="field-input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>
            <label className="field-label mt-6">Upload {modality} image</label>
            <div className="upload-zone">
              {previewUrl ? (
                <img src={previewUrl} alt="Uploaded scan preview" />
              ) : (
                <div>
                  <strong className="block text-[#18324b]">
                    Choose an image to begin
                  </strong>
                  <span className="mt-1 block text-xs text-[#728494]">
                    JPG, PNG or DICOM preview for the frontend demo
                  </span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImageFile(e.target.files?.[0] || null);
                  setAnalyzed(false);
                }}
              />
            </div>
            <button className="primary-btn mt-5 w-full" type="submit">
              Analyze {modality}
            </button>
            {error ? (
              <p className="mt-3 text-center text-sm text-red-700">{error}</p>
            ) : null}
            {!imageFile || !patientId.trim() ? (
              <p className="mt-3 text-center text-xs text-[#728494]">
                Add a Patient ID and image to enable the demo result.
              </p>
            ) : null}
          </div>
        </form>

        <section className="surface">
          <div className="surface-header">
            <div>
              <h3>Analysis result</h3>
              <p>Model output will appear here after analysis.</p>
            </div>
            <span className="status-pill slate">Frontend preview</span>
          </div>
          <div className="surface-body">
            <div className="result-preview">
              {previewUrl ? (
                <img src={previewUrl} alt="Uploaded scan" />
              ) : (
                "Uploaded image preview"
              )}
            </div>
            {analyzed ? (
              <>
                <div className="result-list">
                  <div className="result-row">
                    <span>Prediction</span>
                    <strong>
                      {analysis?.prediction || "Pending model connection"}
                    </strong>
                  </div>
                  <div className="result-row">
                    <span>Disease type</span>
                    <strong>
                      {analysis?.diseaseType || "Dataset label pending"}
                    </strong>
                  </div>
                  <div className="result-row">
                    <span>Confidence</span>
                    <strong>
                      {analysis?.confidence == null
                        ? "--"
                        : `${analysis.confidence}%`}
                    </strong>
                  </div>
                  <div className="result-row">
                    <span>Model</span>
                    <strong>
                      {analysis?.modelName ||
                        `${modality} classification model`}
                    </strong>
                  </div>
                </div>
                <button
                  className="secondary-btn w-full"
                  type="button"
                  onClick={handleSave}
                  disabled={saving || analysis?.saved}
                >
                  {analysis?.saved
                    ? "Result Saved"
                    : saving
                      ? "Saving..."
                      : "Save Result"}
                </button>
              </>
            ) : (
              <div className="py-8 text-center">
                <p className="font-semibold text-[#18324b]">
                  Ready when you are
                </p>
                <p className="mt-2 text-sm leading-6 text-[#728494]">
                  Your prediction card will show only labels returned by the
                  connected dataset model.
                </p>
                <Link
                  to="/how-it-works"
                  className="mt-4 inline-block text-sm font-bold text-[#087f8c]"
                >
                  View the workflow
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
