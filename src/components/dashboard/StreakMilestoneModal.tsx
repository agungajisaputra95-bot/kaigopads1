'use client'

import type { StreakMilestone } from '@/lib/streakMilestones'

const CONFETTI_COLORS = ['#FB8C00', '#E53935', '#1565C0', '#43A047', '#5E35B1']

export function StreakMilestoneModal({
  milestone,
  onClose,
}: {
  milestone: StreakMilestone
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6" onClick={onClose}>
      <div
        className="relative flex w-full max-w-xs flex-col items-center gap-3 overflow-hidden rounded-3xl bg-white p-6 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center gap-2 pt-2">
          {CONFETTI_COLORS.map((color, i) => (
            <span
              key={i}
              className="animate-confetti h-2 w-2 rounded-full"
              style={{ background: color, animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>

        <div className="animate-badge-pop text-5xl">{milestone.emoji}</div>
        <div className="text-lg font-extrabold text-[#263238]">{milestone.days} Hari Beruntun!</div>
        <div className="text-sm text-[#78909C]">{milestone.label} — terus pertahankan konsistensinya 💪</div>

        <button
          type="button"
          onClick={onClose}
          className="mt-1 h-11 w-full rounded-xl bg-[#1565C0] text-sm font-bold text-white"
        >
          Lanjut Belajar
        </button>
      </div>
    </div>
  )
}
