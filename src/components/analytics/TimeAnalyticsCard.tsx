import type { ReactNode } from 'react'

export interface WeekBar {
  day: string
  count: number
}

interface TimeAnalyticsCardProps {
  totalQuestionsAnswered: number
  avgPerDay: number
  insight: ReactNode | null
  weekBars: WeekBar[]
}

const MAX_BAR_HEIGHT_PX = 74

function barColor(count: number, max: number) {
  if (max === 0) return 'rgba(21,101,192,0.28)'
  const ratio = count / max
  if (ratio >= 0.75) return '#1565C0'
  if (ratio >= 0.35) return 'rgba(21,101,192,0.55)'
  return 'rgba(21,101,192,0.28)'
}

export function TimeAnalyticsCard({ totalQuestionsAnswered, avgPerDay, insight, weekBars }: TimeAnalyticsCardProps) {
  const maxCount = Math.max(1, ...weekBars.map((b) => b.count))

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex gap-2.5">
        <div className="flex-1 rounded-2xl bg-white p-3.5 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
          <div className="font-mono text-2xl font-bold text-[#1565C0]">
            {totalQuestionsAnswered}
            <span className="text-[13px] font-medium text-[#90A4AE]"> soal</span>
          </div>
          <div className="mt-0.5 text-[11px] text-[#78909C]">Total soal dikerjakan</div>
        </div>
        <div className="flex-1 rounded-2xl bg-white p-3.5 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
          <div className="font-mono text-2xl font-bold text-[#1565C0]">
            {avgPerDay}
            <span className="text-[13px] font-medium text-[#90A4AE]"> soal</span>
          </div>
          <div className="mt-0.5 text-[11px] text-[#78909C]">Rata-rata / hari aktif</div>
        </div>
      </div>

      {insight && (
        <div className="flex items-start gap-2 rounded-xl bg-[#43A047]/[0.08] p-3">
          <span className="shrink-0 text-base">💡</span>
          <span className="text-[12.5px] leading-relaxed text-[#2E7D32]">{insight}</span>
        </div>
      )}

      <div className="rounded-2xl bg-white p-3.5 pb-2.5 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        <div className="mb-3.5 text-xs font-bold text-[#546E7A]">Distribusi belajar 7 hari terakhir</div>
        <div className="flex h-[100px] items-end justify-between gap-1.5">
          {weekBars.map((b, i) => {
            const height = b.count === 0 ? 4 : Math.max(6, (b.count / maxCount) * MAX_BAR_HEIGHT_PX)
            const highlighted = b.count === maxCount && b.count > 0
            return (
              <div key={`${b.day}-${i}`} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <span className="font-mono text-[9px] font-bold text-[#90A4AE]">{b.count}</span>
                <div
                  className="w-full rounded-t-[5px]"
                  style={{ height: `${height}px`, background: barColor(b.count, maxCount) }}
                />
                <span
                  className="text-[10px] font-semibold"
                  style={{ color: highlighted ? '#1565C0' : '#90A4AE' }}
                >
                  {b.day}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
