import { redirect } from 'next/navigation'
import { RecommendedPathCard } from '@/components/dashboard/RecommendedPathCard'
import { ExamCountdownCard } from '@/components/dashboard/ExamCountdownCard'
import { ScorePredictionWidget } from '@/components/dashboard/ScorePredictionWidget'
import { SubjectOverviewGrid, type PartSummary } from '@/components/dashboard/SubjectOverviewGrid'
import { WeakQueueCard } from '@/components/dashboard/WeakQueueCard'
import { StudyStreakCard } from '@/components/dashboard/StudyStreakCard'
import { getCachedUser } from '@/lib/supabase/server'
import {
  getKamokuMasteryStats,
  getWeakQueueCount,
  getStudyStreakDays,
  getLatestExamAttempt,
  type KamokuStat,
} from '@/lib/queries/dashboard'
import {
  KAMOKU_LIST,
  NEXT_EXAM_DATE,
  NEXT_EXAM_DATE_LABEL,
  NEXT_EXAM_ROUND,
  type KamokuPart,
} from '@/lib/constants'
import { daysUntil, masteryColor } from '@/lib/utils'
import { getWeakVocabCount, getWeakVocabQueue } from '@/lib/queries/vocabulary'

const PART_BRAND: Record<KamokuPart, { label: string; sub: string; headerBg: string; badgeBg: string }> = {
  A: { label: 'A Part', sub: 'Dasar & Teknik Kaigo', headerBg: 'rgba(21,101,192,0.06)', badgeBg: '#1565C0' },
  B: { label: 'B Part', sub: 'Tubuh & Kondisi Lansia', headerBg: 'rgba(251,140,0,0.07)', badgeBg: '#FB8C00' },
  C: { label: 'C Part', sub: 'Aplikasi Praktik & Kasus', headerBg: 'rgba(67,160,71,0.07)', badgeBg: '#43A047' },
}

function buildPartSummaries(stats: Record<number, KamokuStat>): PartSummary[] {
  const parts: KamokuPart[] = ['A', 'B', 'C']

  return parts.map((part) => {
    const kamokuInPart = KAMOKU_LIST.filter((k) => k.part === part)
    let partCorrect = 0
    let partTotal = 0

    const kamoku = kamokuInPart.map((k) => {
      const stat = stats[k.id]
      const total = stat?.total ?? 0
      const correct = stat?.correct ?? 0
      partCorrect += correct
      partTotal += total
      const pct = total > 0 ? Math.round((correct / total) * 100) : 0
      return {
        id: k.id,
        num: k.id,
        nameJp: k.nameJp,
        furiganaMap: [],
        pct,
        color: total > 0 ? masteryColor(pct) : '#B0BEC5',
        frac: `${correct}/${total}`,
      }
    })

    const partPct = partTotal > 0 ? Math.round((partCorrect / partTotal) * 100) : 0
    const brand = PART_BRAND[part]

    return {
      part,
      label: brand.label,
      sub: brand.sub,
      pctLabel: partTotal > 0 ? `${partPct}%` : '–',
      pctColor: partTotal > 0 ? masteryColor(partPct) : '#B0BEC5',
      frac: `${partCorrect}/${partTotal}`,
      headerBg: brand.headerBg,
      badgeBg: brand.badgeBg,
      kamoku,
    }
  })
}

export default async function DashboardPage() {
  const user = await getCachedUser()

  if (!user) redirect('/login')

  const [stats, weakCount, streakDays, latestExam, weakVocab, weakVocabCount] = await Promise.all([
    getKamokuMasteryStats(user.id),
    getWeakQueueCount(user.id),
    getStudyStreakDays(user.id),
    getLatestExamAttempt(user.id),
    getWeakVocabQueue(user.id),
    getWeakVocabCount(user.id),
  ])

  const parts = buildPartSummaries(stats)
  const allKamoku = parts.flatMap((p) => p.kamoku)

  // Rekomendasi: kamoku paling lemah yang sudah pernah dikerjakan, atau kamoku pertama kalau belum ada yang dikerjakan sama sekali.
  const attempted = allKamoku.filter((k) => k.frac.split('/')[1] !== '0')
  const recommended =
    attempted.length > 0
      ? attempted.reduce((weakest, k) => (k.pct < weakest.pct ? k : weakest))
      : allKamoku[0]
  const recommendedKamoku = KAMOKU_LIST.find((k) => k.id === recommended.id)!

  const activeDayFlags = Array.from({ length: 7 }, (_, i) => i < Math.min(streakDays, 7))

  const daysLeft = daysUntil(NEXT_EXAM_DATE)

  // Kesiapan = akurasi keseluruhan berdasarkan riwayat jawaban user (bukan angka tetap).
  const totalAnswered = Object.values(stats).reduce((sum, s) => sum + s.total, 0)
  const totalCorrect = Object.values(stats).reduce((sum, s) => sum + s.correct, 0)
  const readinessPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0

  return (
    <>
      <RecommendedPathCard
        kamokuNameJp={recommendedKamoku.nameJp}
        furiganaMap={[]}
        isWeak={recommended.pct > 0 && recommended.pct < 60}
        modeLabel="Soal Dulu"
        href={`/study/${recommendedKamoku.id}/practice`}
      />

      <ExamCountdownCard
        daysLeft={daysLeft}
        examRound={NEXT_EXAM_ROUND}
        examDate={NEXT_EXAM_DATE_LABEL}
        readinessPct={readinessPct}
      />

      {latestExam ? (
        <ScorePredictionWidget
          estimatedScore={latestExam.correct_count}
          totalQuestions={latestExam.total_questions}
          estimatedPercent={Math.round((latestExam.correct_count / latestExam.total_questions) * 100)}
          passThresholdPercent={60}
          onTrack={latestExam.correct_count / latestExam.total_questions >= 0.6}
        />
      ) : null}

      <SubjectOverviewGrid parts={parts} />

      {(weakCount > 0 || weakVocabCount > 0) && (
        <WeakQueueCard
          questionCount={weakCount}
          vocabCount={weakVocabCount}
          vocabWords={weakVocab.map((v) => v.kanji)}
          href="/study/weak-review"
        />
      )}

      <StudyStreakCard streakDays={streakDays} activeDayFlags={activeDayFlags} />
    </>
  )
}
