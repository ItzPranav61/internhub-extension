import type { Internship } from '../types/internship'

type InternshipCardProps = {
  internship: Internship
}

export function InternshipCard({ internship }: InternshipCardProps) {
  return (
    <article className="border-b border-slate-200 px-4 py-3 last:border-b-0">
      <p className="text-sm font-semibold text-slate-900">
        {internship.company}
      </p>
      <p className="mt-1 text-sm text-slate-700">{internship.role}</p>
      <p className="mt-2 text-xs font-medium text-slate-500">
        {internship.status}
      </p>
    </article>
  )
}
