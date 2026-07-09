'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export interface FuriganaMapEntry {
  kanji: string
  reading: string
}

interface FuriganaContextValue {
  showFurigana: boolean
  toggle: () => void
}

const FuriganaContext = createContext<FuriganaContextValue | null>(null)

const STORAGE_KEY = 'kaigopads:furigana-default'

export function FuriganaProvider({
  children,
  initialShowFurigana = false,
  syncWithStorage = true,
}: {
  children: ReactNode
  initialShowFurigana?: boolean
  /** Set false untuk konteks yang selalu memaksa satu nilai (mis. Live Preview admin). */
  syncWithStorage?: boolean
}) {
  const [showFurigana, setShowFurigana] = useState(() => {
    if (syncWithStorage && typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored !== null) return stored === 'true'
    }
    return initialShowFurigana
  })

  const value = useMemo(
    () => ({
      showFurigana,
      toggle: () =>
        setShowFurigana((prev) => {
          const next = !prev
          if (syncWithStorage && typeof window !== 'undefined') {
            window.localStorage.setItem(STORAGE_KEY, String(next))
          }
          return next
        }),
    }),
    [showFurigana, syncWithStorage]
  )

  return <FuriganaContext.Provider value={value}>{children}</FuriganaContext.Provider>
}

export function useFurigana() {
  const ctx = useContext(FuriganaContext)
  if (!ctx) {
    throw new Error('useFurigana harus dipakai di dalam <FuriganaProvider>')
  }
  return ctx
}

export function FuriganaToggle({ className }: { className?: string }) {
  const { showFurigana, toggle } = useFurigana()
  return (
    <button type="button" onClick={toggle} className={className}>
      {showFurigana ? 'Sembunyikan furigana' : 'Tampilkan furigana'}
    </button>
  )
}

interface FuriganaTextProps {
  text: string
  furiganaMap?: FuriganaMapEntry[] | null
  className?: string
}

// Memecah teks Jepang menjadi segmen <ruby> berdasarkan furiganaMap.
// Diekspor supaya komponen lain (mis. tappable question text) bisa reuse logic yang sama.
export function buildFuriganaSegments(text: string, furiganaMap: FuriganaMapEntry[]) {
  const sortedEntries = [...furiganaMap].sort((a, b) => b.kanji.length - a.kanji.length)
  const segments: { text: string; reading?: string }[] = []

  let i = 0
  while (i < text.length) {
    const match = sortedEntries.find((entry) => text.startsWith(entry.kanji, i))
    if (match) {
      segments.push({ text: match.kanji, reading: match.reading })
      i += match.kanji.length
    } else {
      const last = segments[segments.length - 1]
      if (last && !last.reading) {
        last.text += text[i]
      } else {
        segments.push({ text: text[i] })
      }
      i += 1
    }
  }

  return segments
}

export function FuriganaText({ text, furiganaMap, className }: FuriganaTextProps) {
  const ctx = useContext(FuriganaContext)
  const showFurigana = ctx?.showFurigana ?? false

  const segments = useMemo(
    () => (furiganaMap && furiganaMap.length > 0 ? buildFuriganaSegments(text, furiganaMap) : null),
    [text, furiganaMap]
  )

  if (!segments) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={className}>
      {segments.map((segment, index) =>
        segment.reading ? (
          <ruby key={index}>
            {segment.text}
            <rt>{showFurigana ? segment.reading : ''}</rt>
          </ruby>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </span>
  )
}
