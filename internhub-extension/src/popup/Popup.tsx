import { Header } from '../components/Header'
import { InternshipList } from '../components/InternshipList'
import { SaveButton } from '../components/SaveButton'
import { useInternships } from '../hooks/useInternships'

export function Popup() {
  const { internships, isLoading, isSaving, saveActivePage } = useInternships()

  return (
    <main className="w-full min-w-80 max-w-sm bg-white text-slate-900">
      <Header />
      <div className="px-4 py-3">
        <SaveButton isSaving={isSaving} onSave={saveActivePage} />
      </div>
      <InternshipList internships={internships} isLoading={isLoading} />
    </main>
  )
}
