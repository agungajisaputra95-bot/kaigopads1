import { TappableFuriganaText } from '@/components/ui/TappableFuriganaText'
import type { FuriganaMapEntry, QuestionDifficulty } from '@/types/question'
import type { Vocabulary } from '@/types/material'

const DIFFICULTY_STYLE: Record<QuestionDifficulty, { label: string; color: string; bg: string }> = {
  easy: { label: 'Easy', color: '#2E7D32', bg: 'rgba(67,160,71,0.13)' },
  medium: { label: 'Medium', color: '#E65100', bg: 'rgba(251,140,0,0.13)' },
  hard: { label: 'Hard', color: '#C62828', bg: 'rgba(229,57,53,0.13)' },
}

interface QuestionCardProps {
  questionNumber: number
  difficulty: QuestionDifficulty
  text: string
  furiganaMap: FuriganaMapEntry[]
  vocabDict: Record<string, Vocabulary>
  onWordTap: (vocab: Vocabulary) => void
}

export function QuestionCard({
  questionNumber,
  difficulty,
  text,
  furiganaMap,
  vocabDict,
  onWordTap,
}: QuestionCardProps) {
  const diff = DIFFICULTY_STYLE[difficulty]

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[13px] font-bold text-[#90A4AE]">Q{questionNumber}</span>
        <span
          className="rounded-md px-2 py-0.5 text-[10px] font-bold"
          style={{ color: diff.color, background: diff.bg }}
        >
          {diff.label}
        </span>
      </div>
      <div className="mt-2.5 rounded-xl border border-[#ECEFF1] bg-white p-4">
        <TappableFuriganaText
          text={text}
          furiganaMap={furiganaMap}
          vocabDict={vocabDict}
          onWordTap={onWordTap}
          className="jp block text-[16px] font-medium leading-[1.9] tracking-wide text-[#263238]"
        />
      </div>
    </div>
  )
}
