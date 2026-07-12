import { redirect } from 'next/navigation'
import { AnalyticsClient } from '@/components/analytics/AnalyticsClient'
import type { MatrixPart } from '@/components/analytics/SubjectMasteryMatrix'
import { getCachedUser } from '@/lib/supabase/server'
import { getKamokuMasteryStats, type KamokuStat } from '@/lib/queries/dashboard'
import { getExamScoreHistory, getStudyTimeAnalytics } from '@/lib/queries/analytics'
import { buildWeakSubjects } from '@/lib/weakSubjects'
import { KAMOKU_LIST, type KamokuPart } from '@/lib/constants'

const PART_LABEL: Record<KamokuPart, { label: string; badgeBg: string }> = {
  A: { label: 'A Part · Dasar & Teknik', badgeBg: '#1565C0' },
  B: { label: 'B Part · Tubuh & Lansia', badgeBg: '#FB8C00' },
  C: { label: 'C Part · Praktik & Kasus', badgeBg: '#43A047' },
}

function buildMatrixParts(stats: Record<number, KamokuStat>): MatrixPart[] {
  const parts: KamokuPart[] = ['A', 'B', 'C']

  return parts.map((part) => {
    const brand = PART_LABEL[part]
    const tiles = KAMOKU_LIST.filter((k) => k.part === part).map((k) => {
      const stat = stats[k.id]
      const total = stat?.total ?? 0
      const pct = total > 0 ? Math.round((stat.correct / total) * 100) : 0
      return { nameJp: k.nameJp, furiganaMap: [], pct, attempted: total > 0 }
    })

    return { part, label: brand.label, badgeBg: brand.badgeBg, tiles }
  })
}

export default async function AnalyticsPage() {
  const user = await getCachedUser()

  if (!user) redirect('/login')

  const [stats, scoreHistory, timeAnalytics] = await Promise.all([
    getKamokuMasteryStats(user.id),
    getExamScoreHistory(user.id),
    getStudyTimeAnalytics(user.id),
  ])

  return (
    <AnalyticsClient
      matrixParts={buildMatrixParts(stats)}
      scoreHistory={scoreHistory}
      weakSubjects={buildWeakSubjects(stats)}
      totalQuestionsAnswered={timeAnalytics.totalQuestionsAnswered}
      avgPerDay={timeAnalytics.avgPerDay}
      bestHourInsight={timeAnalytics.bestHourInsight}
      weekBars={timeAnalytics.weekBars}
    />
  )
}
