export type CurrentTab = {
  title: string
  url: string
}

function hasChromeTabs() {
  return typeof chrome !== 'undefined' && Boolean(chrome.tabs)
}

export async function getCurrentTab(): Promise<CurrentTab> {
  if (!hasChromeTabs()) {
    throw new Error('Chrome tabs API is not available.')
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  if (!tab?.url) {
    throw new Error('Active tab has no URL.')
  }

  return {
    title: tab.title || 'Untitled listing',
    url: tab.url,
  }
}
