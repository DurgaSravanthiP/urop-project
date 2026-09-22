import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Disclaimer from '../components/Disclaimer'
import { useAuth } from '../context/AuthContext'

const pageTitles = {
  '/diagnosis': 'New Diagnosis',
  '/results': 'Diagnosis Results',
  '/history': 'Prediction History',
  '/profile': 'Profile',
  '/how-it-works': 'How It Works',
  '/about': 'About Project',
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const { pathname } = useLocation()
  const basePath = pathname.startsWith('/results/') ? '/results' : pathname
  const title = pageTitles[basePath] || 'Dashboard'
  const firstName = user?.name?.split(' ')[0] || 'User'

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              Menu
            </button>
            <div>
              <p className="text-xs text-slate-500">Welcome back, {firstName}</p>
              <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
        <footer className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6">
          <Disclaimer compact />
        </footer>
      </div>
    </div>
  )
}
