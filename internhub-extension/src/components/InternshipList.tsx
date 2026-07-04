import type { Internship } from '../types/internship'
import { InternshipCard } from './InternshipCard'

type InternshipListProps = {
  internships: Internship[]
  isLoading: boolean
}

export function InternshipList({ internships, isLoading }: InternshipListProps) {
  return (
    <section>
      <h2 className="border-y border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
        Saved Internships
      </h2>
      {isLoading ? (
        <p className="px-4 py-4 text-sm text-slate-500">Loading...</p>
      ) : internships.length > 0 ? (
        <div>
          {internships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      ) : (
        <p className="px-4 py-4 text-sm text-slate-500">
          No internships saved yet.
        </p>
      )}
    </section>
  )
}
