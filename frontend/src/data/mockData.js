export const MOCK_USER = {
  name: 'Demo User',
  email: 'demo@mediscan.ai',
  totalAnalyses: 12,
  recentActivity: [
    'Completed brain MRI analysis — 2 days ago',
    'Viewed prediction history — 5 days ago',
    'Chest X-ray + symptoms analysis — 1 week ago',
  ],
}

export const MOCK_HISTORY = [
  {
    id: '1',
    date: '2026-03-10',
    inputType: 'Brain MRI + Symptoms',
    prediction: 'Brain Tumor',
    confidence: 92,
    condition: 'Brain Tumor',
    recommendation:
      'Please consult a qualified healthcare professional for proper evaluation and diagnosis.',
    imageAnalysis: 'CNN-based image analysis — visual features extracted (demo)',
    symptomAnalysis: 'NLP-based symptom analysis — headache, nausea processed (demo)',
    multimodal: 'Image and symptom features combined for multimodal prediction (demo)',
  },
  {
    id: '2',
    date: '2026-03-05',
    inputType: 'Chest X-Ray + Symptoms',
    prediction: 'Pneumonia',
    confidence: 88,
    condition: 'Pneumonia',
    recommendation:
      'Please consult a qualified healthcare professional for proper evaluation and diagnosis.',
    imageAnalysis: 'CNN-based image analysis — visual features extracted (demo)',
    symptomAnalysis: 'NLP-based symptom analysis — fever, fatigue processed (demo)',
    multimodal: 'Image and symptom features combined for multimodal prediction (demo)',
  },
  {
    id: '3',
    date: '2026-02-28',
    inputType: 'CT Scan + Symptoms',
    prediction: 'Normal (no significant findings)',
    confidence: 76,
    condition: 'Normal (no significant findings)',
    recommendation:
      'Please consult a qualified healthcare professional for proper evaluation and diagnosis.',
    imageAnalysis: 'CNN-based image analysis — visual features extracted (demo)',
    symptomAnalysis: 'NLP-based symptom analysis — mild dizziness processed (demo)',
    multimodal: 'Image and symptom features combined for multimodal prediction (demo)',
  },
]

export const COMMON_SYMPTOMS = [
  'Headache',
  'Nausea',
  'Fever',
  'Dizziness',
  'Fatigue',
  'Weakness',
  'Blurred Vision',
]
