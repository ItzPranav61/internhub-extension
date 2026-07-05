import { vi } from 'vitest'
import type { Internship } from '../types/internship'

type ChromeStore = {
  internships?: Internship[]
}

export function installChromeMock(initialStore: ChromeStore = {}) {
  const store: ChromeStore = { ...initialStore }
  const activeTab = {
    title: 'Frontend Intern - Example Careers',
    url: 'https://careers.example.com/frontend-intern',
  }

  const chromeMock = {
    storage: {
      local: {
        get: vi.fn(async (key: keyof ChromeStore) => ({
          [key]: store[key],
        })),
        set: vi.fn(async (value: ChromeStore) => {
          Object.assign(store, value)
        }),
        clear: vi.fn(async () => {
          delete store.internships
        }),
      },
    },
    tabs: {
      query: vi.fn(async () => [activeTab]),
    },
  }

  vi.stubGlobal('chrome', chromeMock)
  vi.stubGlobal('crypto', {
    randomUUID: vi.fn(() => 'test-uuid'),
  })

  return {
    activeTab,
    chromeMock,
    store,
  }
}

export function createInternship(
  overrides: Partial<Internship> = {},
): Internship {
  return {
    id: 'internship-1',
    title: 'Frontend Intern',
    company: 'Example',
    url: 'https://example.com/frontend-intern',
    status: 'Saved',
    savedAt: '2026-07-05T00:00:00.000Z',
    ...overrides,
  }
}
