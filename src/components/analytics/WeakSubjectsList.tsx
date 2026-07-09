import Link from 'next/link'
import { FuriganaText } from '@/components/ui/FuriganaText'
import type { FuriganaMapEntry } from '@/types/question'

export interface WeakSubjectItem {
  kamokuId: number
  nameJp: string
  furiganaMap: FuriganaMapEntry[]
  pct: number
  color: string
}

export function WeakSubjectsList({ items }: { items: WeakSubjectItem[] }) {
  return (
    <div className="rounded-2xl bg-white px-3.5 py-1.5 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      {items.map((item, i) => (
        <div
          key={item.kamokuId}
          className="flex items-center gap-2.5 py-3"
          style={{ borderTop: i === 0 ? 'none' : '1px solid #ECEFF1' }}
        >
          <span className="w-4 font-mono text-[13px] font-bold text-[#B0BEC5]">{i + 1}</span>
          <div className="min-w-0 flex-1">
            <div className="jp truncate text-[13px] font-semibold text-[#37474F]">
              <FuriganaText text={item.nameJp} furiganaMap={item.furiganaMap} />
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#ECEFF1]">
                <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
              </div>
              <span className="font-mono text-xs font-bold" style={{ color: item.color }}>
                {item.pct}%
              </span>
            </div>
          </div>
          <Link
            href={`/study/${item.kamokuId}/practice`}
            className="shrink-0 rounded-lg bg-[#1565C0]/10 px-3.5 py-1.5 text-xs font-bold text-[#1565C0]"
          >
            Latihan
          </Link>
        </div>
      ))}
    </div>
  )
}
