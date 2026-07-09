'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { KAMOKU_LIST } from '@/lib/constants'
import { markVocabUnderstood, recordVocabTap } from '@/lib/actions/vocabularyProgress'
import type { Vocabulary } from '@/types/material'

interface TapToRevealPopupProps {
  vocab: Vocabulary
  onClose: () => void
}

export function TapToRevealPopup({ vocab, onClose }: TapToRevealPopupProps) {
  const kamoku = KAMOKU_LIST.find((k) => k.id === vocab.kamoku_id)

  // Setiap kali kata ini di-tap (popup dibuka), catat sebagai sinyal "perlu diulang"
  // ke sistem spaced repetition kosakata — lihat PRD 5.2/5.3.
  useEffect(() => {
    recordVocabTap(vocab.id)
  }, [vocab.id])

  function handleUnderstood() {
    markVocabUnderstood(vocab.id)
    onClose()
  }

  return (
    <div className="fixed inset-x-0 bottom-3 z-30 mx-auto w-full max-w-sm px-3">
      <div className="rounded-2xl bg-[#263238] p-4 text-white shadow-[0_12px_30px_rgba(38,50,56,0.4)]">
        <div className="flex items-start justify-between gap-2.5">
          <div>
            <div className="jp text-2xl font-bold leading-none">{vocab.kanji}</div>
            <div className="jp mt-1 text-sm text-[#80CBC4]">{vocab.furigana}</div>
            {kamoku && (
              <div className="jp mt-1.5 inline-block rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-[#B0BEC5]">
                {kamoku.part} Part · {kamoku.nameJp}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.12]"
          >
            <X size={15} />
          </button>
        </div>
        <div className="mt-3 text-[15px] font-semibold">{vocab.meaning_id}</div>
        {vocab.example_sentence_jp && (
          <>
            <div className="my-3 h-px bg-white/10" />
            <div className="text-[11px] font-bold uppercase tracking-wide text-[#78909C]">Contoh</div>
            <div className="jp mt-1 text-sm leading-snug text-[#ECEFF1]">{vocab.example_sentence_jp}</div>
            {vocab.example_sentence_id && (
              <div className="mt-0.5 text-[13px] text-[#90A4AE]">{vocab.example_sentence_id}</div>
            )}
          </>
        )}
        <button
          type="button"
          onClick={handleUnderstood}
          className="mt-3 h-[38px] w-full rounded-[10px] bg-white/[0.12] text-xs font-semibold"
        >
          ✓ Sudah paham, jangan tampilkan lagi
        </button>
      </div>
    </div>
  )
}
