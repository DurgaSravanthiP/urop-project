import { Link } from 'react-router-dom'
import Disclaimer from '../components/Disclaimer'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 font-semibold text-slate-800">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-sm text-white">
            MS
          </span>
          MediScan AI
        </Link>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
            <div className="mt-6">{children}</div>
          </div>
        </div>

        <div className="mt-8">
          <Disclaimer compact />
        </div>
      </div>
    </div>
  )
}
