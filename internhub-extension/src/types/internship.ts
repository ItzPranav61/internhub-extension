export type InternshipStatus = 'Saved' | 'Applied'

export type Internship = {
  id: number
  company: string
  role: string
  status: InternshipStatus
}
