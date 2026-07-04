import type { Internship, InternshipStatus } from '../types/internship'
import { InternshipCard } from './InternshipCard'

type InternshipListProps = {
  internships: Internship[]
  isLoading: boolean
  onStatusChange: (id: string, status: InternshipStatus) => void
}

export function InternshipList({
  internships,
  isLoading,
  onStatusChange,
}: InternshipListProps) {
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
            <InternshipCard
              key={internship.id}
              internship={internship}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="px-4 py-4 text-sm text-slate-500">
          <p>No internships saved yet.</p>
          <p className="mt-1">Visit a job page and click "Save Current Page".</p>
        </div>
      )}
    </section>
  )
}
