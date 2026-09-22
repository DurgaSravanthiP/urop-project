const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

function authHeaders() {
  try {
    const stored = JSON.parse(localStorage.getItem("mediscan_auth") || "null");
    return stored?.token ? { Authorization: `Bearer ${stored.token}` } : {};
  } catch {
    return {};
  }
}

async function readResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

/**
 * @param {{ imageFile: File | null, symptomsText: string, selectedSymptoms: string[] }} payload
 * @returns {Promise<object>}
 */
export async function analyzeScan({ imageFile, scanType }) {
  const formData = new FormData();
  formData.append("scanType", scanType);
  if (imageFile) formData.append("image", imageFile);

  const response = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  });

  const data = await readResponse(response);
  return data;
}

export async function fetchPredictionHistory() {
  const response = await fetch(`${API_BASE}/analysis/history`, {
    headers: authHeaders(),
  });
  const data = await readResponse(response);
  return data.history || [];
}

export async function fetchAnalysisById(id) {
  const response = await fetch(`${API_BASE}/analysis/${id}`, {
    headers: authHeaders(),
  });
  const data = await readResponse(response);
  return data.analysis;
}

export async function savePrediction(id) {
  return fetchAnalysisById(id);
}
