import Link from 'next/link'
import { FuriganaText } from '@/components/ui/FuriganaText'
import type { FuriganaMapEntry } from '@/types/question'

export interface RelatedQuestion {
  num: number
  textJp: string
  furiganaMap: FuriganaMapEntry[]
}

interface RelatedQuestionsBlockProps {
  questions: RelatedQuestion[]
  href: string
}

export function RelatedQuestionsBlock({ questions, href }: RelatedQuestionsBlockProps) {
  return (
    <div className="rounded-2xl border-[1.5px] border-[#1565C0] bg-white p-4 shadow-[0_4px_14px_rgba(21,101,192,0.12)]">
      <div className="text-[15px] font-bold text-[#1565C0]">✏️ Coba Soal Terkait Konsep Ini</div>
      <div className="mt-0.5 text-xs text-[#78909C]">
        Uji pemahaman kamu dengan {questions.length} soal singkat
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {questions.map((q) => (
          <Link
            key={q.num}
            href={href}
            className="flex items-center gap-2.5 rounded-[11px] border border-[#ECEFF1] bg-[#F5F7F8] px-3 py-2.5"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-[#1565C0]/10 font-mono text-xs font-bold text-[#1565C0]">
              {q.num}
            </span>
            <span className="jp line-clamp-2 flex-1 text-[13px] leading-snug text-[#37474F]">
              <FuriganaText text={q.textJp} furiganaMap={q.furiganaMap} />
            </span>
            <span className="shrink-0 text-lg text-[#1565C0]">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
