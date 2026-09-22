import { Link } from 'react-router-dom'
import Button from './Button'

export default function HistoryTable({ rows }) {
  if (!rows.length) {
    return <p className="text-sm text-slate-500">No prediction history yet.</p>
  }

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="pb-3 pr-4 font-medium">Date</th>
              <th className="pb-3 pr-4 font-medium">Input Type</th>
              <th className="pb-3 pr-4 font-medium">Prediction</th>
              <th className="pb-3 pr-4 font-medium">Confidence</th>
              <th className="pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100">
                <td className="py-3 pr-4 text-slate-700">{row.date}</td>
                <td className="py-3 pr-4 text-slate-700">{row.inputType}</td>
                <td className="py-3 pr-4 font-medium text-slate-800">{row.prediction}</td>
                <td className="py-3 pr-4 text-teal-700">{row.confidence}%</td>
                <td className="py-3">
                  <Link to={`/results/${row.id}`}>
                    <Button variant="secondary" className="py-1.5 text-xs">
                      View Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <div key={row.id} className="rounded-lg border border-slate-200 p-4">
            <p className="text-xs text-slate-500">{row.date}</p>
            <p className="mt-1 font-medium text-slate-800">{row.prediction}</p>
            <p className="text-sm text-slate-600">{row.inputType}</p>
            <p className="mt-1 text-sm text-teal-700">{row.confidence}% confidence</p>
            <Link to={`/results/${row.id}`} className="mt-3 inline-block">
              <Button variant="secondary" className="w-full py-2 text-xs">
                View Details
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
