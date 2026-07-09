export type PracticeMode = 'soal' | 'materi'

interface ModeToggleProps {
  mode: PracticeMode
  onChange: (mode: PracticeMode) => void
}

const OPTIONS: { value: PracticeMode; label: string }[] = [
  { value: 'soal', label: 'Soal Dulu' },
  { value: 'materi', label: 'Materi Dulu' },
]

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="mt-3 flex gap-1 rounded-xl bg-[#ECEFF1] p-1">
      {OPTIONS.map((opt) => {
        const active = mode === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="h-9 flex-1 rounded-[9px] text-[13px] font-bold"
            style={{
              background: active ? '#1565C0' : 'transparent',
              color: active ? '#fff' : '#78909C',
              boxShadow: active ? '0 2px 6px rgba(21,101,192,0.3)' : 'none',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
