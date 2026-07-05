import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  deleteInternship,
  getInternships,
  isDuplicate,
  saveInternship,
  saveInternships,
  updateInternshipStatus,
} from './internshipStorage'
import { createInternship, installChromeMock } from '../test/chromeMock'

describe('internshipStorage', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns saved internships from chrome.storage.local', async () => {
    const internship = createInternship()
    installChromeMock({ internships: [internship] })

    await expect(getInternships()).resolves.toEqual([internship])
  })

  it('returns an empty array when storage has no internships', async () => {
    installChromeMock()

    await expect(getInternships()).resolves.toEqual([])
  })

  it('saves a new internship before existing items', async () => {
    const existing = createInternship({
      id: 'existing',
      url: 'https://example.com/existing',
    })
    const next = createInternship({
      id: 'next',
      url: 'https://example.com/next',
    })
    const { store } = installChromeMock({ internships: [existing] })

    await saveInternship(next)

    expect(store.internships).toEqual([next, existing])
  })

  it('rejects duplicate internships by URL', async () => {
    const internship = createInternship()
    installChromeMock({ internships: [internship] })

    await expect(
      saveInternship(createInternship({ id: 'duplicate' })),
    ).rejects.toThrow('already saved')
  })

  it('detects duplicate URLs only by URL', async () => {
    installChromeMock({
      internships: [
        createInternship({
          title: 'Different title',
          company: 'Different company',
          url: 'https://example.com/same-url',
        }),
      ],
    })

    await expect(isDuplicate('https://example.com/same-url')).resolves.toBe(
      true,
    )
    await expect(isDuplicate('https://example.com/new-url')).resolves.toBe(
      false,
    )
  })

  it('saves a full internships array', async () => {
    const internships = [
      createInternship({ id: 'one' }),
      createInternship({ id: 'two', url: 'https://example.com/two' }),
    ]
    const { store } = installChromeMock()

    await saveInternships(internships)

    expect(store.internships).toEqual(internships)
  })

  it('updates one internship status and preserves other records', async () => {
    const first = createInternship({ id: 'first' })
    const second = createInternship({
      id: 'second',
      url: 'https://example.com/second',
    })
    const { store } = installChromeMock({ internships: [first, second] })

    await updateInternshipStatus('second', 'Interview')

    expect(store.internships).toEqual([
      first,
      { ...second, status: 'Interview' },
    ])
  })

  it('gracefully ignores unknown IDs during status updates', async () => {
    const internship = createInternship()
    const { store } = installChromeMock({ internships: [internship] })

    await updateInternshipStatus('missing', 'Offer')

    expect(store.internships).toEqual([internship])
  })

  it('deletes an internship by ID', async () => {
    const first = createInternship({ id: 'first' })
    const second = createInternship({
      id: 'second',
      url: 'https://example.com/second',
    })
    const { store } = installChromeMock({ internships: [first, second] })

    await deleteInternship('first')

    expect(store.internships).toEqual([second])
  })

  it('gracefully ignores unknown IDs during delete', async () => {
    const internship = createInternship()
    const { store } = installChromeMock({ internships: [internship] })

    await deleteInternship('missing')

    expect(store.internships).toEqual([internship])
  })

  it('throws a clear error when chrome storage is unavailable', async () => {
    vi.stubGlobal('chrome', undefined)

    await expect(getInternships()).rejects.toThrow(
      'Chrome storage is not available',
    )
  })
})
