const variants = {
  primary:
    'bg-teal-600 text-white hover:bg-teal-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'bg-white text-teal-700 border border-teal-200 hover:bg-teal-50 disabled:opacity-50',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
