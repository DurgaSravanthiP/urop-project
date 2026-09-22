import Card from '../components/Card'
import HistoryTable from '../components/HistoryTable'
import { MOCK_HISTORY } from '../data/mockData'

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <p className="text-sm text-slate-600">
        Prediction history (sample records). Live data will be loaded from the database after
        full backend integration.
      </p>
      <Card title="Prediction History">
        <HistoryTable rows={MOCK_HISTORY} />
      </Card>
    </div>
  )
}
