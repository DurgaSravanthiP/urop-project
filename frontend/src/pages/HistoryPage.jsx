import { useEffect, useState } from "react";
import { fetchPredictionHistory } from "../services/diagnosisService";

function formatScanName(scanType) {
  if (scanType === "brain_mri") return "Brain MRI";
  if (scanType === "lung_ct") return "Lung CT";
  return scanType;
}

export default function HistoryPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPredictionHistory()
      .then((data) => setRows(data))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          History
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          Analysis History
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                Date
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                Scan Type
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                Prediction
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                Confidence
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-6 text-center text-slate-500"
                >
                  Loading history...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No analysis records yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {new Date(row.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {formatScanName(row.scanType)}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">
                    {row.prediction}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {Number(row.confidence).toFixed(2)}%
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
