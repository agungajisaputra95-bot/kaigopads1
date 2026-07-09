import { FuriganaText, type FuriganaMapEntry } from '@/components/ui/FuriganaText'

export type AnswerOptionState = 'idle' | 'selected' | 'correct' | 'wrong' | 'dim'

interface AnswerOptionProps {
  optionNumber: number
  text: string
  furiganaMap?: FuriganaMapEntry[] | null
  state: AnswerOptionState
  tag?: string
  disabled?: boolean
  onClick?: () => void
}

const STYLE_BY_STATE: Record<
  AnswerOptionState,
  { border: string; background: string; badgeBg: string; badgeColor: string; labelColor: string; opacity?: number }
> = {
  idle: { border: '#ECEFF1', background: '#fff', badgeBg: '#ECEFF1', badgeColor: '#546E7A', labelColor: '#37474F' },
  selected: { border: '#1565C0', background: 'rgba(21,101,192,0.05)', badgeBg: '#1565C0', badgeColor: '#fff', labelColor: '#37474F' },
  correct: { border: '#43A047', background: 'rgba(67,160,71,0.08)', badgeBg: '#43A047', badgeColor: '#fff', labelColor: '#37474F' },
  wrong: { border: '#E53935', background: 'rgba(229,57,53,0.06)', badgeBg: '#E53935', badgeColor: '#fff', labelColor: '#37474F' },
  dim: { border: '#ECEFF1', background: '#fff', badgeBg: '#ECEFF1', badgeColor: '#546E7A', labelColor: '#78909C', opacity: 0.5 },
}

const TAG_COLOR: Partial<Record<AnswerOptionState, string>> = {
  correct: '#2E7D32',
  wrong: '#C62828',
}

const BADGE_CONTENT: Partial<Record<AnswerOptionState, string>> = {
  correct: '✓',
  wrong: '✕',
}

export function AnswerOption({
  optionNumber,
  text,
  furiganaMap,
  state,
  tag,
  disabled,
  onClick,
}: AnswerOptionProps) {
  const s = STYLE_BY_STATE[state]

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left"
      style={{
        background: s.background,
        border: `1.5px solid ${s.border}`,
        boxShadow: '0 1px 2px rgba(55,71,79,0.06)',
        opacity: s.opacity,
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      <span
        className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-bold"
        style={{ background: s.badgeBg, color: s.badgeColor }}
      >
        {BADGE_CONTENT[state] ?? optionNumber}
      </span>
      <span className="jp flex-1 text-sm font-medium leading-snug" style={{ color: s.labelColor }}>
        <FuriganaText text={text} furiganaMap={furiganaMap} />
      </span>
      {tag && (
        <span className="whitespace-nowrap text-[11px] font-bold" style={{ color: TAG_COLOR[state] }}>
          {tag}
        </span>
      )}
    </button>
  )
}
