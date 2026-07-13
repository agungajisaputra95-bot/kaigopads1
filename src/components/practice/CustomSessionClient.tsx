'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { QuestionCard } from '@/components/practice/QuestionCard'
import { AnswerOption, type AnswerOptionState } from '@/components/practice/AnswerOption'
import { ExplanationCard, type ExplanationEntry } from '@/components/practice/ExplanationCard'
import { CorrectFeedbackBurst } from '@/components/practice/CorrectFeedbackBurst'
import { TapToRevealPopup } from '@/components/ui/TapToRevealPopup'
import { FuriganaPill } from '@/components/ui/FuriganaPill'
import { markQuestionWeak, submitAnswer } from '@/app/(main)/study/[kamokuId]/practice/actions'
import { KAMOKU_LIST } from '@/lib/constants'
import type { Vocabulary } from '@/types/material'
import type { QuestionWithOptions } from '@/types/question'

interface CustomSessionClientProps {
  questions: QuestionWithOptions[]
  vocabDict: Record<string, Vocabulary>
}

export function CustomSessionClient({ questions, vocabDict }: CustomSessionClientProps) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [dictVocab, setDictVocab] = useState<Vocabulary | null>(null)
  const [bookmarked, setBookmarked] = useState(false)
  const [finished, setFinished] = useState(false)
  const [showBurst, setShowBurst] = useState(false)

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="text-3xl">📭</div>
        <div className="text-base font-bold text-[#263238]">Tidak ada soal yang cocok</div>
        <div className="text-sm text-[#78909C]">Coba longgarkan filter kesulitan atau matikan &quot;hanya soal lemah&quot;.</div>
        <Link
          href="/study/custom"
          className="mt-2 flex h-11 items-center justify-center rounded-xl bg-[#1565C0] px-5 text-sm font-bold text-white"
        >
          Kembali ke Filter
        </Link>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="text-3xl">🎉</div>
        <div className="text-base font-bold text-[#263238]">Sesi selesai!</div>
        <div className="text-sm text-[#78909C]">Kamu sudah mengerjakan {questions.length} soal custom.</div>
        <Link
          href="/dashboard"
          className="mt-2 flex h-11 items-center justify-center rounded-xl bg-[#1565C0] px-5 text-sm font-bold text-white"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    )
  }

  const question = questions[questionIndex]
  const kamoku = KAMOKU_LIST.find((k) => k.id === question.kamoku_id)
  const correctOption = question.options.find((o) => o.option_number === question.correct_answer)!
  const selectedOption = question.options.find((o) => o.option_number === selected)

  function handleCheck() {
    if (selected === null) return
    setChecked(true)
    const isCorrect = selected === question.correct_answer
    if (isCorrect) setShowBurst(true)
    submitAnswer(question.id, selected, isCorrect)
  }

  function handleNext() {
    if (questionIndex + 1 >= questions.length) {
      setFinished(true)
      return
    }
    setQuestionIndex((i) => i + 1)
    setSelected(null)
    setChecked(false)
    setDictVocab(null)
    setBookmarked(false)
    setShowBurst(false)
  }

  function handleBookmark() {
    setBookmarked(true)
    markQuestionWeak(question.id)
  }

  function optionState(optionNumber: number, isCorrect: boolean): AnswerOptionState {
    if (!checked) return optionNumber === selected ? 'selected' : 'idle'
    if (isCorrect) return 'correct'
    if (optionNumber === selected) return 'wrong'
    return 'dim'
  }

  function optionTag(optionNumber: number, isCorrect: boolean): string | undefined {
    if (!checked) return undefined
    if (isCorrect) return 'Jawaban benar'
    if (optionNumber === selected) return 'Pilihan kamu'
    return undefined
  }

  const explanationEntries: ExplanationEntry[] = checked
    ? [
        {
          kind: 'correct',
          title: `Kenapa opsi ${correctOption.option_number} benar`,
          textJp: correctOption.explanation_jp ?? correctOption.option_text_jp,
          furiganaMap: correctOption.explanation_furigana_map ?? correctOption.option_furigana_map ?? [],
          textId: correctOption.explanation_id ?? '',
        },
        ...(selectedOption && selectedOption.option_number !== question.correct_answer
          ? [
              {
                kind: 'wrong' as const,
                title: `Kenapa opsi ${selectedOption.option_number} salah`,
                textJp: selectedOption.explanation_jp ?? selectedOption.option_text_jp,
                furiganaMap: selectedOption.explanation_furigana_map ?? selectedOption.option_furigana_map ?? [],
                textId: selectedOption.explanation_id ?? 'Opsi ini kurang tepat untuk situasi tersebut.',
              },
            ]
          : []),
      ]
    : []

  return (
    <div className="min-h-screen pb-6">
      <div className="bg-white px-3.5 pb-3.5 pt-3 shadow-[0_1px_3px_rgba(55,71,79,0.06)]">
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <Link
              href="/study/custom"
              className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-[#ECEFF1]"
            >
              <ChevronLeft size={18} color="#455A64" strokeWidth={2.4} />
            </Link>
            <div className="min-w-0 truncate text-lg font-bold leading-tight text-[#263238]">Latihan Custom</div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {kamoku && (
              <span className="rounded-md bg-[#1565C0]/10 px-2 py-1 text-[10px] font-bold text-[#1565C0]">
                {kamoku.part} Part
              </span>
            )}
            <FuriganaPill compact />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2.5">
          <span className="whitespace-nowrap text-xs font-bold text-[#546E7A]">
            Soal <span className="font-mono text-[#1565C0]">{questionIndex + 1}</span>/{questions.length}
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#ECEFF1]">
            <div
              className="h-full rounded-full bg-[#1565C0]"
              style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="relative px-3.5 pb-4 pt-4">
        {showBurst && <CorrectFeedbackBurst />}
        <QuestionCard
          questionNumber={questionIndex + 1}
          difficulty={question.difficulty ?? 'medium'}
          text={question.question_text_jp}
          furiganaMap={question.furigana_map ?? []}
          vocabDict={vocabDict}
          onWordTap={setDictVocab}
        />

        {kamoku && <div className="jp mt-1.5 text-[11px] font-semibold text-[#90A4AE]">{kamoku.nameJp}</div>}

        <div className="mt-4 flex flex-col gap-2">
          {question.options.map((option) => {
            const isCorrect = option.option_number === question.correct_answer
            return (
              <AnswerOption
                key={option.option_number}
                optionNumber={option.option_number}
                text={option.option_text_jp}
                furiganaMap={option.option_furigana_map ?? []}
                state={optionState(option.option_number, isCorrect)}
                tag={optionTag(option.option_number, isCorrect)}
                disabled={checked}
                onClick={() => !checked && setSelected(option.option_number)}
              />
            )
          })}
        </div>

        {!checked ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={selected === null}
            className="mt-4 h-12 w-full rounded-xl text-[15px] font-bold"
            style={{
              background: selected === null ? '#CFD8DC' : '#1565C0',
              color: selected === null ? '#78909C' : '#fff',
            }}
          >
            {selected === null ? 'Pilih satu jawaban dulu' : 'Periksa Jawaban'}
          </button>
        ) : (
          <>
            <ExplanationCard
              entries={explanationEntries}
              kamokuNameJp={kamoku?.nameJp ?? ''}
              kamokuFuriganaMap={[]}
              partLabel={kamoku ? `${kamoku.part} Part` : ''}
              onBookmark={handleBookmark}
              bookmarked={bookmarked}
            />

            <button
              type="button"
              onClick={handleNext}
              className="mt-2.5 flex h-[50px] w-full items-center justify-center gap-2 rounded-[13px] bg-[#1565C0] text-base font-bold text-white shadow-[0_4px_12px_rgba(21,101,192,0.28)]"
            >
              {questionIndex + 1 >= questions.length ? 'Selesai' : 'Lanjut ke soal berikutnya'} <span className="text-lg">→</span>
            </button>
          </>
        )}

        {dictVocab && <TapToRevealPopup vocab={dictVocab} onClose={() => setDictVocab(null)} />}
      </div>
    </div>
  )
}
