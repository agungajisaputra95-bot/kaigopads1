'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { VocabTable } from '@/components/materi/VocabTable'
import { TapToRevealPopup } from '@/components/ui/TapToRevealPopup'
import type { KamokuPart } from '@/lib/constants'
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

export function KosakataClient({ allVocab }: { allVocab: Vocabulary[] }) {
  const [query, setQuery] = useState('')
  const [partFilter, setPartFilter] = useState<KamokuPart | 'all'>('all')
  const [dictVocab, setDictVocab] = useState<Vocabulary | null>(null)

  const filteredVocab = useMemo(() => {
    return allVocab.filter((v) => {
      const matchesPart = partFilter === 'all' || KAMOKU_PART_BY_ID[v.kamoku_id] === partFilter
      const matchesQuery =
        query.trim() === '' ||
        v.kanji.includes(query) ||
        v.furigana.includes(query) ||
        v.meaning_id.toLowerCase().includes(query.toLowerCase())
      return matchesPart && matchesQuery
    })
  }, [allVocab, query, partFilter])

  return (
    <div className="flex flex-col gap-3.5 pb-6">
      <div>
        <div className="text-lg font-extrabold text-[#263238]">Kosakata</div>
        <div className="mt-0.5 text-[13px] text-[#78909C]">
          Kamus istilah penting dari semua kamoku, lengkap dengan arti, contoh kalimat, dan asal kamoku.
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari kanji, furigana, atau arti…"
          className="h-11 w-full rounded-xl border border-[#CFD8DC] bg-white pl-10 pr-3.5 text-sm text-[#263238] shadow-[0_1px_3px_rgba(55,71,79,0.06)]"
        />
        <Search size={16} className="pointer-events-none absolute left-3.5 top-[14px] text-[#B0BEC5]" />
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
        {PART_FILTERS.map((f) => {
          const active = partFilter === f.value
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setPartFilter(f.value)}
              className="h-8 shrink-0 whitespace-nowrap rounded-full px-3.5 text-xs font-bold"
              style={{
                background: active ? '#1565C0' : '#ECEFF1',
                color: active ? '#fff' : '#78909C',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {allVocab.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 text-center text-sm text-[#90A4AE] shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
          Belum ada kosakata di database. Tambahkan lewat Admin CMS.
        </div>
      ) : filteredVocab.length > 0 ? (
        <VocabTable
          vocab={filteredVocab}
          onWordTap={setDictVocab}
          title={`📖 ${filteredVocab.length} Kosakata`}
        />
      ) : (
        <div className="rounded-2xl bg-white p-6 text-center text-sm text-[#90A4AE] shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
          Tidak ada kosakata yang cocok.
        </div>
      )}

      {dictVocab && <TapToRevealPopup vocab={dictVocab} onClose={() => setDictVocab(null)} />}
    </div>
  )
}
