import type { Internship } from '../types/internship'

const STORAGE_KEY = 'internships'

function hasChromeStorage() {
  return typeof chrome !== 'undefined' && Boolean(chrome.storage?.local)
}

export async function getInternships(): Promise<Internship[]> {
  if (!hasChromeStorage()) {
    throw new Error('Chrome storage is not available.')
  }

  const result = await chrome.storage.local.get(STORAGE_KEY)
  const internships = result[STORAGE_KEY]

  return Array.isArray(internships) ? internships : []
}

export async function saveInternship(internship: Internship): Promise<void> {
  const existingInternships = await getInternships()
  const duplicate = existingInternships.some(
    (savedInternship) => savedInternship.url === internship.url,
  )

  if (duplicate) {
    throw new Error('This internship is already saved.')
  }

  await saveInternships([internship, ...existingInternships])
}

export async function saveInternships(
  internships: Internship[],
): Promise<void> {
  if (!hasChromeStorage()) {
    throw new Error('Chrome storage is not available.')
  }

  await chrome.storage.local.set({ [STORAGE_KEY]: internships })
}

export async function isDuplicate(url: string): Promise<boolean> {
  const internships = await getInternships()

  return internships.some((internship) => internship.url === url)
}
