export type InternshipStatus =
  'Saved' | 'Applied' | 'Interview' | 'Rejected' | 'Offer'

export interface Internship {
  id: string
  title: string
  company: string
  url: string
  status: InternshipStatus
  savedAt: string
}
