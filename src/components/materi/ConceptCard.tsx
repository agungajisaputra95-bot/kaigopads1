import { FuriganaText } from '@/components/ui/FuriganaText'
import { TappableFuriganaText } from '@/components/ui/TappableFuriganaText'
import type { FuriganaMapEntry } from '@/types/question'
import type { Vocabulary } from '@/types/material'

interface ConceptCardProps {
  titleJp: string
  titleFuriganaMap: FuriganaMapEntry[]
  bodyJp: string
  bodyFuriganaMap: FuriganaMapEntry[]
  bodyId: string
  exampleJp: string
  exampleFuriganaMap: FuriganaMapEntry[]
  exampleId: string
  examJp?: string
  examFuriganaMap?: FuriganaMapEntry[]
  examId?: string
  vocabDict: Record<string, Vocabulary>
  onWordTap: (vocab: Vocabulary) => void
}

export function ConceptCard({
  titleJp,
  titleFuriganaMap,
  bodyJp,
  bodyFuriganaMap,
  bodyId,
  exampleJp,
  exampleFuriganaMap,
  exampleId,
  examJp,
  examFuriganaMap,
  examId,
  vocabDict,
  onWordTap,
}: ConceptCardProps) {
  return (
    <div className="rounded-2xl border border-[#37474F]/[0.05] bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      <div className="flex items-center gap-2">
        <span className="h-5 w-[5px] rounded-[3px] bg-[#1565C0]" />
        <span className="jp text-[17px] font-bold text-[#263238]">
          <FuriganaText text={titleJp} furiganaMap={titleFuriganaMap} />
        </span>
      </div>

      <TappableFuriganaText
        text={bodyJp}
        furiganaMap={bodyFuriganaMap}
        vocabDict={vocabDict}
        onWordTap={onWordTap}
        className="jp mt-3 block text-[15px] font-normal leading-[1.9] text-[#37474F]"
      />
      <div className="mt-2 text-[13.5px] leading-relaxed text-[#78909C]">{bodyId}</div>

      <div className="mt-3.5 rounded-[10px] bg-[#1565C0]/5 p-3">
        <div className="text-[11px] font-bold tracking-wide text-[#1565C0]">💡 CONTOH LAPANGAN</div>
        <div className="jp mt-1.5 text-sm leading-relaxed text-[#37474F]">
          <FuriganaText text={exampleJp} furiganaMap={exampleFuriganaMap} />
        </div>
        <div className="mt-0.5 text-[13px] leading-snug text-[#78909C]">{exampleId}</div>
      </div>

      {examJp && (
        <div className="mt-2.5 rounded-r-[10px] border-l-4 border-[#FB8C00] bg-[#FB8C00]/[0.09] p-3">
          <div className="text-[11px] font-bold tracking-wide text-[#E65100]">⚠️ POIN UJIAN</div>
          <div className="jp mt-1.5 text-sm leading-relaxed text-[#37474F]">
            <FuriganaText text={examJp} furiganaMap={examFuriganaMap ?? []} />
          </div>
          <div className="mt-0.5 text-[13px] leading-snug text-[#8D6E43]">{examId}</div>
        </div>
      )}
    </div>
  )
}
