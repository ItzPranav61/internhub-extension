import { Header } from '../components/Header'
import { InternshipList } from '../components/InternshipList'
import { SaveButton } from '../components/SaveButton'
import type { Internship } from '../types/internship'

const internships: Internship[] = [
  {
    id: 1,
    company: 'Google',
    role: 'Frontend Intern',
    status: 'Saved',
  },
  {
    id: 2,
    company: 'Microsoft',
    role: 'SDE Intern',
    status: 'Applied',
  },
]

export function Popup() {
  return (
    <main className="w-full min-w-80 max-w-sm bg-white text-slate-900">
      <Header />
      <div className="px-4 py-3">
        <SaveButton />
      </div>
      <InternshipList internships={internships} />
    </main>
  )
}
