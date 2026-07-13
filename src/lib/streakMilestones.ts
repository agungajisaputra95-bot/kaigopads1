export interface StreakMilestone {
  days: number
  emoji: string
  label: string
}

export const STREAK_MILESTONES: StreakMilestone[] = [
  { days: 3, emoji: '🔥', label: 'Awal yang Bagus' },
  { days: 7, emoji: '⚡', label: 'Seminggu Penuh' },
  { days: 14, emoji: '💎', label: 'Dua Minggu Solid' },
  { days: 30, emoji: '🏆', label: 'Sebulan Konsisten' },
  { days: 60, emoji: '👑', label: 'Dua Bulan Beruntun' },
  { days: 100, emoji: '🌟', label: 'Seratus Hari!' },
]

export function getCurrentMilestone(days: number): StreakMilestone | null {
  let current: StreakMilestone | null = null
  for (const m of STREAK_MILESTONES) {
    if (days >= m.days) current = m
  }
  return current
}

export function getNextMilestone(days: number): StreakMilestone | null {
  return STREAK_MILESTONES.find((m) => m.days > days) ?? null
}

export function isMilestoneDay(days: number): boolean {
  return STREAK_MILESTONES.some((m) => m.days === days)
}
