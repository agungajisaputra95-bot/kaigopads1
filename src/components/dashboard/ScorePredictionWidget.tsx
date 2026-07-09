interface ScorePredictionWidgetProps {
  estimatedScore: number
  totalQuestions: number
  estimatedPercent: number
  passThresholdPercent: number
  onTrack: boolean
}

export function ScorePredictionWidget({
  estimatedScore,
  totalQuestions,
  estimatedPercent,
  passThresholdPercent,
  onTrack,
}: ScorePredictionWidgetProps) {
  return (
    <div className="rounded-[18px] bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#78909C]">Estimasi Skor Ujian</span>
        {onTrack && (
          <span className="rounded-full bg-[#43A047]/[0.12] px-2.5 py-1 text-[11px] font-bold text-[#2E7D32]">
            On track lulus ✓
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-[32px] font-bold leading-none text-[#37474F]">
          {estimatedScore}
          <span className="text-[#B0BEC5]">/{totalQuestions}</span>
        </span>
        <span className="font-mono text-base font-bold text-[#43A047]">{estimatedPercent}%</span>
      </div>
      <div className="relative mt-3.5 h-2 rounded-full bg-[#ECEFF1]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#43A047]"
          style={{ width: `${estimatedPercent}%` }}
        />
        <div
          className="absolute -inset-y-1 w-0.5 rounded bg-[#37474F]"
          style={{ left: `${passThresholdPercent}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between">
        <span className="text-[10px] text-[#90A4AE]">Berdasarkan mock exam terakhir</span>
        <span className="text-[10px] font-semibold text-[#546E7A]">
          Batas lulus {passThresholdPercent}%
        </span>
      </div>
    </div>
  )
}
