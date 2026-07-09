import { Bookmark } from 'lucide-react'
import { FuriganaText, type FuriganaMapEntry } from '@/components/ui/FuriganaText'

export interface ExplanationEntry {
  kind: 'correct' | 'wrong'
  title: string
  textJp: string
  furiganaMap: FuriganaMapEntry[]
  textId: string
}

interface ExplanationCardProps {
  entries: ExplanationEntry[]
  kamokuNameJp: string
  kamokuFuriganaMap: FuriganaMapEntry[]
  partLabel: string
  onBookmark?: () => void
  bookmarked?: boolean
}

export function ExplanationCard({
  entries,
  kamokuNameJp,
  kamokuFuriganaMap,
  partLabel,
  onBookmark,
  bookmarked,
}: ExplanationCardProps) {
  return (
    <div className="relative mt-4 rounded-xl border border-[#37474F]/[0.06] bg-white p-[15px_14px] shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      <button
        type="button"
        onClick={onBookmark}
        disabled={bookmarked}
        title={bookmarked ? 'Sudah ditandai sebagai weak' : 'Tandai sebagai weak'}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg"
        style={{ background: bookmarked ? '#FB8C00' : 'rgba(251,140,0,0.12)' }}
      >
        <Bookmark size={16} color={bookmarked ? '#fff' : '#FB8C00'} fill={bookmarked ? '#fff' : 'none'} />
      </button>
      <div className="flex items-center gap-1.5 text-sm font-bold text-[#263238]">📝 Penjelasan</div>

      {entries.map((entry, index) => (
        <div key={index} className="mt-3 flex gap-2">
          <span
            className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ background: entry.kind === 'correct' ? '#43A047' : '#E53935' }}
          >
            {entry.kind === 'correct' ? '✓' : '✕'}
          </span>
          <div>
            <div
              className="text-xs font-bold"
              style={{ color: entry.kind === 'correct' ? '#2E7D32' : '#C62828' }}
            >
              {entry.title}
            </div>
            <div className="jp mt-0.5 text-[13px] leading-relaxed text-[#455A64]">
              <FuriganaText text={entry.textJp} furiganaMap={entry.furiganaMap} />
            </div>
            <div className="mt-0.5 text-[13px] leading-snug text-[#607D8B]">{entry.textId}</div>
          </div>
        </div>
      ))}

      <div className="mt-3 flex items-center gap-1.5 border-t border-dashed border-[#37474F]/[0.14] pt-3">
        <span className="text-[11px] text-[#90A4AE]">📚 Kamoku</span>
        <span className="jp text-[11px] font-semibold text-[#546E7A]">
          <FuriganaText text={kamokuNameJp} furiganaMap={kamokuFuriganaMap} />
        </span>
        <span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-[#1565C0]" style={{ background: 'rgba(21,101,192,0.1)' }}>
          {partLabel}
        </span>
      </div>
    </div>
  )
}
