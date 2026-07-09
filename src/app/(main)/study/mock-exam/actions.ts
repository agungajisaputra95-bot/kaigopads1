'use server'

import { createClient } from '@/lib/supabase/server'
import { calculateSM2, DEFAULT_SM2_STATE } from '@/lib/sm2'
import type { PartBreakdownEntry } from '@/types/user-progress'

export interface ExamAnswerRecord {
  questionId: string
  userAnswer: number
  isCorrect: boolean
}

export async function submitExamAttempt(
  source: string,
  answers: ExamAnswerRecord[],
  partBreakdown: PartBreakdownEntry[]
) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const correctCount = answers.filter((a) => a.isCorrect).length

  await supabase.from('exam_attempts').insert({
    user_id: user.id,
    source,
    total_questions: answers.length,
    correct_count: correctCount,
    part_breakdown: partBreakdown,
  })

  // Catat tiap jawaban ke user_progress juga, supaya mastery/weak-flag ikut terupdate dari mock exam.
  const rows = answers.map((a) => {
    const quality = a.isCorrect ? 4 : 1
    const result = calculateSM2(DEFAULT_SM2_STATE, quality)
    return {
      user_id: user.id,
      question_id: a.questionId,
      is_correct: a.isCorrect,
      user_answer: a.userAnswer,
      quality_response: quality,
      interval_days: result.intervalDays,
      ease_factor: result.easeFactor,
      next_review_date: result.nextReviewDate,
      is_weak_flagged: result.isWeakFlagged,
    }
  })

  await supabase.from('user_progress').insert(rows)
}
