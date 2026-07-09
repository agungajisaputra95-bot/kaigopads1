'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { markVocabUnderstood } from '@/lib/actions/vocabularyProgress'
import type { WeakVocabItem } from '@/lib/queries/vocabulary'

export function WeakVocabList({ items }: { items: WeakVocabItem[] }) {
  const [resolved, setResolved] = useState<Set<string>>(new Set())

  function handleUnderstood(id: string) {
    setResolved((prev) => new Set(prev).add(id))
    markVocabUnderstood(id)
  }

  const remaining = items.filter((v) => !resolved.has(v.id))

  if (remaining.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-4 text-center text-[13px] text-[#90A4AE] shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        Semua kosakata lemah sudah direview. Kerja bagus!
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white px-3.5 py-1.5 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      {remaining.map((v, i) => (
        <div
          key={v.id}
          className="flex items-center gap-2.5 py-3"
          style={{ borderTop: i === 0 ? 'none' : '1px solid #ECEFF1' }}
        >
          <div className="min-w-0 flex-1">
            <div className="jp text-sm font-bold text-[#263238]">
              {v.kanji} <span className="text-xs font-medium text-[#90A4AE]">{v.furigana}</span>
            </div>
            <div className="mt-0.5 truncate text-xs text-[#78909C]">{v.meaningId}</div>
          </div>
          <button
            type="button"
            onClick={() => handleUnderstood(v.id)}
            className="flex shrink-0 items-center gap-1 rounded-lg bg-[#43A047]/10 px-3 py-1.5 text-xs font-bold text-[#2E7D32]"
          >
            <Check size={13} /> Paham
          </button>
        </div>
      ))}
    </div>
  )
}
