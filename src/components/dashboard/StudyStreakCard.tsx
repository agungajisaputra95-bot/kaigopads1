interface StudyStreakCardProps {
  streakDays: number
  activeDayFlags: boolean[]
}

export function StudyStreakCard({ streakDays, activeDayFlags }: StudyStreakCardProps) {
  return (
    <div className="flex items-center gap-3.5 rounded-[18px] bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FB8C00] to-[#E53935] text-2xl">
        🔥
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-2xl font-bold text-[#37474F]">{streakDays}</span>
          <span className="text-sm font-semibold text-[#546E7A]">hari beruntun</span>
        </div>
        <div className="mt-0.5 text-xs text-[#90A4AE]">Tetap semangat, jangan putus! 💪</div>
      </div>
      <div className="flex gap-1">
        {activeDayFlags.map((active, i) => (
          <span
            key={i}
            className="h-[7px] w-[7px] rounded-full"
            style={{ background: active ? '#FB8C00' : '#ECEFF1' }}
          />
        ))}
      </div>
    </div>
  )
}
