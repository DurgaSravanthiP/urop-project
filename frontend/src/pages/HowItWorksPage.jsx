import Card from '../components/Card'

const steps = [
  {
    num: 1,
    title: 'Medical Image',
    desc: 'User uploads MRI, CT, or X-ray.',
    color: 'border-teal-200 bg-teal-50',
  },
  {
    num: 2,
    title: 'CNN',
    desc: 'CNN processes the medical image and extracts visual features.',
    color: 'border-blue-200 bg-blue-50',
  },
  {
    num: 3,
    title: 'Symptoms',
    desc: 'User enters symptoms using text (and optional symptom chips).',
    color: 'border-violet-200 bg-violet-50',
  },
  {
    num: 4,
    title: 'NLP',
    desc: 'NLP processes the symptom information and extracts text features.',
    color: 'border-indigo-200 bg-indigo-50',
  },
  {
    num: 5,
    title: 'Multimodal Fusion',
    desc: 'Image and text features are combined.',
    color: 'border-purple-200 bg-purple-50',
  },
  {
    num: 6,
    title: 'Prediction',
    desc: 'The system generates a possible condition and confidence score (demo UI).',
    color: 'border-fuchsia-200 bg-fuchsia-50',
  },
  {
    num: 7,
    title: 'Recommendation',
    desc: 'General health guidance and professional consultation reminder.',
    color: 'border-emerald-200 bg-emerald-50',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-4">
      <p className="text-slate-600">
        End-to-end system flow — React frontend, Node/Express API, Python ML services, and
        MongoDB for stored predictions.
      </p>

      <Card title="Project Pipeline">
        <div className="flex flex-col items-stretch">
          {steps.map((step, index) => (
            <div key={step.num} className="flex flex-col items-center">
              <div
                className={`w-full rounded-xl border-2 px-5 py-4 ${step.color}`}
              >
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Step {step.num}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-800">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{step.desc}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="flex flex-col items-center py-2 text-slate-400" aria-hidden>
                  <span className="text-xl">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card title="System Layers (Frontend View)">
        <div className="space-y-2 font-mono text-sm text-slate-700">
          <p>React Frontend</p>
          <p className="pl-4 text-slate-400">↓</p>
          <p>Node.js + Express (REST API)</p>
          <p className="pl-4 text-slate-400">↓</p>
          <p>Python ML Services — CNN | NLP → Multimodal Fusion</p>
          <p className="pl-4 text-slate-400">↓</p>
          <p>MongoDB (predictions & history)</p>
        </div>
      </Card>
    </div>
  )
}
