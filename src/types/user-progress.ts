export interface UserProgress {
  id: string
  user_id: string
  question_id: string
  is_correct: boolean | null
  user_answer: number | null
  quality_response: number | null
  interval_days: number
  ease_factor: number
  next_review_date: string | null
  is_weak_flagged: boolean
  answered_at: string
}

export interface UserPremium {
  user_id: string
  is_premium: boolean
  premium_until: string | null
  payment_confirmed_at: string | null
}

export interface PartBreakdownEntry {
  part: 'A' | 'B' | 'C'
  correct: number
  total: number
}

export interface ExamAttempt {
  id: string
  user_id: string
  source: string
  total_questions: number
  correct_count: number
  part_breakdown: PartBreakdownEntry[] | null
  taken_at: string
}
