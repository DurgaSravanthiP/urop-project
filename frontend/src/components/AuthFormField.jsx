export default function AuthFormField({ label, id, type = 'text', value, onChange, autoComplete }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-slate-700">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
      />
    </label>
  )
}
