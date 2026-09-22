export default function PredictionCard({ title, subtitle, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
      <h3 className="font-semibold text-slate-800">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-teal-700">{subtitle}</p>}
      {children && <p className="mt-2 text-sm text-slate-600 leading-relaxed">{children}</p>}
    </div>
  )
}
