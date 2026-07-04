import type { Internship, InternshipStatus } from '../types/internship'

const statuses: InternshipStatus[] = [
  'Saved',
  'Applied',
  'Interview',
  'Rejected',
  'Offer',
]

type InternshipCardProps = {
  internship: Internship
  onStatusChange: (id: string, status: InternshipStatus) => void
}

export function InternshipCard({
  internship,
  onStatusChange,
}: InternshipCardProps) {
  return (
    <article className="border-b border-slate-200 px-4 py-3 last:border-b-0">
      <p className="text-sm font-semibold text-slate-900">
        {internship.company}
      </p>
      <p className="mt-1 text-sm text-slate-700">{internship.title}</p>
      <select
        className="mt-3 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900"
        value={internship.status}
        onChange={(event) =>
          onStatusChange(
            internship.id,
            event.currentTarget.value as InternshipStatus,
          )
        }
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </article>
  )
}
