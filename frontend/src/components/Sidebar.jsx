import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/diagnosis', label: 'New Diagnosis' },
  { to: '/results', label: 'Results' },
  { to: '/history', label: 'History' },
  { to: '/profile', label: 'Profile' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About Project' },
]

function linkClass({ isActive }) {
  return `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-100'
  }`
}

export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
    onClose?.()
  }

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="border-b border-slate-200 px-4 py-5">
          <p className="text-lg font-semibold text-slate-800">MediScan AI</p>
          <p className="text-xs text-slate-500">Medical decision support</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={linkClass}
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <button
            type="button"
            className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
