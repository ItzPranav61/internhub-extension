import { useEffect, useState } from 'react'
import {
  getInternships,
  isDuplicate,
  saveInternship,
} from '../storage/internshipStorage'
import type { Internship } from '../types/internship'
import { getCurrentTab } from '../utils/getCurrentTab'

function getCompanyFromUrl(url: string) {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '')
    const [company] = hostname.split('.')

    return company ? company.charAt(0).toUpperCase() + company.slice(1) : 'Unknown'
  } catch {
    return 'Unknown'
  }
}

export function useInternships() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadInternships() {
      try {
        const savedInternships = await getInternships()
        setInternships(savedInternships)
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : 'Could not load saved internships.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    void loadInternships()
  }, [])

  async function saveActivePage() {
    setIsSaving(true)
    setMessage('')

    try {
      const currentTab = await getCurrentTab()
      const duplicate = await isDuplicate(currentTab.url)

      if (duplicate) {
        setMessage('This internship is already saved.')
        return
      }

      const internship: Internship = {
        id: crypto.randomUUID(),
        title: currentTab.title,
        company: getCompanyFromUrl(currentTab.url),
        url: currentTab.url,
        status: 'Saved',
        savedAt: new Date().toISOString(),
      }

      await saveInternship(internship)

      const savedInternships = await getInternships()
      setInternships(savedInternships)
      setMessage('Internship saved.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleSaveActivePage() {
    try {
      await saveActivePage()
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Could not save internship.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return {
    internships,
    isLoading,
    isSaving,
    message,
    saveActivePage: handleSaveActivePage,
  }
}
