export interface AchievementStats {
  totalAnswered: number
  accuracyPct: number | null
  kamokuMasteredCount: number
  examAttemptsCount: number
}

export interface BadgeDef {
  id: string
  emoji: string
  title: string
  description: string
  isUnlocked: (stats: AchievementStats) => boolean
}

export const BADGES: BadgeDef[] = [
  {
    id: 'first-answer',
    emoji: '🌱',
    title: 'Langkah Pertama',
    description: 'Jawab soal pertamamu',
    isUnlocked: (s) => s.totalAnswered >= 1,
  },
  {
    id: 'answered-50',
    emoji: '📘',
    title: '50 Soal',
    description: 'Jawab 50 soal',
    isUnlocked: (s) => s.totalAnswered >= 50,
  },
  {
    id: 'answered-100',
    emoji: '📗',
    title: '100 Soal',
    description: 'Jawab 100 soal',
    isUnlocked: (s) => s.totalAnswered >= 100,
  },
  {
    id: 'answered-500',
    emoji: '📚',
    title: '500 Soal',
    description: 'Jawab 500 soal',
    isUnlocked: (s) => s.totalAnswered >= 500,
  },
  {
    id: 'sharpshooter',
    emoji: '🎯',
    title: 'Penembak Jitu',
    description: 'Akurasi ≥90% (min. 50 soal)',
    isUnlocked: (s) => s.totalAnswered >= 50 && (s.accuracyPct ?? 0) >= 90,
  },
  {
    id: 'first-mastery',
    emoji: '⭐',
    title: 'Kamoku Pertama Dikuasai',
    description: 'Akurasi ≥75% di 1 kamoku (min. 10 soal)',
    isUnlocked: (s) => s.kamokuMasteredCount >= 1,
  },
  {
    id: 'halfway-mastery',
    emoji: '🌟',
    title: 'Separuh Jalan',
    description: '7 dari 13 kamoku dikuasai',
    isUnlocked: (s) => s.kamokuMasteredCount >= 7,
  },
  {
    id: 'full-mastery',
    emoji: '👑',
    title: 'Semua Kamoku Dikuasai',
    description: '13 dari 13 kamoku dikuasai',
    isUnlocked: (s) => s.kamokuMasteredCount >= 13,
  },
  {
    id: 'first-mock-exam',
    emoji: '📝',
    title: 'Mock Exam Pertama',
    description: 'Selesaikan 1 mock exam',
    isUnlocked: (s) => s.examAttemptsCount >= 1,
  },
  {
    id: 'mock-exam-veteran',
    emoji: '🏅',
    title: 'Mock Exam Veteran',
    description: 'Selesaikan 5 mock exam',
    isUnlocked: (s) => s.examAttemptsCount >= 5,
  },
]

export interface LevelTier {
  level: number
  title: string
  minAnswered: number
}

export const LEVEL_TIERS: LevelTier[] = [
  { level: 1, title: 'Pemula', minAnswered: 0 },
  { level: 2, title: 'Pembelajar', minAnswered: 50 },
  { level: 3, title: 'Rajin', minAnswered: 150 },
  { level: 4, title: 'Tekun', minAnswered: 300 },
  { level: 5, title: 'Ahli', minAnswered: 600 },
  { level: 6, title: 'Master', minAnswered: 1000 },
]

export interface LevelInfo {
  level: number
  title: string
  nextTier: LevelTier | null
  answeredIntoTier: number
  tierSpan: number | null
}

export function getLevelInfo(totalAnswered: number): LevelInfo {
  let current = LEVEL_TIERS[0]
  for (const tier of LEVEL_TIERS) {
    if (totalAnswered >= tier.minAnswered) current = tier
  }
  const currentIndex = LEVEL_TIERS.indexOf(current)
  const nextTier = LEVEL_TIERS[currentIndex + 1] ?? null

  return {
    level: current.level,
    title: current.title,
    nextTier,
    answeredIntoTier: totalAnswered - current.minAnswered,
    tierSpan: nextTier ? nextTier.minAnswered - current.minAnswered : null,
  }
}
