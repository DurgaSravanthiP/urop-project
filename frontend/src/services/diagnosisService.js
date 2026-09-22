/**
 * Placeholder API layer for future integration:
 * React → Node/Express → Python ML (CNN + NLP + Fusion) → Prediction
 */

import { MOCK_HISTORY } from '../data/mockData.js'

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

/**
 * @param {{ imageFile: File | null, symptomsText: string, selectedSymptoms: string[] }} payload
 * @returns {Promise<object>}
 */
export async function analyzeDiagnosis(payload) {
  // TODO: replace with fetch(`${API_BASE}/diagnosis/analyze`, { method: 'POST', body: formData })
  void API_BASE
  void payload

  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    isDemo: true,
    label: 'Demo Prediction',
    condition: 'Brain Tumor',
    confidence: 92,
    recommendation:
      'Please consult a qualified healthcare professional for proper evaluation and diagnosis.',
    imageAnalysis: {
      title: 'CNN-based image analysis',
      detail: 'Visual features extracted from uploaded medical image (placeholder).',
    },
    symptomAnalysis: {
      title: 'NLP-based symptom analysis',
      detail: 'Symptoms processed from text and selected chips (placeholder).',
    },
    multimodal: {
      title: 'Multimodal fusion',
      detail: 'Image and symptom information combined for prediction (placeholder).',
    },
  }
}

export async function fetchPredictionHistory() {
  // TODO: fetch(`${API_BASE}/diagnosis/history`)
  void API_BASE
  return MOCK_HISTORY
}
