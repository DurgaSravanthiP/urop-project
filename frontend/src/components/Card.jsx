export default function Card({ title, children, className = '', headerAction }) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      {(title || headerAction) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          {title && <h2 className="text-lg font-semibold text-slate-800">{title}</h2>}
          {headerAction}
        </div>
      )}
      {children}
    </div>
  )
}
