'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { KAMOKU_LIST, type KamokuPart } from '@/lib/constants'

type Difficulty = 'easy' | 'medium' | 'hard'

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string; color: string }[] = [
  { value: 'easy', label: 'Easy', color: '#43A047' },
  { value: 'medium', label: 'Medium', color: '#FB8C00' },
  { value: 'hard', label: 'Hard', color: '#E53935' },
]

const QUESTION_COUNT_OPTIONS = [10, 20, 30, 50]

const PARTS: KamokuPart[] = ['A', 'B', 'C']

export default function CustomPracticePage() {
  const router = useRouter()
  const [selectedKamoku, setSelectedKamoku] = useState<Set<number>>(new Set())
  const [selectedDifficulties, setSelectedDifficulties] = useState<Set<Difficulty>>(
    new Set(['easy', 'medium', 'hard'])
  )
  const [questionCount, setQuestionCount] = useState(20)
  const [weakOnly, setWeakOnly] = useState(false)

  const kamokuByPart = useMemo(
    () => PARTS.map((part) => ({ part, kamoku: KAMOKU_LIST.filter((k) => k.part === part) })),
    []
  )

  function toggleKamoku(id: number) {
    setSelectedKamoku((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleDifficulty(value: Difficulty) {
    setSelectedDifficulties((prev) => {
      const next = new Set(prev)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })
  }

  function handleStart() {
    const params = new URLSearchParams({
      kamoku: [...selectedKamoku].join(','),
      difficulty: [...selectedDifficulties].join(','),
      count: String(questionCount),
      weak: weakOnly ? '1' : '0',
    })
    router.push(`/study/custom/session?${params.toString()}`)
  }

  const canStart = selectedKamoku.size > 0 && selectedDifficulties.size > 0

  return (
    <div className="flex flex-col gap-3.5 pb-6">
      <div>
        <div className="text-lg font-extrabold text-[#263238]">Kustomisasi Latihan</div>
        <div className="mt-0.5 text-[13px] text-[#78909C]">
          Pilih sendiri kamoku, tingkat kesulitan, dan jumlah soal.
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#263238]">Kamoku</span>
          <span className="text-xs text-[#90A4AE]">{selectedKamoku.size} dipilih</span>
        </div>
        <div className="flex flex-col gap-3">
          {kamokuByPart.map(({ part, kamoku }) => (
            <div key={part}>
              <div className="mb-1.5 text-[11px] font-bold text-[#78909C]">{part} Part</div>
              <div className="grid grid-cols-2 gap-1.5">
                {kamoku.map((k) => {
                  const active = selectedKamoku.has(k.id)
                  return (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => toggleKamoku(k.id)}
                      className="jp flex items-center gap-2 rounded-lg p-2 text-left text-xs"
                      style={{
                        border: `1.5px solid ${active ? '#1565C0' : '#ECEFF1'}`,
                        background: active ? 'rgba(21,101,192,0.05)' : '#fff',
                        color: active ? '#1565C0' : '#455A64',
                      }}
                    >
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] text-[10px] text-white"
                        style={{ background: active ? '#1565C0' : '#CFD8DC' }}
                      >
                        {active && '✓'}
                      </span>
                      <span className="line-clamp-1 font-medium">{k.nameJp}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        <div className="mb-2.5 text-[13px] font-bold text-[#263238]">Tingkat Kesulitan</div>
        <div className="flex gap-1.5">
          {DIFFICULTY_OPTIONS.map((d) => {
            const active = selectedDifficulties.has(d.value)
            return (
              <button
                key={d.value}
                type="button"
                onClick={() => toggleDifficulty(d.value)}
                className="h-9 flex-1 rounded-lg text-xs font-bold"
                style={{
                  border: `1.5px solid ${active ? d.color : '#CFD8DC'}`,
                  background: active ? d.color : '#fff',
                  color: active ? '#fff' : '#90A4AE',
                }}
              >
                {d.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        <div className="mb-2.5 text-[13px] font-bold text-[#263238]">Jumlah Soal</div>
        <div className="flex gap-1.5">
          {QUESTION_COUNT_OPTIONS.map((count) => {
            const active = questionCount === count
            return (
              <button
                key={count}
                type="button"
                onClick={() => setQuestionCount(count)}
                className="h-9 flex-1 rounded-lg font-mono text-xs font-bold"
                style={{
                  border: `1.5px solid ${active ? '#1565C0' : '#CFD8DC'}`,
                  background: active ? '#1565C0' : '#fff',
                  color: active ? '#fff' : '#90A4AE',
                }}
              >
                {count}
              </button>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setWeakOnly((v) => !v)}
        className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]"
      >
        <div className="text-left">
          <div className="text-[13px] font-bold text-[#263238]">Hanya soal belum dikerjakan / lemah</div>
          <div className="mt-0.5 text-xs text-[#90A4AE]">Lewati soal yang sudah kamu kuasai</div>
        </div>
        <span
          className="flex h-6 w-10 shrink-0 items-center rounded-full p-0.5 transition-colors"
          style={{ background: weakOnly ? '#1565C0' : '#CFD8DC' }}
        >
          <span
            className="h-5 w-5 rounded-full bg-white shadow transition-transform"
            style={{ transform: weakOnly ? 'translateX(16px)' : 'translateX(0)' }}
          />
        </span>
      </button>

      <button
        type="button"
        onClick={handleStart}
        disabled={!canStart}
        className="h-[52px] w-full rounded-2xl text-base font-bold"
        style={{
          background: canStart ? '#1565C0' : '#CFD8DC',
          color: canStart ? '#fff' : '#78909C',
          boxShadow: canStart ? '0 6px 18px rgba(21,101,192,0.3)' : 'none',
        }}
      >
        {canStart ? 'Mulai Latihan Custom' : 'Pilih minimal 1 kamoku'}
      </button>
    </div>
  )
}
