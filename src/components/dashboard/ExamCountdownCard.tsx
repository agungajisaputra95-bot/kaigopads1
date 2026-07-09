const RADIUS = 36
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface ExamCountdownCardProps {
  daysLeft: number
  examRound: string
  examDate: string
  readinessPct: number
}

export function ExamCountdownCard({
  daysLeft,
  examRound,
  examDate,
  readinessPct,
}: ExamCountdownCardProps) {
  const offset = (CIRCUMFERENCE * (1 - readinessPct / 100)).toFixed(2)

  return (
    <div className="flex items-center gap-4 rounded-[18px] bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      <div className="relative h-[84px] w-[84px] shrink-0">
        <svg width="84" height="84" viewBox="0 0 84 84">
          <circle cx="42" cy="42" r={RADIUS} fill="none" stroke="#ECEFF1" strokeWidth="8" />
          <circle
            cx="42"
            cy="42"
            r={RADIUS}
            fill="none"
            stroke="#43A047"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE.toFixed(2)}
            strokeDashoffset={offset}
            transform="rotate(-90 42 42)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-xl font-bold leading-none text-[#37474F]">
            {readinessPct}%
          </span>
          <span className="mt-0.5 text-[9px] text-[#78909C]">siap</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="text-xs font-semibold text-[#78909C]">Ujian Kaigofukushishi</div>
        <div className="mt-0.5 flex items-baseline gap-1.5">
          <span className="font-mono text-[34px] font-bold leading-none text-[#1565C0]">
            {daysLeft}
          </span>
          <span className="text-[15px] font-semibold text-[#37474F]">hari lagi</span>
        </div>
        <div className="mt-1.5 text-xs text-[#90A4AE]">
          {examRound} · {examDate}
        </div>
      </div>
    </div>
  )
}
