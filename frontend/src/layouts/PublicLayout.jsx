import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Disclaimer from '../components/Disclaimer'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6">
        <Disclaimer compact />
      </footer>
    </div>
  )
}
