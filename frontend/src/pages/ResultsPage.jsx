import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";

export default function ResultsPage() {
  const { state } = useLocation();
  const result = state?.result || {
    scanType: "brain_mri",
    prediction: "Tumor",
    confidence: 91.35,
  };

  const scanLabel = result.scanType === "lung_ct" ? "Lung CT" : "Brain MRI";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          Prediction Result
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">{scanLabel}</h2>

        <div className="mt-6 space-y-4 text-slate-700">
          <p>
            <span className="font-semibold">Model Prediction:</span>{" "}
            {result.prediction}
          </p>
          <p>
            <span className="font-semibold">Confidence Score:</span>{" "}
            {Number(result.confidence).toFixed(2)}%
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          This system is developed for educational and research purposes and is
          not a substitute for professional medical diagnosis.
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/analyze">
          <Button>Back to Analysis</Button>
        </Link>
        <Link to="/history">
          <Button variant="secondary">View History</Button>
        </Link>
      </div>
    </div>
  );
}
