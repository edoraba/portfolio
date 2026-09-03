// Runs inline before paint through next/script with strategy beforeInteractive.
// Static source, no user input involved. Keep it tiny and dependency free.
export const themeScript = [
  '(function(){try{',
  "var s=localStorage.getItem('theme');",
  "var t=s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');",
  "document.documentElement.setAttribute('data-theme',t);",
  "}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();",
].join('')
