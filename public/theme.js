// Runs synchronously from <head> before the first paint: applies the stored theme (or the
// default, signal), marks JS as available and suppresses CSS transitions for two frames.
// Legacy values from v1 ('dark', 'light') map to their v2 names.
;(function () {
  var h = document.documentElement
  var names = ['signal', 'field', 'paper', 'phosphor', 'cobalt', 'ash']
  var legacy = { dark: 'field', light: 'paper' }
  var t = 'signal'
  try {
    var s = localStorage.getItem('theme')
    if (s && legacy[s]) s = legacy[s]
    if (s && names.indexOf(s) !== -1) t = s
  } catch {
    // storage blocked: default stands
  }
  h.setAttribute('data-theme', t)
  // Motion: the site toggle wins, otherwise the OS decides. Same rule as lib/motion/store.ts,
  // applied here so rules and reveals never flash between the first paint and hydration.
  var reduced = false
  try {
    var m = localStorage.getItem('motion')
    reduced =
      m === 'reduced' || (m !== 'full' && matchMedia('(prefers-reduced-motion: reduce)').matches)
  } catch {
    reduced = false
  }
  h.setAttribute('data-motion', reduced ? 'reduced' : 'full')
  h.classList.add('js', 'no-transitions')
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      h.classList.remove('no-transitions')
    })
  })
})()
