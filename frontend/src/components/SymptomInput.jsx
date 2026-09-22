import { COMMON_SYMPTOMS } from '../data/mockData'

export default function SymptomInput({
  value,
  onChange,
  selectedSymptoms,
  onToggleSymptom,
}) {
  return (
    <div className="space-y-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        placeholder="Describe your symptoms in detail..."
        className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
      />
      <div>
        <p className="mb-2 text-sm font-medium text-slate-600">Common symptoms</p>
        <div className="flex flex-wrap gap-2">
          {COMMON_SYMPTOMS.map((symptom) => {
            const active = selectedSymptoms.includes(symptom)
            return (
              <button
                key={symptom}
                type="button"
                onClick={() => onToggleSymptom(symptom)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? 'border-teal-600 bg-teal-600 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-teal-400'
                }`}
              >
                {symptom}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
