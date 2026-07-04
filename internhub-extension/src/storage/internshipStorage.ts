import type { Internship } from '../types/internship'

const STORAGE_KEY = 'internships'

type ActiveTab = chrome.tabs.Tab & {
  url: string
}

function hasChromeStorage() {
  return typeof chrome !== 'undefined' && Boolean(chrome.storage?.local)
}

function hasChromeTabs() {
  return typeof chrome !== 'undefined' && Boolean(chrome.tabs)
}

function getCompanyFromUrl(url: string) {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '')
    const [company] = hostname.split('.')

    return company ? company.charAt(0).toUpperCase() + company.slice(1) : 'Unknown'
  } catch {
    return 'Unknown'
  }
}

function createId() {
  return crypto.randomUUID()
}

async function getActiveTab(): Promise<ActiveTab> {
  if (!hasChromeTabs()) {
    throw new Error('Chrome tabs API is not available.')
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  if (!tab?.url) {
    throw new Error('No active tab URL found.')
  }

  return tab as ActiveTab
}

export async function getInternships(): Promise<Internship[]> {
  if (!hasChromeStorage()) {
    return []
  }

  const result = await chrome.storage.local.get(STORAGE_KEY)
  const internships = result[STORAGE_KEY]

  return Array.isArray(internships) ? internships : []
}

export async function saveCurrentPage(): Promise<Internship[]> {
  const tab = await getActiveTab()
  const url = tab.url
  const existingInternships = await getInternships()
  const alreadySaved = existingInternships.some(
    (internship) => internship.url === url,
  )

  if (alreadySaved) {
    return existingInternships
  }

  const internship: Internship = {
    id: createId(),
    title: tab.title || 'Untitled listing',
    company: getCompanyFromUrl(url),
    url,
    status: 'Saved',
    savedAt: new Date().toISOString(),
  }

  const updatedInternships = [internship, ...existingInternships]

  await chrome.storage.local.set({ [STORAGE_KEY]: updatedInternships })

  return updatedInternships
}
