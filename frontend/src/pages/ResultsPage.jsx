import { Link, useLocation, useParams } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import ConfidenceScore from '../components/ConfidenceScore'
import PredictionCard from '../components/PredictionCard'
import Disclaimer from '../components/Disclaimer'
import { MOCK_HISTORY } from '../data/mockData'

const defaultDemoResult = {
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

function historyToResult(entry) {
  return {
    isDemo: true,
    label: 'Demo Prediction (History)',
    condition: entry.condition,
    confidence: entry.confidence,
    recommendation: entry.recommendation,
    imageAnalysis: { title: 'Image Analysis', detail: entry.imageAnalysis },
    symptomAnalysis: { title: 'Symptom Analysis', detail: entry.symptomAnalysis },
    multimodal: { title: 'Multimodal Analysis', detail: entry.multimodal },
  }
}

export default function ResultsPage() {
  const { state } = useLocation()
  const { id } = useParams()

  let result = state?.result
  if (!result && id) {
    const entry = MOCK_HISTORY.find((h) => h.id === id)
    if (entry) result = historyToResult(entry)
  }
  if (!result) result = defaultDemoResult

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
          {result.label || 'Demo Prediction'}
        </span>
        <span className="text-sm text-slate-500">Not connected to a live ML model</span>
      </div>

      <Card>
        <p className="text-sm font-medium text-slate-500">Prediction</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">
          Possible Condition: {result.condition}
        </h2>
        <div className="mt-6">
          <ConfidenceScore value={result.confidence} />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <PredictionCard title="Image Analysis" subtitle={result.imageAnalysis.title}>
          {result.imageAnalysis.detail}
        </PredictionCard>
        <PredictionCard title="Symptom Analysis" subtitle={result.symptomAnalysis.title}>
          {result.symptomAnalysis.detail}
        </PredictionCard>
        <PredictionCard title="Multimodal Analysis" subtitle={result.multimodal.title}>
          {result.multimodal.detail}
        </PredictionCard>
      </div>

      <Card title="General Recommendation">
        <p className="text-slate-700 leading-relaxed">{result.recommendation}</p>
      </Card>

      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
        This result is for decision-support/informational purposes only and is not a medical
        diagnosis.
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/diagnosis">
          <Button>Analyze Again</Button>
        </Link>
        <Link to="/history">
          <Button variant="secondary">View History</Button>
        </Link>
      </div>

      <Disclaimer />
    </div>
  )
}
