'use client'

import { useMemo } from 'react'
import { buildFuriganaSegments, useFurigana, type FuriganaMapEntry } from '@/components/ui/FuriganaText'
import type { Vocabulary } from '@/types/material'

interface TappableFuriganaTextProps {
  text: string
  furiganaMap: FuriganaMapEntry[]
  vocabDict: Record<string, Vocabulary>
  onWordTap: (vocab: Vocabulary) => void
  className?: string
}

// Furigana + kata yang ada di vocabDict dibuat bisa di-tap untuk tap-to-reveal dictionary.
export function TappableFuriganaText({
  text,
  furiganaMap,
  vocabDict,
  onWordTap,
  className,
}: TappableFuriganaTextProps) {
  const { showFurigana } = useFurigana()
  const segments = useMemo(() => buildFuriganaSegments(text, furiganaMap), [text, furiganaMap])

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        const vocab = vocabDict[segment.text]
        const rubyEl = segment.reading ? (
          <ruby>
            {segment.text}
            <rt>{showFurigana ? segment.reading : ''}</rt>
          </ruby>
        ) : (
          segment.text
        )

        if (vocab) {
          return (
            <span
              key={index}
              onClick={() => onWordTap(vocab)}
              className="cursor-pointer border-b-2 border-dashed border-[#1565C0] pb-px text-[#1565C0]"
            >
              {rubyEl}
            </span>
          )
        }

        return <span key={index}>{rubyEl}</span>
      })}
    </span>
  )
}
