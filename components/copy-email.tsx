'use client'
import { useState } from 'react'
import { site } from '@/lib/site'

export function CopyEmail({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className={`font-mono text-accent transition-colors duration-200 hover:text-ink ${className}`}
      aria-live="polite"
    >
      {copied ? 'Copied' : site.email}
    </button>
  )
}
