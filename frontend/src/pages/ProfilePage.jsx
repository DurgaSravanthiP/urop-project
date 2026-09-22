import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { MOCK_USER } from '../data/mockData'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const displayName = user?.name || MOCK_USER.name
  const email = user?.email || MOCK_USER.email
  const totalAnalyses = user?.totalAnalyses ?? MOCK_USER.totalAnalyses

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-blue-500 text-2xl font-bold text-white"
            aria-hidden
          >
            {displayName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-slate-800">{displayName}</h2>
            <p className="text-slate-600">{email}</p>
            <p className="mt-2 text-sm text-slate-500">
              Total analyses:{' '}
              <span className="font-semibold text-teal-700">{totalAnalyses}</span>
            </p>
          </div>
        </div>
      </Card>

      <Card title="Recent Activity">
        <ul className="space-y-3">
          {MOCK_USER.recentActivity.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-slate-600">
              <span className="text-teal-600">•</span>
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <Button variant="secondary" className="w-full sm:w-auto" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}
