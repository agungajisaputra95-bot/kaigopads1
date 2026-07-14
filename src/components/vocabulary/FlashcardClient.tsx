'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, RotateCw, Shuffle, X, Check } from 'lucide-react'
import { KAMOKU_LIST } from '@/lib/constants'
import type { KamokuPart } from '@/lib/constants'
import { markVocabUnderstood, recordVocabTap } from '@/lib/actions/vocabularyProgress'
import type { Vocabulary } from '@/types/material'

const PART_FILTERS: { value: KamokuPart | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'A', label: 'A Part' },
  { value: 'B', label: 'B Part' },
  { value: 'C', label: 'C Part' },
]

const KAMOKU_PART_BY_ID: Record<number, KamokuPart> = {
  1: 'A', 2: 'A', 3: 'A', 4: 'A', 5: 'A', 6: 'A',
  7: 'B', 8: 'B', 9: 'B', 10: 'B', 11: 'B',
  12: 'C', 13: 'C',
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function FlashcardClient({ allVocab }: { allVocab: Vocabulary[] }) {
  const [partFilter, setPartFilter] = useState<KamokuPart | 'all'>('all')
  const [deck, setDeck] = useState<Vocabulary[]>(() => allVocab)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [knownCount, setKnownCount] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)

  const filteredVocab = useMemo(() => {
    if (partFilter === 'all') return allVocab
    return allVocab.filter((v) => KAMOKU_PART_BY_ID[v.kamoku_id] === partFilter)
  }, [allVocab, partFilter])

  function applyFilter(value: KamokuPart | 'all') {
    setPartFilter(value)
    const next = value === 'all' ? allVocab : allVocab.filter((v) => KAMOKU_PART_BY_ID[v.kamoku_id] === value)
    setDeck(next)
    setIndex(0)
    setFlipped(false)
    setKnownCount(0)
    setReviewCount(0)
  }

  function handleShuffle() {
    setDeck(shuffle(filteredVocab))
    setIndex(0)
    setFlipped(false)
  }

  function goTo(nextIndex: number) {
    setIndex(Math.max(0, Math.min(deck.length - 1, nextIndex)))
    setFlipped(false)
  }

  function handleReview() {
    const current = deck[index]
    if (!current) return
    recordVocabTap(current.id)
    setReviewCount((c) => c + 1)
    goTo(index + 1)
  }

  function handleKnown() {
    const current = deck[index]
    if (!current) return
    markVocabUnderstood(current.id)
    setKnownCount((c) => c + 1)
    goTo(index + 1)
  }

  const current = deck[index]
  const kamoku = current ? KAMOKU_LIST.find((k) => k.id === current.kamoku_id) : undefined
  const finished = deck.length > 0 && index >= deck.length - 1 && (knownCount + reviewCount) >= deck.length

  return (
    <div className="flex flex-col gap-3.5 pb-6">
      <div>
        <div className="text-lg font-extrabold text-[#263238]">Flashcard</div>
        <div className="mt-0.5 text-[13px] text-[#78909C]">
          Hafalkan kosakata dengan cepat — tap kartu untuk lihat artinya.
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
        {PART_FILTERS.map((f) => {
          const active = partFilter === f.value
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => applyFilter(f.value)}
              className="h-8 shrink-0 whitespace-nowrap rounded-full px-3.5 text-xs font-bold"
              style={{
                background: active ? '#00897B' : '#ECEFF1',
                color: active ? '#fff' : '#78909C',
              }}
            >
              {f.label}
            </button>
          )
        })}
        <button
          type="button"
          onClick={handleShuffle}
          disabled={deck.length === 0}
          className="ml-auto flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#ECEFF1] px-3.5 text-xs font-bold text-[#546E7A] disabled:opacity-50"
        >
          <Shuffle size={13} /> Acak
        </button>
      </div>

      {deck.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 text-center text-sm text-[#90A4AE] shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
          Belum ada kosakata untuk filter ini.
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between text-xs font-semibold text-[#90A4AE]">
            <span>
              Kartu {index + 1} / {deck.length}
            </span>
            <span className="flex items-center gap-2.5">
              <span className="text-[#43A047]">✓ {knownCount} hafal</span>
              <span className="text-[#E65100]">↻ {reviewCount} ulang</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="relative flex min-h-[220px] w-full flex-col items-center justify-center rounded-2xl p-6 text-center shadow-[0_1px_3px_rgba(55,71,79,0.08)] transition-colors"
            style={{ background: flipped ? '#263238' : '#fff' }}
          >
            <RotateCw
              size={14}
              className="absolute right-4 top-4"
              style={{ color: flipped ? 'rgba(255,255,255,0.4)' : '#CFD8DC' }}
            />

            {!flipped ? (
              <>
                {kamoku && (
                  <div className="jp mb-3 inline-block rounded-md bg-[#00897B]/10 px-2 py-0.5 text-[10px] font-semibold text-[#00897B]">
                    {kamoku.part} Part · {kamoku.nameJp}
                  </div>
                )}
                <div className="jp text-3xl font-bold leading-none text-[#263238]">{current.kanji}</div>
                <div className="jp mt-2 text-base text-[#78909C]">{current.furigana}</div>
                <div className="mt-4 text-[11px] font-semibold text-[#B0BEC5]">Tap untuk lihat arti</div>
              </>
            ) : (
              <>
                <div className="text-lg font-bold text-white">{current.meaning_id}</div>
                {current.example_sentence_jp && (
                  <>
                    <div className="my-3 h-px w-full bg-white/10" />
                    <div className="text-[11px] font-bold uppercase tracking-wide text-[#78909C]">Contoh</div>
                    <div className="jp mt-1 text-sm leading-snug text-[#ECEFF1]">{current.example_sentence_jp}</div>
                    {current.example_sentence_id && (
                      <div className="mt-0.5 text-[13px] text-[#90A4AE]">{current.example_sentence_id}</div>
                    )}
                  </>
                )}
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#CFD8DC] text-[#546E7A] disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleReview}
              className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border-[1.5px] border-[#E53935] bg-[#E53935]/[0.06] text-sm font-bold text-[#C62828]"
            >
              <X size={16} /> Belum Hafal
            </button>
            <button
              type="button"
              onClick={handleKnown}
              className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border-[1.5px] border-[#43A047] bg-[#43A047]/[0.06] text-sm font-bold text-[#2E7D32]"
            >
              <Check size={16} /> Sudah Hafal
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === deck.length - 1}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#CFD8DC] text-[#546E7A] disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {finished && (
            <div className="rounded-2xl bg-[#00897B]/[0.08] p-4 text-center text-sm font-semibold text-[#00897B]">
              🎉 Selesai satu putaran deck ini — {knownCount} hafal, {reviewCount} perlu diulang.
            </div>
          )}
        </>
      )}
    </div>
  )
}
