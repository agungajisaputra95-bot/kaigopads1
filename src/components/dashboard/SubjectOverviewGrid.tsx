import Link from 'next/link'
import type { KamokuPart } from '@/lib/constants'
import { FuriganaText, type FuriganaMapEntry } from '@/components/ui/FuriganaText'

const RADIUS = 16
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export interface KamokuSummary {
  id: number
  num: number
  nameJp: string
  furiganaMap: FuriganaMapEntry[]
  pct: number
  color: string
  frac: string
}

export interface PartSummary {
  part: KamokuPart
  label: string
  sub: string
  pctLabel: string
  pctColor: string
  frac: string
  headerBg: string
  badgeBg: string
  kamoku: KamokuSummary[]
}

function KamokuRing({ pct, color }: { pct: number; color: string }) {
  const offset = (CIRCUMFERENCE * (1 - pct / 100)).toFixed(2)
  return (
    <div className="relative h-10 w-10 shrink-0">
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r={RADIUS} fill="none" stroke="#ECEFF1" strokeWidth="4" />
        <circle
          cx="20"
          cy="20"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE.toFixed(2)}
          strokeDashoffset={offset}
          transform="rotate(-90 20 20)"
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold"
        style={{ color }}
      >
        {pct}
      </div>
    </div>
  )
}

export function SubjectOverviewGrid({ parts }: { parts: PartSummary[] }) {
  return (
    <div className="mt-1">
      <div className="mb-1 flex items-center justify-between px-0.5">
        <span className="text-[15px] font-bold text-[#263238]">13 Kamoku</span>
        <span className="text-xs text-[#90A4AE]">Tap untuk latihan</span>
      </div>

      {parts.map((part) => (
        <div key={part.part} className="mt-3">
          <div
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
            style={{ background: part.headerBg }}
          >
            <span
              className="flex h-[26px] w-[26px] items-center justify-center rounded-lg text-[13px] font-extrabold text-white"
              style={{ background: part.badgeBg }}
            >
              {part.part}
            </span>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-[#37474F]">{part.label}</div>
              <div className="text-[11px] text-[#90A4AE]">{part.sub}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[15px] font-bold" style={{ color: part.pctColor }}>
                {part.pctLabel}
              </div>
              <div className="font-mono text-[10px] text-[#B0BEC5]">{part.frac}</div>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            {part.kamoku.map((k) => (
              <Link
                key={k.id}
                href={`/study/${k.id}/practice`}
                className="flex items-center gap-2.5 rounded-[13px] bg-white p-2.5 shadow-[0_1px_2px_rgba(55,71,79,0.07)]"
              >
                <KamokuRing pct={k.pct} color={k.color} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-[#B0BEC5]">{k.num}</span>
                    <span className="jp line-clamp-2 text-xs font-medium leading-snug text-[#37474F]">
                      <FuriganaText text={k.nameJp} furiganaMap={k.furiganaMap} />
                    </span>
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-[#90A4AE]">{k.frac}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
