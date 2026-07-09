import { createClient } from '@/lib/supabase/server'
import type { ExamAttempt } from '@/types/user-progress'

export interface KamokuStat {
  correct: number
  total: number
}

export async function getKamokuMasteryStats(userId: string): Promise<Record<number, KamokuStat>> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('user_progress')
    .select('is_correct, questions!inner(kamoku_id)')
    .eq('user_id', userId)

  const stats: Record<number, KamokuStat> = {}
  if (error || !data) return stats

  for (const row of data as unknown as { is_correct: boolean; questions: { kamoku_id: number } }[]) {
    const kamokuId = row.questions.kamoku_id
    stats[kamokuId] ??= { correct: 0, total: 0 }
    stats[kamokuId].total += 1
    if (row.is_correct) stats[kamokuId].correct += 1
  }

  return stats
}

export async function getWeakQueueCount(userId: string): Promise<number> {
  const supabase = await createClient()
  const today = new Date().toISOString().slice(0, 10)
  const { count } = await supabase
    .from('user_progress')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_weak_flagged', true)
    .lte('next_review_date', today)

  return count ?? 0
}

export async function getStudyStreakDays(userId: string): Promise<number> {
  const supabase = await createClient()
  const { data } = await supabase.from('user_progress').select('answered_at').eq('user_id', userId)

  if (!data || data.length === 0) return 0

  const activeDates = new Set(data.map((row) => row.answered_at.slice(0, 10)))
  const toDateStr = (d: Date) => d.toISOString().slice(0, 10)

  const cursor = new Date()
  // Kalau belum ada aktivitas hari ini, mulai hitung dari kemarin (grace period)
  // supaya streak tidak langsung putus sebelum hari ini berakhir.
  if (!activeDates.has(toDateStr(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
  }

  let streak = 0
  while (activeDates.has(toDateStr(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  return streak
}

export async function getLatestExamAttempt(userId: string): Promise<ExamAttempt | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('exam_attempts')
    .select('*')
    .eq('user_id', userId)
    .order('taken_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  return data as ExamAttempt | null
}
