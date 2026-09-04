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
  h.classList.add('js', 'no-transitions')
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      h.classList.remove('no-transitions')
    })
  })
})()
