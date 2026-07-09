import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FuriganaText, type FuriganaMapEntry } from '@/components/ui/FuriganaText'

interface RecommendedPathCardProps {
  kamokuNameJp: string
  furiganaMap: FuriganaMapEntry[]
  isWeak: boolean
  modeLabel: string
  href: string
}

export function RecommendedPathCard({
  kamokuNameJp,
  furiganaMap,
  isWeak,
  modeLabel,
  href,
}: RecommendedPathCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[18px] bg-[#1565C0] p-[18px] shadow-[0_6px_18px_rgba(21,101,192,0.28)]">
      <div className="absolute -right-[30px] -top-10 h-[140px] w-[140px] rounded-full bg-white/[0.07]" />
      <div className="relative">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FB8C00]" />
          Rekomendasi untukmu
        </div>
        <div className="mt-2.5 text-[13px] text-white/80">Lanjutkan ke kamoku prioritas</div>
        <div className="jp mt-0.5 text-[22px] font-bold leading-tight text-white">
          <FuriganaText text={kamokuNameJp} furiganaMap={furiganaMap} />
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {isWeak && (
            <span className="rounded-full bg-[#E53935]/90 px-2.5 py-1 text-[11px] font-semibold text-white">
              Kamoku lemah
            </span>
          )}
          <span className="rounded-full bg-white/[0.16] px-2.5 py-1 text-[11px] font-semibold text-white">
            Mode: {modeLabel}
          </span>
        </div>
        <Link
          href={href}
          className="mt-4 flex h-[50px] w-full items-center justify-center gap-2 rounded-[13px] bg-white text-base font-bold text-[#1565C0] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
        >
          Lanjut Belajar
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
