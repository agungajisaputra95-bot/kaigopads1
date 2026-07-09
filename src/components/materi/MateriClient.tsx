'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { FuriganaText } from '@/components/ui/FuriganaText'
import { FuriganaPill } from '@/components/ui/FuriganaPill'
import { TapToRevealPopup } from '@/components/ui/TapToRevealPopup'
import { ConceptCard } from '@/components/materi/ConceptCard'
import { VocabTable } from '@/components/materi/VocabTable'
import { RelatedQuestionsBlock, type RelatedQuestion } from '@/components/materi/RelatedQuestionsBlock'
import type { KamokuDef } from '@/lib/constants'
import type { Vocabulary, MaterialSection } from '@/types/material'
import type { ExamFrequency } from '@/types/question'

const FREQ_LABEL: Record<ExamFrequency, { label: string; bg: string; color: string; dot: string }> = {
  high: { label: 'Tinggi', bg: 'rgba(229,57,53,0.1)', color: '#C62828', dot: '🔴' },
  medium: { label: 'Sedang', bg: 'rgba(251,140,0,0.1)', color: '#E65100', dot: '🟠' },
  low: { label: 'Rendah', bg: 'rgba(67,160,71,0.1)', color: '#2E7D32', dot: '🟢' },
}

interface MateriClientProps {
  kamoku: KamokuDef
  sections: MaterialSection[]
  vocabDict: Record<string, Vocabulary>
  relatedQuestions: RelatedQuestion[]
  estimatedMinutes: number
  examFrequency: ExamFrequency | null
}

export function MateriClient({
  kamoku,
  sections,
  vocabDict,
  relatedQuestions,
  estimatedMinutes,
  examFrequency,
}: MateriClientProps) {
  const [dictVocab, setDictVocab] = useState<Vocabulary | null>(null)
  const vocabList = Object.values(vocabDict)
  const freq = examFrequency ? FREQ_LABEL[examFrequency] : null

  return (
    <div className="min-h-screen pb-6">
      <div className="bg-white px-3.5 pb-3.5 pt-3 shadow-[0_1px_8px_rgba(55,71,79,0.05)]">
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <Link
              href="/dashboard"
              className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-[#ECEFF1]"
            >
              <ChevronLeft size={18} color="#455A64" strokeWidth={2.4} />
            </Link>
            <div className="jp min-w-0 text-[19px] font-bold leading-tight text-[#263238]">
              <FuriganaText text={kamoku.nameJp} />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-md bg-[#1565C0]/10 px-2 py-1 text-[10px] font-bold text-[#1565C0]">
              {kamoku.part} Part
            </span>
            <FuriganaPill compact />
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-lg bg-[#ECEFF1] px-2.5 py-1 text-[11px] font-semibold text-[#546E7A]">
            ⏱️ {estimatedMinutes} menit baca
          </span>
          {freq && (
            <span
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold"
              style={{ background: freq.bg, color: freq.color }}
            >
              {freq.dot} Frekuensi ujian: {freq.label}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3.5 px-3.5 pb-4 pt-4">
        {sections.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-center text-sm text-[#90A4AE] shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
            Materi untuk kamoku ini belum tersedia.
          </div>
        )}

        {sections.map((s) => (
          <ConceptCard
            key={s.id}
            titleJp={s.title_jp}
            titleFuriganaMap={s.furigana_map ?? []}
            bodyJp={s.content_jp}
            bodyFuriganaMap={s.furigana_map ?? []}
            bodyId={s.content_id}
            exampleJp={s.example_jp ?? ''}
            exampleFuriganaMap={s.furigana_map ?? []}
            exampleId={s.example_id ?? ''}
            examJp={s.exam_point_jp ?? undefined}
            examFuriganaMap={s.furigana_map ?? []}
            examId={s.exam_point_id ?? undefined}
            vocabDict={vocabDict}
            onWordTap={setDictVocab}
          />
        ))}

        {vocabList.length > 0 && <VocabTable vocab={vocabList} onWordTap={setDictVocab} />}

        {relatedQuestions.length > 0 && (
          <RelatedQuestionsBlock questions={relatedQuestions} href={`/study/${kamoku.id}/practice`} />
        )}
      </div>

      <div className="sticky bottom-0 z-20 bg-gradient-to-t from-[#ECEFF1] from-70% to-transparent px-3.5 pb-4 pt-3">
        <Link
          href={`/study/${kamoku.id}/practice`}
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#1565C0] text-base font-bold text-white shadow-[0_6px_18px_rgba(21,101,192,0.3)]"
        >
          Mulai Latihan Soal Kamoku Ini <span className="text-lg">→</span>
        </Link>
      </div>

      {dictVocab && <TapToRevealPopup vocab={dictVocab} onClose={() => setDictVocab(null)} />}
    </div>
  )
}
