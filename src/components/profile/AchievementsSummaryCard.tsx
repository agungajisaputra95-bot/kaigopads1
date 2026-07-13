import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { BADGES, getLevelInfo, type AchievementStats } from '@/lib/achievements'

export function AchievementsSummaryCard({ stats }: { stats: AchievementStats }) {
  const level = getLevelInfo(stats.totalAnswered)
  const unlockedCount = BADGES.filter((b) => b.isUnlocked(stats)).length
  const pct = level.tierSpan ? Math.min(100, Math.round((level.answeredIntoTier / level.tierSpan) * 100)) : 100

  return (
    <Link
      href="/profile/achievements"
      className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]"
    >
      <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C5CFF] to-[#5433C4] text-lg font-extrabold text-white">
        Lv{level.level}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[15px] font-bold text-[#263238]">{level.title}</span>
          <span className="text-xs text-[#90A4AE]">· {unlockedCount}/{BADGES.length} lencana</span>
        </div>
        {level.nextTier ? (
          <>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#ECEFF1]">
              <div className="h-full rounded-full bg-[#7C5CFF]" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-1 text-[10px] text-[#90A4AE]">
              {level.tierSpan! - level.answeredIntoTier} soal lagi ke Level {level.nextTier.level} ({level.nextTier.title})
            </div>
          </>
        ) : (
          <div className="mt-0.5 text-xs text-[#90A4AE]">Level maksimal tercapai 🎉</div>
        )}
      </div>
      <ChevronRight size={16} className="shrink-0 text-[#B0BEC5]" />
    </Link>
  )
}
