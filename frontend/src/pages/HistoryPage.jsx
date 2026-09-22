import { useMemo, useState } from "react";
import { useEffect } from "react";
import { fetchPredictionHistory } from "../services/diagnosisService";

export default function HistoryPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchPredictionHistory()
      .then(setRows)
      .catch(() => setRows([]));
  }, []);
  const filtered = useMemo(
    () =>
      rows.filter(
        (row) =>
          row.patientId.toLowerCase().includes(query.toLowerCase()) &&
          (filter === "All" || row.modality === filter),
      ),
    [rows, query, filter],
  );
  return (
    <div className="mx-auto max-w-7xl">
      <div className="page-intro">
        <span className="eyebrow">Case archive</span>
        <h2>Analysis history</h2>
        <p>
          Review previous scan analyses. Live records will be loaded from
          MongoDB in the next integration phase.
        </p>
      </div>
      <section className="surface">
        <div className="surface-header">
          <div>
            <h3>All analyses</h3>
            <p>Search by patient ID or narrow the list by modality.</p>
          </div>
          <div className="flex gap-2">
            <button
              className={`secondary-btn ${filter === "All" ? "!border-[#087f8c] !text-[#087f8c]" : ""}`}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            <button
              className={`secondary-btn ${filter === "MRI" ? "!border-[#087f8c] !text-[#087f8c]" : ""}`}
              onClick={() => setFilter("MRI")}
            >
              MRI
            </button>
            <button
              className={`secondary-btn ${filter === "CT" ? "!border-[#087f8c] !text-[#087f8c]" : ""}`}
              onClick={() => setFilter("CT")}
            >
              CT
            </button>
          </div>
        </div>
        <div className="surface-body">
          <label className="field-label" htmlFor="history-search">
            Search patient ID
          </label>
          <input
            id="history-search"
            className="field-input max-w-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search P-001"
          />
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Scan</th>
                <th>Prediction</th>
                <th>Disease type</th>
                <th>Confidence</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>{row.patientId}</td>
                  <td>{row.modality}</td>
                  <td>
                    <span className="status-pill amber">{row.prediction}</span>
                  </td>
                  <td>{row.diseaseType}</td>
                  <td>
                    {row.confidence == null ? "--" : `${row.confidence}%`}
                  </td>
                  <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="link-btn"
                      onClick={() => setSelected(row)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected && (
          <div className="m-5 rounded-xl border border-[#dbe8ed] bg-[#f6fbfc] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">Case details</p>
                <h3 className="mt-1 text-lg font-bold text-[#18324b]">
                  {selected.patientId} / {selected.modality}
                </h3>
              </div>
              <button className="link-btn" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#728494]">
              Prediction details will be populated by the connected{" "}
              {selected.modality} model. No personal patient information is
              displayed in this workspace.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
