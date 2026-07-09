import { createClient } from '@/lib/supabase/server'

export interface ScoreHistoryPoint {
  date: string
  score: number
}

export async function getExamScoreHistory(userId: string, maxScore = 125): Promise<ScoreHistoryPoint[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('exam_attempts')
    .select('taken_at, correct_count, total_questions')
    .eq('user_id', userId)
    .order('taken_at', { ascending: true })
    .limit(10)

  if (!data) return []

  return data.map((row) => ({
    date: new Date(row.taken_at as string).toLocaleDateString('id-ID', { day: 'numeric', month: 'numeric' }),
    score: Math.round((row.correct_count / row.total_questions) * maxScore),
  }))
}

export interface WeekBarStat {
  day: string
  count: number
}

export interface StudyTimeAnalytics {
  totalQuestionsAnswered: number
  avgPerDay: number
  weekBars: WeekBarStat[]
  bestHourInsight: string | null
}

const DAY_LABELS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

export async function getStudyTimeAnalytics(userId: string): Promise<StudyTimeAnalytics> {
  const supabase = await createClient()
  const { data } = await supabase.from('user_progress').select('answered_at, is_correct').eq('user_id', userId)

  if (!data || data.length === 0) {
    return { totalQuestionsAnswered: 0, avgPerDay: 0, weekBars: [], bestHourInsight: null }
  }

  const now = new Date()
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now)
    d.setDate(d.getDate() - (6 - i))
    return d
  })

  const countsByDate = new Map<string, number>()
  const hourStats = new Map<number, { correct: number; total: number }>()

  for (const row of data) {
    const d = new Date(row.answered_at as string)
    const dateKey = d.toISOString().slice(0, 10)
    countsByDate.set(dateKey, (countsByDate.get(dateKey) ?? 0) + 1)

    const hour = d.getHours()
    const stat = hourStats.get(hour) ?? { correct: 0, total: 0 }
    stat.total += 1
    if (row.is_correct) stat.correct += 1
    hourStats.set(hour, stat)
  }

  const weekBars = last7Days.map((d) => ({
    day: DAY_LABELS[d.getDay()],
    count: countsByDate.get(d.toISOString().slice(0, 10)) ?? 0,
  }))

  const activeDays = countsByDate.size
  const avgPerDay = activeDays > 0 ? Math.round(data.length / activeDays) : 0

  // Butuh minimal beberapa jawaban di jam yang sama supaya insight cukup representatif.
  const MIN_SAMPLES_FOR_INSIGHT = 3
  let bestHour: number | null = null
  let bestAccuracy = -1
  for (const [hour, stat] of hourStats) {
    if (stat.total < MIN_SAMPLES_FOR_INSIGHT) continue
    const accuracy = stat.correct / stat.total
    if (accuracy > bestAccuracy) {
      bestAccuracy = accuracy
      bestHour = hour
    }
  }

  const bestHourInsight =
    bestHour !== null
      ? `Kamu paling akurat belajar jam ${String(bestHour).padStart(2, '0')}:00–${String(
          (bestHour + 1) % 24
        ).padStart(2, '0')}:00 — akurasi jawaban ${Math.round(bestAccuracy * 100)}%. Jadwalkan sesi sulit di jam ini.`
      : null

  return { totalQuestionsAnswered: data.length, avgPerDay, weekBars, bestHourInsight }
}
