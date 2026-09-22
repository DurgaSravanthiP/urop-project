import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { fetchPredictionHistory } from "../services/diagnosisService";

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "Doctor";
  const [analyses, setAnalyses] = useState([]);
  useEffect(() => {
    fetchPredictionHistory()
      .then(setAnalyses)
      .catch(() => setAnalyses([]));
  }, []);
  const recentAnalyses = analyses.slice(0, 5);
  const mriCount = analyses.filter((item) => item.modality === "MRI").length;
  const ctCount = analyses.filter((item) => item.modality === "CT").length;

  return (
    <div className="mx-auto max-w-7xl">
      <section className="dashboard-hero">
        <div>
          <span className="eyebrow" style={{ color: "#9de3dd" }}>
            Clinical workspace
          </span>
          <h2>Welcome, Dr. {firstName}</h2>
          <p>
            AI-assisted medical image analysis for MRI and CT scans, designed to
            support your clinical review workflow.
          </p>
        </div>
        <Link to="/analyze" className="primary-btn">
          Start New Analysis
        </Link>
      </section>

      <section className="stat-grid" aria-label="Analysis statistics">
        <div className="surface stat-card">
          <span>Total cases</span>
          <strong>{analyses.length}</strong>
          <small>MongoDB records</small>
        </div>
        <div className="surface stat-card">
          <span>MRI cases</span>
          <strong>{mriCount}</strong>
          <small>Brain imaging</small>
        </div>
        <div className="surface stat-card">
          <span>CT cases</span>
          <strong>{ctCount}</strong>
          <small>Lung imaging</small>
        </div>
      </section>

      <section className="surface mt-6">
        <div className="surface-header">
          <div>
            <h3>Recent analyses</h3>
            <p>Your latest scan reviews at a glance.</p>
          </div>
          <Link to="/history" className="link-btn">
            View history
          </Link>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Scan type</th>
                <th>Prediction</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentAnalyses.map((row) => (
                <tr key={row._id}>
                  <td>{row.patientId}</td>
                  <td>{row.modality}</td>
                  <td>
                    <span className={`status-pill ${row.tone}`}>
                      {row.prediction}
                    </span>
                  </td>
                  <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to="/history" className="link-btn">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
