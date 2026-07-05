import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getCurrentTab } from './getCurrentTab'
import { installChromeMock } from '../test/chromeMock'

describe('getCurrentTab', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns the active tab title and URL', async () => {
    const { activeTab } = installChromeMock()

    await expect(getCurrentTab()).resolves.toEqual(activeTab)
  })

  it('throws when the active tab has no URL', async () => {
    const { chromeMock } = installChromeMock()
    chromeMock.tabs.query.mockResolvedValueOnce([{ title: 'No URL' }])

    await expect(getCurrentTab()).rejects.toThrow('Active tab has no URL')
  })
})
