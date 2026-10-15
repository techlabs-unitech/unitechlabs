// ─────────────────────────────────────────────────────────────
// LEADERSHIP TEAM DATA — edit this file to update the team page,
// the homepage preview and the structured data in one go.
//
// • photo: drop a square (min 800×800) portrait into /public/team/
//          and set e.g. '/team/jane-doe.jpg'. Leave empty to show
//          an initials placeholder.
// • The first 4 members flagged `featured` appear on the homepage.
// • NOTE: names/roles below are PLACEHOLDERS — replace with real people.
// ─────────────────────────────────────────────────────────────

export type TeamMember = {
  slug: string
  name: string
  role: string
  group: 'Leadership' | 'Engineering & Delivery' | 'Board of Advisors'
  bio: string
  photo?: string
  linkedin?: string
  email?: string
  featured?: boolean
}

export const teamGroups: TeamMember['group'][] = [
  'Leadership',
  'Engineering & Delivery',
  'Board of Advisors',
]

export const team: TeamMember[] = [
  {
    slug: 'founder-ceo',
    name: 'Sudharshan_VR',
    role: 'Founder & Chief Executive Officer',
    group: 'Leadership',
    bio: 'Founded UnitechLabs in 2022 to give businesses a single technology company for software, IoT and AI. Sets company direction and stays close to every client project.',
    photo: '',
    linkedin: 'https://linkedin.com/company/unitechlabs',
    featured: true,
  },
]

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('')
}
