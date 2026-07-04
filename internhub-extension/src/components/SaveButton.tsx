type SaveButtonProps = {
  isSaving: boolean
  onSave: () => void
}

export function SaveButton({ isSaving, onSave }: SaveButtonProps) {
  return (
    <button
      type="button"
      className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
      disabled={isSaving}
      onClick={onSave}
    >
      {isSaving ? 'Saving...' : '+ Save Current Page'}
    </button>
  )
}
