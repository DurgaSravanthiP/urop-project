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
export async function analyzeScan({
  imageFile,
  patientId,
  modality,
  age,
  gender,
}) {
  const formData = new FormData();
  formData.append("patientId", patientId);
  formData.append("modality", modality);
  if (age) formData.append("age", age);
  if (gender) formData.append("gender", gender);
  if (imageFile) formData.append("image", imageFile);
  const response = await fetch(`${API_BASE}/analyses`, {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  });
  return (await readResponse(response)).analysis;
}

export async function fetchPredictionHistory() {
  const response = await fetch(`${API_BASE}/analyses`, {
    headers: authHeaders(),
  });
  return (await readResponse(response)).analyses;
}

export async function savePrediction(id) {
  const response = await fetch(`${API_BASE}/analyses/${id}/save`, {
    method: "PATCH",
    headers: authHeaders(),
  });
  return (await readResponse(response)).analysis;
}
