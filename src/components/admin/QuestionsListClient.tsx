'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Search } from 'lucide-react'
import { KAMOKU_LIST, type KamokuPart } from '@/lib/constants'
import type { AdminQuestionListItem } from '@/lib/queries/admin'

type StatusFilter = 'all' | 'draft' | 'complete'

const PART_BADGE_BG: Record<KamokuPart, string> = { A: '#1565C0', B: '#FB8C00', C: '#43A047' }

interface QuestionsListClientProps {
  questions: AdminQuestionListItem[]
  initialKamokuId?: number
}

export function QuestionsListClient({ questions, initialKamokuId }: QuestionsListClientProps) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [expanded, setExpanded] = useState<Set<number>>(
    () => new Set(initialKamokuId ? [initialKamokuId] : [])
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return questions.filter((item) => {
      if (statusFilter === 'draft' && item.correct_answer !== null) return false
      if (statusFilter === 'complete' && item.correct_answer === null) return false
      if (q && !item.question_text_jp.toLowerCase().includes(q)) return false
      return true
    })
  }, [questions, query, statusFilter])

  const groups = useMemo(() => {
    const byKamoku = new Map<number, AdminQuestionListItem[]>()
    for (const item of filtered) {
      const list = byKamoku.get(item.kamoku_id) ?? []
      list.push(item)
      byKamoku.set(item.kamoku_id, list)
    }
    return KAMOKU_LIST.map((k) => ({
      kamoku: k,
      items: byKamoku.get(k.id) ?? [],
    })).filter((g) => g.items.length > 0)
  }, [filtered])

  const isSearching = query.trim().length > 0
  const draftCount = questions.filter((q) => q.correct_answer === null).length

  function toggle(kamokuId: number) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(kamokuId)) next.delete(kamokuId)
      else next.add(kamokuId)
      return next
    })
  }

  return (
    <div className="flex-1 px-7 py-5">
      <div className="mb-4 flex items-center gap-3 text-sm">
        <span className="font-bold text-[#263238]">{questions.length} soal total</span>
        {draftCount > 0 && (
          <span className="rounded-full bg-[#FB8C00]/[0.12] px-2.5 py-1 text-xs font-bold text-[#E65100]">
            {draftCount} perlu jawaban
          </span>
        )}
      </div>

      <div className="mb-4 flex items-center gap-2.5">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari teks soal…"
            className="h-9 w-full rounded-lg border border-[#CFD8DC] bg-white pl-9 pr-3 text-[13px] text-[#263238]"
          />
          <Search size={14} className="pointer-events-none absolute left-3 top-[11px] text-[#B0BEC5]" />
        </div>
        <div className="flex gap-1.5">
          {(
            [
              { value: 'all', label: 'Semua' },
              { value: 'draft', label: 'Draft' },
              { value: 'complete', label: 'Lengkap' },
            ] as const
          ).map((f) => {
            const active = statusFilter === f.value
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setStatusFilter(f.value)}
                className="h-9 rounded-lg px-3 text-xs font-bold"
                style={{ background: active ? '#1565C0' : '#ECEFF1', color: active ? '#fff' : '#78909C' }}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {groups.length === 0 && (
          <div className="rounded-xl bg-white p-6 text-center text-sm text-[#90A4AE] shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
            Tidak ada soal yang cocok.
          </div>
        )}
        {groups.map(({ kamoku, items }) => {
          const isOpen = isSearching || expanded.has(kamoku.id)
          const draftInGroup = items.filter((i) => i.correct_answer === null).length
          return (
            <div key={kamoku.id} className="overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
              <button
                type="button"
                onClick={() => toggle(kamoku.id)}
                className="flex w-full items-center gap-2.5 px-4 py-3 text-left"
              >
                {isOpen ? (
                  <ChevronDown size={16} className="shrink-0 text-[#90A4AE]" />
                ) : (
                  <ChevronRight size={16} className="shrink-0 text-[#90A4AE]" />
                )}
                <span
                  className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white"
                  style={{ background: PART_BADGE_BG[kamoku.part] }}
                >
                  {kamoku.part}
                  {kamoku.id}
                </span>
                <span className="jp min-w-0 flex-1 truncate text-sm font-bold text-[#263238]">{kamoku.nameJp}</span>
                <span className="shrink-0 text-xs text-[#90A4AE]">{items.length} soal</span>
                {draftInGroup > 0 && (
                  <span className="shrink-0 rounded-full bg-[#FB8C00]/[0.12] px-2 py-0.5 text-[10px] font-bold text-[#E65100]">
                    {draftInGroup} draft
                  </span>
                )}
              </button>

              {isOpen && (
                <div className="border-t border-[#ECEFF1]">
                  {items.map((q) => {
                    const isDraft = q.correct_answer === null
                    return (
                      <Link
                        key={q.id}
                        href={`/admin/questions/${q.id}`}
                        className="flex items-center gap-3 border-t border-[#ECEFF1] px-4 py-2.5 first:border-t-0"
                      >
                        <span
                          className="shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-bold"
                          style={{
                            background: isDraft ? 'rgba(251,140,0,0.12)' : 'rgba(67,160,71,0.12)',
                            color: isDraft ? '#E65100' : '#2E7D32',
                          }}
                        >
                          {isDraft ? 'DRAFT' : 'OK'}
                        </span>
                        <span className="jp min-w-0 flex-1 truncate text-[13px] text-[#37474F]">
                          {q.question_text_jp}
                        </span>
                        <span className="shrink-0 text-[11px] text-[#B0BEC5]">{q.source ?? '-'}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
