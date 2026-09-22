import Card from '../components/Card'

const technologies = [
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Python',
  'CNN',
  'NLP',
  'REST API',
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-4">
      <Card title="Project Objective">
        <p className="text-slate-700 leading-relaxed">
          To demonstrate how combining medical image analysis and symptom analysis can support
          more comprehensive disease prediction as a decision-support tool. This application
          focuses on a clear user experience and architecture readiness for ML integration.
        </p>
      </Card>

      <Card title="Main Technologies">
        <ul className="grid gap-2 sm:grid-cols-2">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Dataset">
        <ul className="space-y-3 text-slate-700">
          <li>
            <strong>Brain Tumor MRI Dataset</strong> — Kaggle
          </li>
          <li>
            <strong>Disease-Symptom Dataset</strong> — Kaggle
          </li>
        </ul>
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          These are separate datasets and are not necessarily paired records from the same
          patients. Multimodal fusion in the full system will need careful alignment strategy in
          future work.
        </p>
      </Card>
    </div>
  )
}
