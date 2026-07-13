import { createAdminClient } from '@/lib/supabase/admin'
import { KAMOKU_LIST } from '@/lib/constants'

export interface UserKamokuStat {
  kamokuId: number
  nameJp: string
  nameId: string
  correct: number
  total: number
  pct: number
}

export interface UserExamAttempt {
  id: string
  source: string
  totalQuestions: number
  correctCount: number
  takenAt: string
}

export interface UserFeedbackItem {
  id: string
  message: string
  createdAt: string
}

export interface UserDetail {
  id: string
  email: string
  name: string | null
  whatsapp: string | null
  createdAt: string
  isPremium: boolean
  premiumUntil: string | null
  paymentConfirmedAt: string | null
  kamokuStats: UserKamokuStat[]
  examAttempts: UserExamAttempt[]
  vocabTapped: number
  vocabWeakCount: number
  feedback: UserFeedbackItem[]
}

export async function getUserDetail(userId: string): Promise<UserDetail | null> {
  const supabase = createAdminClient()

  const [userRes, premiumRes, progressRes, examRes, vocabRes, feedbackRes] = await Promise.all([
    supabase.auth.admin.getUserById(userId),
    supabase.from('user_premium').select('*').eq('user_id', userId).maybeSingle(),
    supabase.from('user_progress').select('is_correct, questions!inner(kamoku_id)').eq('user_id', userId),
    supabase.from('exam_attempts').select('*').eq('user_id', userId).order('taken_at', { ascending: false }),
    supabase.from('vocabulary_progress').select('is_weak_flagged').eq('user_id', userId),
    supabase
      .from('feedback')
      .select('id, message, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }),
  ])

  const user = userRes.data?.user
  if (!user) return null

  const kamokuAgg = new Map<number, { correct: number; total: number }>()
  for (const row of (progressRes.data ?? []) as unknown as {
    is_correct: boolean
    questions: { kamoku_id: number }
  }[]) {
    const entry = kamokuAgg.get(row.questions.kamoku_id) ?? { correct: 0, total: 0 }
    entry.total += 1
    if (row.is_correct) entry.correct += 1
    kamokuAgg.set(row.questions.kamoku_id, entry)
  }

  const kamokuStats: UserKamokuStat[] = KAMOKU_LIST.map((k) => {
    const stat = kamokuAgg.get(k.id) ?? { correct: 0, total: 0 }
    return {
      kamokuId: k.id,
      nameJp: k.nameJp,
      nameId: k.nameId,
      correct: stat.correct,
      total: stat.total,
      pct: stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0,
    }
  })

  const premium = premiumRes.data
  const vocabRows = vocabRes.data ?? []

  return {
    id: user.id,
    email: user.email ?? '(tanpa email)',
    name: (user.user_metadata?.full_name as string | undefined) ?? null,
    whatsapp: (user.user_metadata?.whatsapp as string | undefined) ?? null,
    createdAt: user.created_at,
    isPremium: premium?.is_premium ?? false,
    premiumUntil: premium?.premium_until ?? null,
    paymentConfirmedAt: premium?.payment_confirmed_at ?? null,
    kamokuStats,
    examAttempts: (examRes.data ?? []).map((r) => ({
      id: r.id,
      source: r.source,
      totalQuestions: r.total_questions,
      correctCount: r.correct_count,
      takenAt: r.taken_at,
    })),
    vocabTapped: vocabRows.length,
    vocabWeakCount: vocabRows.filter((v) => v.is_weak_flagged).length,
    feedback: (feedbackRes.data ?? []).map((f) => ({ id: f.id, message: f.message, createdAt: f.created_at })),
  }
}
