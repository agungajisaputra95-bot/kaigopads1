'use client'

import { useState } from 'react'
import { FuriganaPill } from '@/components/ui/FuriganaPill'
import { SubjectMasteryMatrix, type MatrixPart } from '@/components/analytics/SubjectMasteryMatrix'
import { ScoreTrendChart, type ScorePoint } from '@/components/analytics/ScoreTrendChart'
import { WeakSubjectsList, type WeakSubjectItem } from '@/components/analytics/WeakSubjectsList'
import { TimeAnalyticsCard, type WeekBar } from '@/components/analytics/TimeAnalyticsCard'

const TABS = ['Overview', 'Per Kamoku', 'Tren Skor', 'Waktu Belajar'] as const

interface AnalyticsClientProps {
  matrixParts: MatrixPart[]
  scoreHistory: ScorePoint[]
  weakSubjects: WeakSubjectItem[]
  totalQuestionsAnswered: number
  avgPerDay: number
  bestHourInsight: string | null
  weekBars: WeekBar[]
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 text-center text-[13px] text-[#90A4AE] shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      {message}
    </div>
  )
}

export function AnalyticsClient({
  matrixParts,
  scoreHistory,
  weakSubjects,
  totalQuestionsAnswered,
  avgPerDay,
  bestHourInsight,
  weekBars,
}: AnalyticsClientProps) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Overview')
  const lastScore = scoreHistory[scoreHistory.length - 1]
  const prevScore = scoreHistory[scoreHistory.length - 2]
  const delta = lastScore && prevScore ? lastScore.score - prevScore.score : null

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-20 bg-white px-4 pt-3.5 shadow-[0_1px_8px_rgba(55,71,79,0.05)]">
        <div className="flex items-center justify-between">
          <span className="text-xl font-extrabold tracking-tight text-[#263238]">Progress Belajar</span>
          <FuriganaPill compact />
        </div>
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-2 [scrollbar-width:none]">
          {TABS.map((tab) => {
            const active = tab === activeTab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className="h-[34px] shrink-0 whitespace-nowrap rounded-[18px] px-3.5 text-[13px] font-bold"
                style={{
                  background: active ? '#1565C0' : '#ECEFF1',
                  color: active ? '#fff' : '#78909C',
                  boxShadow: active ? '0 2px 6px rgba(21,101,192,0.28)' : 'none',
                }}
              >
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-10 pt-4">
        <div>
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[15px] font-bold text-[#263238]">Subject Mastery Matrix</span>
            <span className="text-[11px] text-[#90A4AE]">Tap tile untuk detail</span>
          </div>
          <SubjectMasteryMatrix parts={matrixParts} />
        </div>

        <div>
          <div className="mb-2.5 text-[15px] font-bold text-[#263238]">Tren Skor Mock Exam</div>
          {scoreHistory.length > 0 ? (
            <div className="rounded-2xl bg-white p-3.5 pb-3 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
              <div className="mb-2.5 flex items-baseline justify-between">
                <div>
                  <span className="font-mono text-2xl font-bold text-[#43A047]">{lastScore.score}</span>
                  <span className="text-[13px] text-[#90A4AE]">/125 skor terbaru</span>
                </div>
                {delta !== null && (
                  <span
                    className="rounded-lg px-2.5 py-1 text-[11px] font-bold"
                    style={{
                      background: delta >= 0 ? 'rgba(67,160,71,0.12)' : 'rgba(229,57,53,0.12)',
                      color: delta >= 0 ? '#2E7D32' : '#C62828',
                    }}
                  >
                    {delta >= 0 ? '↗' : '↘'} {delta >= 0 ? '+' : ''}
                    {delta} dari lalu
                  </span>
                )}
              </div>
              <ScoreTrendChart points={scoreHistory} maxScore={125} passScore={75} />
            </div>
          ) : (
            <EmptyState message="Belum ada hasil mock exam. Kerjakan simulasi ujian pertamamu untuk mulai lihat tren skor." />
          )}
        </div>

        <div>
          <div className="mb-2.5 text-[15px] font-bold text-[#263238]">Kamoku Paling Lemah</div>
          {weakSubjects.length > 0 ? (
            <WeakSubjectsList items={weakSubjects} />
          ) : (
            <EmptyState message="Belum ada data latihan. Mulai kerjakan soal per kamoku dulu, nanti area lemahmu muncul di sini." />
          )}
        </div>

        <div>
          <div className="mb-2.5 text-[15px] font-bold text-[#263238]">Analisis Waktu Belajar</div>
          {totalQuestionsAnswered > 0 ? (
            <TimeAnalyticsCard
              totalQuestionsAnswered={totalQuestionsAnswered}
              avgPerDay={avgPerDay}
              insight={bestHourInsight}
              weekBars={weekBars}
            />
          ) : (
            <EmptyState message="Belum ada aktivitas belajar. Statistik waktu belajar akan muncul setelah kamu mulai mengerjakan soal." />
          )}
        </div>
      </div>
    </div>
  )
}
