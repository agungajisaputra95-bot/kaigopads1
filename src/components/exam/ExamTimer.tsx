const URGENT_THRESHOLD_SECONDS = 10 * 60

interface ExamTimerProps {
  secondsRemaining: number
  questionNumber: number
  totalQuestions: number
  examLabel: string
}

function formatTime(totalSeconds: number) {
  const s = Math.max(0, totalSeconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return [h, m, sec].map((n) => String(n).padStart(2, '0')).join(':')
}

export function ExamTimer({ secondsRemaining, questionNumber, totalQuestions, examLabel }: ExamTimerProps) {
  const urgent = secondsRemaining < URGENT_THRESHOLD_SECONDS
  const progressPct = (questionNumber / totalQuestions) * 100

  return (
    <div className="bg-[#263238] px-4 py-3.5">
      <div className="flex items-center justify-between">
        <div>
          <div
            className="text-[10px] font-bold uppercase tracking-wide"
            style={{ color: urgent ? '#EF9A9A' : '#90A4AE' }}
          >
            {urgent ? '⚠ Waktu hampir habis' : 'Sisa waktu'}
          </div>
          <div className="mt-0.5 text-[11px] text-[#B0BEC5]">{examLabel}</div>
        </div>
        <div
          className={`font-mono text-[30px] font-bold tracking-wide ${urgent ? 'animate-pulse' : ''}`}
          style={{ color: urgent ? '#FF5A54' : '#fff' }}
        >
          {formatTime(secondsRemaining)}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2.5">
        <span className="whitespace-nowrap text-xs font-bold text-[#CFD8DC]">
          Soal <span className="font-mono text-white">{questionNumber}</span>/{totalQuestions}
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.15]">
          <div
            className="h-full rounded-full"
            style={{ width: `${progressPct}%`, background: urgent ? '#E53935' : '#43A047' }}
          />
        </div>
      </div>
    </div>
  )
}
