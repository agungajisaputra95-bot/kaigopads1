'use server'

import { createClient } from '@/lib/supabase/server'
import { calculateSM2, DEFAULT_SM2_STATE } from '@/lib/sm2'

export async function submitAnswer(questionId: string, userAnswer: number, isCorrect: boolean) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data: prevRows } = await supabase
    .from('user_progress')
    .select('interval_days, ease_factor')
    .eq('user_id', user.id)
    .eq('question_id', questionId)
    .order('answered_at', { ascending: false })
    .limit(1)

  const prev = prevRows?.[0]
  const quality = isCorrect ? 4 : 1
  const result = calculateSM2(
    {
      intervalDays: prev?.interval_days ?? DEFAULT_SM2_STATE.intervalDays,
      easeFactor: prev?.ease_factor ?? DEFAULT_SM2_STATE.easeFactor,
    },
    quality
  )

  await supabase.from('user_progress').insert({
    user_id: user.id,
    question_id: questionId,
    is_correct: isCorrect,
    user_answer: userAnswer,
    quality_response: quality,
    interval_days: result.intervalDays,
    ease_factor: result.easeFactor,
    next_review_date: result.nextReviewDate,
    is_weak_flagged: result.isWeakFlagged,
  })
}

// Tandai soal sebagai weak secara manual (mis. user jawab benar tapi masih ragu),
// terlepas dari flag otomatis SM-2. Menimpa baris user_progress paling baru untuk soal ini.
export async function markQuestionWeak(questionId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data: rows } = await supabase
    .from('user_progress')
    .select('id')
    .eq('user_id', user.id)
    .eq('question_id', questionId)
    .order('answered_at', { ascending: false })
    .limit(1)

  const latest = rows?.[0]
  if (!latest) return

  await supabase
    .from('user_progress')
    .update({ is_weak_flagged: true, next_review_date: new Date().toISOString().slice(0, 10) })
    .eq('id', latest.id)
}
