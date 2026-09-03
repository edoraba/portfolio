// Runs synchronously from <head> before the first paint: applies the stored or system theme,
// marks JS as available and suppresses CSS transitions for the first two frames.
;(function () {
  var h = document.documentElement
  try {
    var s = localStorage.getItem('theme')
    var t =
      s === 'light' || s === 'dark'
        ? s
        : matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark'
    h.setAttribute('data-theme', t)
  } catch {
    h.setAttribute('data-theme', 'dark')
  }
  h.classList.add('js', 'no-transitions')
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      h.classList.remove('no-transitions')
    })
  })
})()
