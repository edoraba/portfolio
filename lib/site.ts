export const site = {
  name: 'Edoardo Baravaglio',
  shortName: 'EB',
  role: 'Frontend developer',
  location: 'Turin, Italy',
  email: 'edo.baravaglio@gmail.com',
  // TODO(edoardo): final domain
  url: 'https://example.com',
  github: 'https://github.com/edoraba',
  linkedin: 'https://www.linkedin.com/in/edoardo-baravaglio/',
  repo: 'https://github.com/edoraba/portfolio',
  /** Console header, row one. */
  status1: 'Frontend developer. Whole products, front to back. Turin, IT',
  /** Console header, row two, followed by the email. */
  status2: 'Partner at Redergo. Write me',
  coordinates: '45.07 N, 7.69 E',
} as const

/**
 * The console header, the footer map, the mobile menu and the number keys all read from this:
 * what is printed next to a name is the key that goes there. Home is 0 and Colophon closes the
 * list, so the numbers a reader sees are the numbers they can press.
 */
export const navItems = [
  { n: '1', label: 'Work', href: '/work' },
  { n: '2', label: 'Lab', href: '/lab' },
  { n: '3', label: 'About', href: '/about' },
] as const

/** Every destination with a key on it, in order. */
export const keyedRoutes = [
  { n: '0', label: 'Home', href: '/' },
  ...navItems,
  { n: '4', label: 'Colophon', href: '/colophon' },
] as const
