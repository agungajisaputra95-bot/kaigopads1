import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { ExamAttempt } from '@/types/user-progress'

export interface KamokuStat {
  correct: number
  total: number
}

export interface UserProgressRow {
  isCorrect: boolean
  answeredAt: string
  kamokuId: number
}

// Satu query mentah untuk semua jawaban user, dipakai bareng oleh dashboard & analytics
// supaya tidak scan tabel user_progress berkali-kali di halaman yang sama. Dibungkus React
// cache() supaya pemanggilan berulang (mis. lewat getKamokuMasteryStats + getStudyStreakDays
// di request yang sama) tetap cuma 1 query network ke Supabase.
export const getUserProgressRows = cache(async (userId: string): Promise<UserProgressRow[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('user_progress')
    .select('is_correct, answered_at, questions!inner(kamoku_id)')
    .eq('user_id', userId)

  if (error || !data) return []

  return (data as unknown as { is_correct: boolean; answered_at: string; questions: { kamoku_id: number } }[]).map(
    (row) => ({ isCorrect: row.is_correct, answeredAt: row.answered_at, kamokuId: row.questions.kamoku_id })
  )
})

export function computeKamokuStats(rows: UserProgressRow[]): Record<number, KamokuStat> {
  const stats: Record<number, KamokuStat> = {}
  for (const row of rows) {
    stats[row.kamokuId] ??= { correct: 0, total: 0 }
    stats[row.kamokuId].total += 1
    if (row.isCorrect) stats[row.kamokuId].correct += 1
  }
  return stats
}

export function computeStreakDays(rows: UserProgressRow[]): number {
  if (rows.length === 0) return 0

  const activeDates = new Set(rows.map((row) => row.answeredAt.slice(0, 10)))
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

export async function getKamokuMasteryStats(userId: string): Promise<Record<number, KamokuStat>> {
  return computeKamokuStats(await getUserProgressRows(userId))
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
  return computeStreakDays(await getUserProgressRows(userId))
}

export async function getExamAttemptsCount(userId: string): Promise<number> {
  const supabase = await createClient()
  const { count } = await supabase
    .from('exam_attempts')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)

  return count ?? 0
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
