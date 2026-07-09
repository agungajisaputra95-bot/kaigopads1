import { ChevronRight } from 'lucide-react'
import { KAMOKU_LIST } from '@/lib/constants'
import type { Vocabulary } from '@/types/material'

interface VocabTableProps {
  vocab: Vocabulary[]
  onWordTap: (vocab: Vocabulary) => void
  title?: string
}

export function VocabTable({ vocab, onWordTap, title = '📖 Kosakata Penting' }: VocabTableProps) {
  return (
    <div className="rounded-2xl border border-[#37474F]/[0.05] bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-bold text-[#263238]">{title}</span>
        <span className="text-[11px] text-[#90A4AE]">Tap untuk detail</span>
      </div>
      <div className="mt-2.5 flex flex-col">
        {vocab.map((v) => {
          const kamoku = KAMOKU_LIST.find((k) => k.id === v.kamoku_id)
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onWordTap(v)}
              className="flex items-center gap-3 border-t border-[#ECEFF1] py-2.5 text-left"
            >
              <div className="w-28 shrink-0">
                <div className="jp text-[15px] font-semibold text-[#1565C0]">{v.kanji}</div>
                <div className="jp mt-0.5 text-[11px] text-[#90A4AE]">{v.furigana}</div>
              </div>
              <div className="flex-1 text-[13px] leading-snug text-[#455A64]">{v.meaning_id}</div>
              {kamoku && (
                <span className="shrink-0 whitespace-nowrap rounded-md bg-[#1565C0]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#1565C0]">
                  {kamoku.part}
                  {kamoku.id}
                </span>
              )}
              <ChevronRight size={16} className="shrink-0 text-[#B0BEC5]" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
