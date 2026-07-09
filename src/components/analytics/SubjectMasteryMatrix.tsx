import { FuriganaText } from '@/components/ui/FuriganaText'
import { masteryHeat } from '@/lib/utils'
import type { FuriganaMapEntry } from '@/types/question'
import type { KamokuPart } from '@/lib/constants'

export interface MatrixTile {
  nameJp: string
  furiganaMap: FuriganaMapEntry[]
  pct: number
  attempted: boolean
}

export interface MatrixPart {
  part: KamokuPart
  label: string
  badgeBg: string
  tiles: MatrixTile[]
}

const LEGEND = [
  { color: '#E53935', label: 'Lemah' },
  { color: '#FB8C00', label: 'Perlu review' },
  { color: '#43A047', label: 'Kuasai' },
]

export function SubjectMasteryMatrix({ parts }: { parts: MatrixPart[] }) {
  return (
    <div className="rounded-2xl bg-white p-3.5 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      {parts.map((part) => (
        <div key={part.part} className="mb-3.5 last:mb-0">
          <div className="mb-1.5 flex items-center gap-1.5">
            <span
              className="flex h-5 w-5 items-center justify-center rounded-[6px] text-[11px] font-extrabold text-white"
              style={{ background: part.badgeBg }}
            >
              {part.part}
            </span>
            <span className="text-xs font-bold text-[#455A64]">{part.label}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {part.tiles.map((tile, i) => {
              const heat = tile.attempted ? masteryHeat(tile.pct) : { bg: '#ECEFF1', fg: '#90A4AE' }
              return (
                <div
                  key={i}
                  className="flex flex-col justify-between overflow-hidden rounded-[9px] p-2 [aspect-ratio:1.35]"
                  style={{ background: heat.bg }}
                >
                  <span className="jp line-clamp-2 text-[9.5px] font-semibold leading-tight" style={{ color: heat.fg }}>
                    <FuriganaText text={tile.nameJp} furiganaMap={tile.furiganaMap} />
                  </span>
                  <span className="font-mono text-sm font-bold" style={{ color: heat.fg }}>
                    {tile.attempted ? `${tile.pct}%` : '–'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-3 border-t border-[#ECEFF1] pt-2">
        {LEGEND.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="h-[11px] w-[11px] rounded-[3px]" style={{ background: l.color }} />
            <span className="text-[10px] text-[#78909C]">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
