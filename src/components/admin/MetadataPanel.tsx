import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { FuriganaText } from '@/components/ui/FuriganaText'
import type { FuriganaMapEntry } from '@/types/question'

export type ExamFreqLabel = 'High' | 'Medium' | 'Low'

export interface MateriLinkOption {
  key: string
  labelJp: string
  furiganaMap: FuriganaMapEntry[]
  partCode: string
  linked: boolean
}

const FREQ_COLOR: Record<ExamFreqLabel, string> = {
  High: '#E53935',
  Medium: '#FB8C00',
  Low: '#43A047',
}

interface MetadataPanelProps {
  vocabChips: string[]
  vocabSuggestions: string[]
  onRemoveVocab: (word: string) => void
  onAddVocab: (word: string) => void
  materiLinks: MateriLinkOption[]
  onToggleMateri: (key: string) => void
  frequency: ExamFreqLabel
  onFrequencyChange: (freq: ExamFreqLabel) => void
}

export function MetadataPanel({
  vocabChips,
  vocabSuggestions,
  onRemoveVocab,
  onAddVocab,
  materiLinks,
  onToggleMateri,
  frequency,
  onFrequencyChange,
}: MetadataPanelProps) {
  const [vocabInput, setVocabInput] = useState('')
  const [materiQuery, setMateriQuery] = useState('')
  const filteredMateriLinks = materiQuery.trim()
    ? materiLinks.filter((m) => m.labelJp.includes(materiQuery.trim()))
    : materiLinks

  return (
    <div className="rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      <div className="border-b border-[#ECEFF1] p-[16px_18px]">
        <div className="text-[13px] font-bold text-[#263238]">Metadata & Linking</div>
      </div>

      {/* Kosakata sulit */}
      <div className="border-b border-[#ECEFF1] p-[16px_18px]">
        <label className="mb-2 block text-[11px] font-bold text-[#78909C]">KOSAKATA SULIT</label>
        <div className="mb-2 flex flex-wrap gap-1.5">
          {vocabChips.map((word) => (
            <span
              key={word}
              className="jp flex h-7 items-center gap-1.5 rounded-lg border border-[#1565C0]/20 bg-[#1565C0]/[0.09] py-0 pl-2.5 pr-1.5 text-xs font-semibold text-[#1565C0]"
            >
              {word}
              <button
                type="button"
                onClick={() => onRemoveVocab(word)}
                className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] bg-[#1565C0]/15 text-xs leading-none"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            list="vocab-suggestions"
            value={vocabInput}
            onChange={(e) => setVocabInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && vocabInput.trim()) {
                onAddVocab(vocabInput.trim())
                setVocabInput('')
              }
            }}
            placeholder="Cari & tambah kosakata…"
            className="h-[34px] w-full rounded-[7px] border border-[#CFD8DC] px-2.5 pr-8 text-xs"
          />
          <datalist id="vocab-suggestions">
            {vocabSuggestions.map((word) => (
              <option key={word} value={word} />
            ))}
          </datalist>
          <Search size={14} className="pointer-events-none absolute right-2.5 top-[10px] text-[#B0BEC5]" />
        </div>
        <div className="mt-1.5 text-[10.5px] text-[#90A4AE]">
          Hanya kata yang cocok dengan kamus kosakata kamoku ini yang bisa di-tap saat latihan.
        </div>
      </div>

      {/* Materi terkait */}
      <div className="border-b border-[#ECEFF1] p-[16px_18px]">
        <label className="mb-2 block text-[11px] font-bold text-[#78909C]">
          MATERI TERKAIT <span className="font-medium text-[#B0BEC5]">(bidirectional link)</span>
        </label>
        <div className="relative mb-2">
          <input
            type="text"
            value={materiQuery}
            onChange={(e) => setMateriQuery(e.target.value)}
            placeholder="Cari section materi…"
            className="h-[34px] w-full rounded-[7px] border border-[#CFD8DC] px-2.5 pr-8 text-xs"
          />
          <Search size={14} className="pointer-events-none absolute right-2.5 top-[10px] text-[#B0BEC5]" />
        </div>
        {materiLinks.length === 0 && (
          <div className="mb-2 text-[11px] text-[#B0BEC5]">Belum ada materi untuk kamoku ini.</div>
        )}
        <div className="flex flex-col gap-0.5">
          {filteredMateriLinks.map((m) => (
            <label
              key={m.key}
              onClick={() => onToggleMateri(m.key)}
              className="flex cursor-pointer items-center gap-2.5 rounded-[7px] px-1.5 py-2"
              style={{ background: m.linked ? 'rgba(21,101,192,0.05)' : 'transparent' }}
            >
              <span
                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] text-xs font-bold text-white"
                style={{
                  border: `1.5px solid ${m.linked ? '#1565C0' : '#CFD8DC'}`,
                  background: m.linked ? '#1565C0' : '#fff',
                }}
              >
                {m.linked && '✓'}
              </span>
              <span className="jp flex-1 text-[12.5px] text-[#37474F]">
                <FuriganaText text={m.labelJp} furiganaMap={m.furiganaMap} />
              </span>
              <span className="text-[10px] font-bold text-[#90A4AE]">{m.partCode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Frekuensi */}
      <div className="p-[16px_18px]">
        <label className="mb-2 block text-[11px] font-bold text-[#78909C]">FREKUENSI DI UJIAN</label>
        <div className="flex gap-1.5">
          {(['High', 'Medium', 'Low'] as ExamFreqLabel[]).map((f) => {
            const active = frequency === f
            const color = FREQ_COLOR[f]
            return (
              <button
                key={f}
                type="button"
                onClick={() => onFrequencyChange(f)}
                className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg text-xs font-bold"
                style={{
                  border: `1.5px solid ${active ? color : '#CFD8DC'}`,
                  background: active ? color : '#fff',
                  color: active ? '#fff' : '#90A4AE',
                }}
              >
                ● {f}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
