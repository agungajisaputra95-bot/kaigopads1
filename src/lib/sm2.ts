// Implementasi algoritma SM-2 (SuperMemo 2) untuk spaced repetition.
// quality_response: 0-5, mengikuti skala kualitas jawaban SM-2 asli
// (0-2 = gagal/lupa, 3-5 = berhasil dengan tingkat kemudahan berbeda).

export interface SM2State {
  intervalDays: number
  easeFactor: number
}

export interface SM2Result extends SM2State {
  nextReviewDate: string
  isWeakFlagged: boolean
}

const MIN_EASE_FACTOR = 1.3

export function calculateSM2(
  previous: SM2State,
  qualityResponse: number,
  from: Date = new Date()
): SM2Result {
  const quality = Math.min(5, Math.max(0, qualityResponse))
  const isWeakFlagged = quality < 3

  let { intervalDays, easeFactor } = previous

  if (isWeakFlagged) {
    intervalDays = 1
  } else {
    intervalDays =
      intervalDays <= 1 ? 6 : Math.round(intervalDays * easeFactor)
  }

  easeFactor = Math.max(
    MIN_EASE_FACTOR,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  )

  const nextReviewDate = new Date(from)
  nextReviewDate.setDate(nextReviewDate.getDate() + intervalDays)

  return {
    intervalDays,
    easeFactor,
    nextReviewDate: nextReviewDate.toISOString().slice(0, 10),
    isWeakFlagged,
  }
}

export const DEFAULT_SM2_STATE: SM2State = {
  intervalDays: 1,
  easeFactor: 2.5,
}
