import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Disclaimer from '../components/Disclaimer'
import { useAuth } from '../context/AuthContext'

const features = [
  {
    title: 'Medical Image Analysis',
    desc: 'Upload MRI, CT, or X-ray scans for CNN-based visual feature extraction.',
  },
  {
    title: 'Symptom Analysis',
    desc: 'Enter symptoms in text or select common options for NLP-based processing.',
  },
  {
    title: 'Multimodal AI Prediction',
    desc: 'Combine image and text features through fusion for a comprehensive result.',
  },
]

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const ctaPath = isAuthenticated ? '/diagnosis' : '/login'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-teal-700">
            AI Healthcare Decision Support
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Multimodal Medical Diagnosis
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Analyze medical images and symptoms together using AI
          </p>
          <Link to={ctaPath} className="mt-8 inline-block">
            <Button className="px-8 py-3 text-base">Start Diagnosis</Button>
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-800">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-center text-xl font-semibold text-slate-800">How It Works</h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-slate-700 sm:gap-3">
            <span className="rounded-full bg-teal-50 px-4 py-2 text-teal-800">Upload Image</span>
            <span className="text-slate-400">→</span>
            <span className="rounded-full bg-blue-50 px-4 py-2 text-blue-800">Enter Symptoms</span>
            <span className="text-slate-400">→</span>
            <span className="rounded-full bg-violet-50 px-4 py-2 text-violet-800">AI Analysis</span>
            <span className="text-slate-400">→</span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-slate-800">Prediction</span>
          </div>
        </div>

        <div className="mt-10">
          <Disclaimer />
        </div>
      </section>
    </div>
  )
}
