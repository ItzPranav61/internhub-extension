import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useInternships } from './useInternships'
import { createInternship, installChromeMock } from '../test/chromeMock'

describe('useInternships', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it('loads internships on mount', async () => {
    const internship = createInternship()
    installChromeMock({ internships: [internship] })

    const { result } = renderHook(() => useInternships())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.internships).toEqual([internship])
  })

  it('saves the active tab and refreshes state', async () => {
    installChromeMock({ internships: [] })
    const { result } = renderHook(() => useInternships())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    await act(async () => {
      await result.current.saveActivePage()
    })

    await waitFor(() => expect(result.current.internships).toHaveLength(1))
    expect(result.current.internships[0]).toMatchObject({
      id: 'test-uuid',
      title: 'Frontend Intern - Example Careers',
      company: 'Careers',
      url: 'https://careers.example.com/frontend-intern',
      status: 'Saved',
    })
  })

  it('surfaces duplicate save messages', async () => {
    installChromeMock({
      internships: [
        createInternship({
          url: 'https://careers.example.com/frontend-intern',
        }),
      ],
    })
    const { result } = renderHook(() => useInternships())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    await act(async () => {
      await result.current.saveActivePage()
    })

    await waitFor(() =>
      expect(result.current.message).toBe('This internship is already saved.'),
    )
  })

  it('changes status and refreshes state', async () => {
    const internship = createInternship()
    installChromeMock({ internships: [internship] })
    const { result } = renderHook(() => useInternships())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    await act(async () => {
      await result.current.changeStatus(internship.id, 'Applied')
    })

    await waitFor(() =>
      expect(result.current.internships[0]?.status).toBe('Applied'),
    )
    expect(result.current.message).toBe('Status updated.')
  })

  it('deletes internships and refreshes state', async () => {
    const internship = createInternship()
    installChromeMock({ internships: [internship] })
    const { result } = renderHook(() => useInternships())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    await act(async () => {
      await result.current.removeInternship(internship.id)
    })

    await waitFor(() => expect(result.current.internships).toEqual([]))
    expect(result.current.message).toBe('Internship deleted.')
  })
})
