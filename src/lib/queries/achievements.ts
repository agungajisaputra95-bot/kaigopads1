import { getKamokuMasteryStats, getExamAttemptsCount } from '@/lib/queries/dashboard'
import type { AchievementStats } from '@/lib/achievements'

const MASTERY_MIN_ANSWERED = 10
const MASTERY_MIN_PCT = 75

export async function getAchievementStats(userId: string): Promise<AchievementStats> {
  const [kamokuStats, examAttemptsCount] = await Promise.all([
    getKamokuMasteryStats(userId),
    getExamAttemptsCount(userId),
  ])

  let totalAnswered = 0
  let totalCorrect = 0
  let kamokuMasteredCount = 0

  for (const stat of Object.values(kamokuStats)) {
    totalAnswered += stat.total
    totalCorrect += stat.correct
    if (stat.total >= MASTERY_MIN_ANSWERED && (stat.correct / stat.total) * 100 >= MASTERY_MIN_PCT) {
      kamokuMasteredCount += 1
    }
  }

  return {
    totalAnswered,
    accuracyPct: totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null,
    kamokuMasteredCount,
    examAttemptsCount,
  }
}
