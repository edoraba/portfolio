'use client'

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="site-container page-x pt-24">
      <p className="label text-accent">Error</p>
      <h1 className="mt-4 display">Something broke on my side.</h1>
      <button type="button" onClick={reset} className="mt-10 label text-accent">
        Try again
      </button>
    </section>
  )
}
