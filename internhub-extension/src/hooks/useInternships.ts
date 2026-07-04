import { useEffect, useState } from 'react'
import {
  getInternships,
  saveCurrentPage,
} from '../storage/internshipStorage'
import type { Internship } from '../types/internship'

export function useInternships() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function loadInternships() {
      const savedInternships = await getInternships()
      setInternships(savedInternships)
      setIsLoading(false)
    }

    void loadInternships()
  }, [])

  async function saveActivePage() {
    setIsSaving(true)

    try {
      const updatedInternships = await saveCurrentPage()
      setInternships(updatedInternships)
    } finally {
      setIsSaving(false)
    }
  }

  return {
    internships,
    isLoading,
    isSaving,
    saveActivePage,
  }
}
