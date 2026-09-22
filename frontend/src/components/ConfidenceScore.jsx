export default function ConfidenceScore({ value, label = 'Confidence' }) {
  const clamped = Math.min(100, Math.max(0, Number(value) || 0))

  return (
    <div>
      <div className="mb-2 flex items-end justify-between">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <span className="text-2xl font-bold text-teal-700">{clamped}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-700"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
