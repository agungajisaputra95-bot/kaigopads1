import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getCachedUser } from '@/lib/supabase/server'
import { getAchievementStats } from '@/lib/queries/achievements'
import { BADGES, getLevelInfo } from '@/lib/achievements'

export default async function AchievementsPage() {
  const user = await getCachedUser()
  if (!user) redirect('/login')

  const stats = await getAchievementStats(user.id)
  const level = getLevelInfo(stats.totalAnswered)
  const pct = level.tierSpan ? Math.min(100, Math.round((level.answeredIntoTier / level.tierSpan) * 100)) : 100

  return (
    <div className="flex flex-col gap-3.5">
      <Link href="/profile" className="flex items-center gap-1.5 text-xs font-bold text-[#1565C0]">
        <ArrowLeft size={14} /> Kembali ke Profil
      </Link>

      <div className="rounded-2xl bg-gradient-to-br from-[#7C5CFF] to-[#5433C4] p-5 text-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        <div className="text-xs font-semibold text-white/70">Level {level.level}</div>
        <div className="mt-0.5 text-xl font-extrabold">{level.title}</div>
        <div className="mt-0.5 text-xs text-white/70">{stats.totalAnswered} soal dijawab total</div>
        {level.nextTier ? (
          <>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-1.5 text-[11px] text-white/70">
              {level.tierSpan! - level.answeredIntoTier} soal lagi ke Level {level.nextTier.level} ({level.nextTier.title})
            </div>
          </>
        ) : (
          <div className="mt-3 text-[11px] text-white/70">Level maksimal tercapai 🎉</div>
        )}
      </div>

      <div>
        <div className="text-[13px] font-bold text-[#263238]">
          Lencana ({BADGES.filter((b) => b.isUnlocked(stats)).length}/{BADGES.length})
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          {BADGES.map((badge) => {
            const unlocked = badge.isUnlocked(stats)
            return (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-4 text-center shadow-[0_1px_3px_rgba(55,71,79,0.08)]"
                style={{ opacity: unlocked ? 1 : 0.4 }}
              >
                <div className="text-3xl">{unlocked ? badge.emoji : '🔒'}</div>
                <div className="text-xs font-bold text-[#263238]">{badge.title}</div>
                <div className="text-[10px] text-[#90A4AE]">{badge.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
