'use server'

import { createClient } from '@/lib/supabase/server'
import { calculateSM2, DEFAULT_SM2_STATE } from '@/lib/sm2'

interface PrevVocabState {
  interval_days: number
  ease_factor: number
  tap_count: number
}

async function upsertVocabProgress(vocabularyId: string, quality: number) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data: existing } = await supabase
    .from('vocabulary_progress')
    .select('interval_days, ease_factor, tap_count')
    .eq('user_id', user.id)
    .eq('vocabulary_id', vocabularyId)
    .maybeSingle<PrevVocabState>()

  const result = calculateSM2(
    {
      intervalDays: existing?.interval_days ?? DEFAULT_SM2_STATE.intervalDays,
      easeFactor: existing?.ease_factor ?? DEFAULT_SM2_STATE.easeFactor,
    },
    quality
  )

  await supabase.from('vocabulary_progress').upsert(
    {
      user_id: user.id,
      vocabulary_id: vocabularyId,
      interval_days: result.intervalDays,
      ease_factor: result.easeFactor,
      next_review_date: result.nextReviewDate,
      is_weak_flagged: result.isWeakFlagged,
      tap_count: (existing?.tap_count ?? 0) + 1,
      last_reviewed_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,vocabulary_id' }
  )
}

// Tap dianggap sinyal "belum hafal" (quality rendah) — konsisten dengan PRD 5.2/5.3:
// kata yang di-tap otomatis masuk daftar kosakata perlu diulang.
export async function recordVocabTap(vocabularyId: string) {
  await upsertVocabProgress(vocabularyId, 2)
}

export async function markVocabUnderstood(vocabularyId: string) {
  await upsertVocabProgress(vocabularyId, 5)
}
