export const site = {
  name: 'Edoardo Baravaglio',
  shortName: 'EB',
  role: 'Frontend developer with a design degree',
  location: 'Turin, Italy',
  email: 'edoardo@redergo.com',
  // TODO(edoardo): final domain
  url: 'https://example.com',
  github: 'https://github.com/edoraba',
  linkedin: 'https://www.linkedin.com/in/edoardo-baravaglio/',
  repo: 'https://github.com/edoraba/portfolio',
} as const

export const navItems = [
  { n: '1', label: 'Work', href: '/work' },
  { n: '2', label: 'Lab', href: '/lab' },
  { n: '3', label: 'Writing', href: '/writing' },
  { n: '4', label: 'About', href: '/about' },
] as const
