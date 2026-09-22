import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import ImageUploader from '../components/ImageUploader'
import SymptomInput from '../components/SymptomInput'
import Disclaimer from '../components/Disclaimer'
import { analyzeDiagnosis } from '../services/diagnosisService'

export default function DiagnosisPage() {
  const navigate = useNavigate()
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [symptomsText, setSymptomsText] = useState('')
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null)
      return undefined
    }
    const url = URL.createObjectURL(imageFile)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [imageFile])

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom],
    )
  }

  const handleAnalyze = async () => {
    if (!imageFile && !symptomsText.trim() && selectedSymptoms.length === 0) {
      alert('Please upload an image and/or enter symptoms for the demo.')
      return
    }
    setLoading(true)
    try {
      const result = await analyzeDiagnosis({
        imageFile,
        symptomsText,
        selectedSymptoms,
      })
      navigate('/results', { state: { result, fromDiagnosis: true } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-8 text-white shadow-sm">
        <h2 className="text-2xl font-bold">Multimodal Medical Diagnosis</h2>
        <p className="mt-2 max-w-2xl text-teal-50">
          Upload a medical image and describe symptoms. Analysis results are shown as sample
          output until the ML backend is fully connected.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Upload Medical Image">
          <ImageUploader
            file={imageFile}
            previewUrl={previewUrl}
            onFileChange={setImageFile}
            onClear={() => setImageFile(null)}
          />
        </Card>
        <Card title="Enter Your Symptoms">
          <SymptomInput
            value={symptomsText}
            onChange={setSymptomsText}
            selectedSymptoms={selectedSymptoms}
            onToggleSymptom={toggleSymptom}
          />
        </Card>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button
          className="w-full max-w-md py-3.5 text-base"
          disabled={loading}
          onClick={handleAnalyze}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Analyzing…
            </span>
          ) : (
            'Analyze with AI'
          )}
        </Button>
        <p className="text-center text-xs text-slate-500">
          Results are labeled as <strong>Demo Prediction</strong> until the backend is connected.
        </p>
      </div>

      <Card title="How MediScan AI Works">
        <ol className="list-inside list-decimal space-y-2 text-sm text-slate-600">
          <li>CNN extracts features from the uploaded medical image (future Python service).</li>
          <li>NLP extracts features from symptom text (future Python service).</li>
          <li>Multimodal fusion combines both feature sets for a prediction (future model).</li>
        </ol>
        <Link to="/how-it-works" className="mt-4 inline-block text-sm font-medium text-teal-700 hover:underline">
          View full architecture →
        </Link>
      </Card>

      <Disclaimer />
    </div>
  )
}
