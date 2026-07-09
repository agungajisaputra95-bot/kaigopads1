import type { KamokuPart } from '@/lib/constants'

export type DifficultyLabel = 'Easy' | 'Medium' | 'Hard'

export interface OptionDraft {
  text: string
  explanation: string
}

const DIFFICULTY_COLOR: Record<DifficultyLabel, string> = {
  Easy: '#43A047',
  Medium: '#FB8C00',
  Hard: '#E53935',
}

const TOOLBAR_BUTTONS = ['B', 'I', 'U', '「」', '⎘', '↺']

interface QuestionEditorFormProps {
  part: KamokuPart
  onPartChange: (part: KamokuPart) => void
  kamokuOptions: { id: number; label: string }[]
  kamokuId: number
  onKamokuChange: (id: number) => void
  source: string
  onSourceChange: (source: string) => void
  difficulty: DifficultyLabel
  onDifficultyChange: (difficulty: DifficultyLabel) => void
  questionText: string
  onQuestionTextChange: (text: string) => void
  options: OptionDraft[]
  correctOption: number
  onSetCorrect: (num: number) => void
  onOptionTextChange: (index: number, text: string) => void
  onOptionExplanationChange: (index: number, text: string) => void
}

const PART_LABELS: Record<KamokuPart, string> = {
  A: 'A Part — Dasar & Teknik Kaigo',
  B: 'B Part — Tubuh & Kondisi Lansia',
  C: 'C Part — Aplikasi Praktik',
}

const SOURCE_OPTIONS = ['過去問 — 第34回 (2022)', '過去問 — 第33回 (2021)', 'Original (dibuat sendiri)', 'Custom']

export function QuestionEditorForm({
  part,
  onPartChange,
  kamokuOptions,
  kamokuId,
  onKamokuChange,
  source,
  onSourceChange,
  difficulty,
  onDifficultyChange,
  questionText,
  onQuestionTextChange,
  options,
  correctOption,
  onSetCorrect,
  onOptionTextChange,
  onOptionExplanationChange,
}: QuestionEditorFormProps) {
  return (
    <div className="min-w-0 flex-[1_1_60%] rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      {/* Classification */}
      <div className="border-b border-[#ECEFF1] p-[18px_20px]">
        <div className="mb-3.5 text-[13px] font-bold text-[#263238]">Klasifikasi Soal</div>
        <div className="grid grid-cols-2 gap-x-3.5 gap-y-3">
          <div>
            <label className="mb-1.5 block text-[11px] font-bold text-[#78909C]">PART</label>
            <select
              value={part}
              onChange={(e) => onPartChange(e.target.value as KamokuPart)}
              className="h-[38px] w-full cursor-pointer appearance-none rounded-lg border border-[#CFD8DC] bg-white px-3 text-[13px] text-[#37474F]"
            >
              {(Object.keys(PART_LABELS) as KamokuPart[]).map((p) => (
                <option key={p} value={p}>
                  {PART_LABELS[p]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-bold text-[#78909C]">
              KAMOKU <span className="font-medium text-[#B0BEC5]">(terfilter dari Part)</span>
            </label>
            <select
              value={kamokuId}
              onChange={(e) => onKamokuChange(Number(e.target.value))}
              className="jp h-[38px] w-full cursor-pointer appearance-none rounded-lg border border-[#CFD8DC] bg-white px-3 text-[13px] text-[#37474F]"
            >
              {kamokuOptions.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-bold text-[#78909C]">SOURCE</label>
            <select
              value={source}
              onChange={(e) => onSourceChange(e.target.value)}
              className="jp h-[38px] w-full cursor-pointer appearance-none rounded-lg border border-[#CFD8DC] bg-white px-3 text-[13px] text-[#37474F]"
            >
              {SOURCE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-bold text-[#78909C]">DIFFICULTY</label>
            <div className="flex gap-1.5">
              {(['Easy', 'Medium', 'Hard'] as DifficultyLabel[]).map((d) => {
                const active = difficulty === d
                const color = DIFFICULTY_COLOR[d]
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => onDifficultyChange(d)}
                    className="h-[38px] flex-1 rounded-lg text-[12.5px] font-bold"
                    style={{
                      border: `1.5px solid ${active ? color : '#CFD8DC'}`,
                      background: active ? color : '#fff',
                      color: active ? '#fff' : '#78909C',
                    }}
                  >
                    {d}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="border-b border-[#ECEFF1] p-[18px_20px]">
        <label className="mb-2 block text-[13px] font-bold text-[#263238]">Pertanyaan (Bahasa Jepang)</label>
        <div className="overflow-hidden rounded-lg border border-[#CFD8DC]">
          <div className="flex items-center gap-0.5 border-b border-[#ECEFF1] bg-[#F5F7F8] px-2 py-1.5">
            {TOOLBAR_BUTTONS.map((btn) => (
              <button
                key={btn}
                type="button"
                className="h-7 w-[30px] rounded-md text-[13px] font-bold text-[#546E7A]"
              >
                {btn}
              </button>
            ))}
            <div className="flex-1" />
            <span className="pr-1 text-[11px] text-[#90A4AE]">ふりがな auto-generate</span>
            <button
              type="button"
              className="h-[26px] rounded-md bg-[#1565C0]/10 px-2.5 text-[11px] font-bold text-[#1565C0]"
            >
              生成
            </button>
          </div>
          <textarea
            value={questionText}
            onChange={(e) => onQuestionTextChange(e.target.value)}
            placeholder="例：利用者が排尿時に不安を感じている場合の対応として、最も適切なものはどれか。"
            className="jp h-[92px] w-full resize-y p-3 text-sm leading-relaxed text-[#263238]"
          />
        </div>
      </div>

      {/* Options */}
      <div className="p-[18px_20px]">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-[13px] font-bold text-[#263238]">Opsi Jawaban</label>
          <span className="text-[11px] text-[#90A4AE]">Klik radio untuk menandai jawaban benar</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {options.map((opt, i) => {
            const num = i + 1
            const isCorrect = correctOption === num
            return (
              <div
                key={i}
                className="rounded-[9px] p-[11px_12px]"
                style={{
                  border: `1.5px solid ${isCorrect ? '#43A047' : '#ECEFF1'}`,
                  background: isCorrect ? 'rgba(67,160,71,0.06)' : '#FAFBFC',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSetCorrect(num)}
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white p-0"
                    style={{ border: `2px solid ${isCorrect ? '#43A047' : '#B0BEC5'}` }}
                  >
                    {isCorrect && <span className="h-2.5 w-2.5 rounded-full bg-[#43A047]" />}
                  </button>
                  <span
                    className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold"
                    style={{ background: isCorrect ? '#43A047' : '#ECEFF1', color: isCorrect ? '#fff' : '#546E7A' }}
                  >
                    {num}
                  </span>
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => onOptionTextChange(i, e.target.value)}
                    className="jp h-9 flex-1 rounded-[7px] border border-[#CFD8DC] px-2.5 text-[13px] text-[#263238]"
                  />
                  {isCorrect && <span className="shrink-0 whitespace-nowrap text-[11px] font-bold text-[#2E7D32]">✓ Benar</span>}
                </div>
                <textarea
                  value={opt.explanation}
                  onChange={(e) => onOptionExplanationChange(i, e.target.value)}
                  placeholder={`Penjelasan kenapa opsi ini ${isCorrect ? 'benar' : 'salah'}…`}
                  className="jp mt-2 h-[42px] w-full resize-y rounded-[7px] border border-[#E0E6E9] px-2.5 py-2 text-xs leading-relaxed text-[#546E7A]"
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
