import type { Internship } from '../types/internship'
import { InternshipCard } from './InternshipCard'

type InternshipListProps = {
  internships: Internship[]
}

export function InternshipList({ internships }: InternshipListProps) {
  return (
    <section>
      <h2 className="border-y border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
        Saved Internships
      </h2>
      <div>
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </section>
  )
}
