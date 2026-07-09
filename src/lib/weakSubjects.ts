import type { WeakSubjectItem } from '@/components/analytics/WeakSubjectsList'
import type { KamokuStat } from '@/lib/queries/dashboard'
import { KAMOKU_LIST } from '@/lib/constants'
import { masteryColor } from '@/lib/utils'

// Kamoku yang sudah pernah dikerjakan, diurutkan dari yang paling lemah (akurasi terendah).
export function buildWeakSubjects(stats: Record<number, KamokuStat>, limit = 5): WeakSubjectItem[] {
  return KAMOKU_LIST.map((k) => {
    const stat = stats[k.id]
    const total = stat?.total ?? 0
    const pct = total > 0 ? Math.round((stat.correct / total) * 100) : null
    return { kamokuId: k.id, nameJp: k.nameJp, furiganaMap: [] as const, pct, total }
  })
    .filter((k): k is typeof k & { pct: number } => k.pct !== null && k.total > 0)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, limit)
    .map((k) => ({
      kamokuId: k.kamokuId,
      nameJp: k.nameJp,
      furiganaMap: [...k.furiganaMap],
      pct: k.pct,
      color: masteryColor(k.pct),
    }))
}
