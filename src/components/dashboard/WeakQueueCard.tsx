import Link from 'next/link'

interface WeakQueueCardProps {
  questionCount: number
  vocabCount: number
  vocabWords: string[]
  href: string
}

export function WeakQueueCard({ questionCount, vocabCount, vocabWords, href }: WeakQueueCardProps) {
  return (
    <div className="mt-1 rounded-[18px] border-l-4 border-[#FB8C00] bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-bold text-[#E65100]">Perlu direview hari ini</span>
      </div>
      <div className="mt-2 flex items-baseline gap-3.5">
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-2xl font-bold text-[#E53935]">{questionCount}</span>
          <span className="text-xs text-[#78909C]">soal</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-2xl font-bold text-[#FB8C00]">{vocabCount}</span>
          <span className="text-xs text-[#78909C]">kosakata</span>
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {vocabWords.map((word) => (
          <span key={word} className="jp rounded-lg bg-[#ECEFF1] px-2.5 py-1 text-[11px] font-medium text-[#546E7A]">
            {word}
          </span>
        ))}
      </div>
      <Link
        href={href}
        className="mt-3.5 flex h-11 w-full items-center justify-center rounded-xl bg-[#FB8C00] text-sm font-bold text-white"
      >
        Latihan sekarang
      </Link>
    </div>
  )
}
