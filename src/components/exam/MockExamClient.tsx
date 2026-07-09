'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { AnswerOption } from '@/components/practice/AnswerOption'
import { ExamTimer } from '@/components/exam/ExamTimer'
import { ExamResultBreakdown, type PartBreakdown } from '@/components/exam/ExamResultBreakdown'
import { submitExamAttempt, type ExamAnswerRecord } from '@/app/(main)/study/mock-exam/actions'
import { masteryColor } from '@/lib/utils'
import type { MockExamQuestion } from '@/lib/queries/exam'
import type { ExamAttempt, PartBreakdownEntry } from '@/types/user-progress'
import type { KamokuPart } from '@/lib/constants'

const EXAM_DURATION_SECONDS = 120 * 60
const EXAM_OPTIONS_COUNT = 5

type Phase = 'setup' | 'in-progress' | 'result'

interface MockExamClientProps {
  questions: MockExamQuestion[]
  initialYear?: string
  initialYearDate?: string
  previousAttempt: ExamAttempt | null
}

export function MockExamClient({ questions, initialYear, initialYearDate, previousAttempt }: MockExamClientProps) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('setup')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(ExamAnswerRecord & { part: KamokuPart })[]>([])
  const [secondsRemaining, setSecondsRemaining] = useState(EXAM_DURATION_SECONDS)
  const [isSaving, startSaving] = useTransition()
  const [result, setResult] = useState<{ correctCount: number; partBreakdown: PartBreakdownEntry[] } | null>(null)

  useEffect(() => {
    if (phase !== 'in-progress') return
    const interval = setInterval(() => {
      setSecondsRemaining((s) => Math.max(0, s - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [phase])

  function handleStart() {
    setPhase('in-progress')
    setQuestionIndex(0)
    setSelected(null)
    setAnswers([])
    setSecondsRemaining(EXAM_DURATION_SECONDS)
  }

  function finish(finalAnswers: (ExamAnswerRecord & { part: KamokuPart })[]) {
    const partTotals: Record<KamokuPart, { correct: number; total: number }> = {
      A: { correct: 0, total: 0 },
      B: { correct: 0, total: 0 },
      C: { correct: 0, total: 0 },
    }
    for (const a of finalAnswers) {
      partTotals[a.part].total += 1
      if (a.isCorrect) partTotals[a.part].correct += 1
    }
    const partBreakdown: PartBreakdownEntry[] = (['A', 'B', 'C'] as const)
      .filter((p) => partTotals[p].total > 0)
      .map((p) => ({ part: p, correct: partTotals[p].correct, total: partTotals[p].total }))

    const correctCount = finalAnswers.filter((a) => a.isCorrect).length
    setResult({ correctCount, partBreakdown })

    startSaving(async () => {
      await submitExamAttempt(
        initialYear ?? 'random',
        finalAnswers.map(({ questionId, userAnswer, isCorrect }) => ({ questionId, userAnswer, isCorrect })),
        partBreakdown
      )
      setPhase('result')
    })
  }

  function handleNext() {
    if (selected === null) return
    const q = questions[questionIndex]
    const record = { questionId: q.id, userAnswer: selected, isCorrect: selected === q.correctAnswer, part: q.part }
    const nextAnswers = [...answers, record]
    setAnswers(nextAnswers)

    if (questionIndex + 1 >= questions.length) {
      finish(nextAnswers)
    } else {
      setQuestionIndex((i) => i + 1)
      setSelected(null)
    }
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="text-3xl">📭</div>
        <div className="text-base font-bold text-[#263238]">Belum ada soal untuk simulasi ini</div>
        <p className="max-w-xs text-sm text-[#78909C]">Bank soal masih kosong, coba lagi setelah ada soal masuk.</p>
        <Link href="/dashboard" className="mt-2 rounded-xl bg-[#1565C0] px-5 py-2.5 text-sm font-bold text-white">
          Kembali ke Dashboard
        </Link>
      </div>
    )
  }

  if (phase === 'setup') {
    return (
      <div className="flex min-h-screen flex-col bg-[#ECEFF1]">
        <div className="flex items-center gap-2.5 bg-[#263238] px-4 py-4">
          <Link
            href="/dashboard"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-white/[0.12]"
          >
            <ChevronLeft size={18} color="#fff" strokeWidth={2.4} />
          </Link>
          <span className="text-base font-bold text-white">Simulasi Ujian Penuh</span>
        </div>

        <div className="flex flex-1 flex-col px-4 py-5">
          <div className="pb-1.5 pt-5 text-center">
            <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-[20px] bg-[#1565C0]/10 text-3xl">
              📝
            </div>
            <div className="mt-3.5 text-xl font-extrabold text-[#263238]">Kaigofukushishi Kokka Shiken</div>
            <div className="mt-0.5 text-[13px] text-[#78909C]">Simulasi mendekati kondisi ujian nasional</div>
          </div>

          <div className="mt-4.5 flex gap-2">
            {[
              { value: questions.length, label: 'soal' },
              { value: EXAM_DURATION_SECONDS / 60, label: 'menit' },
              { value: EXAM_OPTIONS_COUNT, label: 'pilihan' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex-1 rounded-xl bg-white py-3.5 text-center shadow-[0_1px_3px_rgba(55,71,79,0.08)]"
              >
                <div className="font-mono text-[22px] font-bold text-[#1565C0]">{stat.value}</div>
                <div className="mt-0.5 text-[11px] text-[#78909C]">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="mb-2 text-xs font-bold text-[#546E7A]">Sumber soal</div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => initialYear && router.push('/study/mock-exam')}
                className="flex items-center gap-2.5 rounded-xl bg-white p-3.5 text-left"
                style={{ border: `1.5px solid ${!initialYear ? '#1565C0' : '#ECEFF1'}` }}
              >
                <span
                  className="h-5 w-5 shrink-0 rounded-full"
                  style={{ border: !initialYear ? '6px solid #1565C0' : '2px solid #CFD8DC' }}
                />
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#263238]">Acak (Semua Soal)</div>
                  <div className="text-[11px] text-[#90A4AE]">Soal acak dari seluruh bank soal tersedia</div>
                </div>
              </button>
              {initialYear && (
                <div
                  className="flex items-center gap-2.5 rounded-xl bg-white p-3.5"
                  style={{ border: '1.5px solid #1565C0' }}
                >
                  <span className="h-5 w-5 shrink-0 rounded-full" style={{ border: '6px solid #1565C0' }} />
                  <div className="flex-1">
                    <div className="jp text-sm font-bold text-[#263238]">
                      {initialYear} <span className="font-medium text-[#607D8B]">{initialYearDate}</span>
                    </div>
                    <div className="text-[11px] text-[#90A4AE]">Replika soal tahun tertentu (過去問)</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-[10px] bg-[#FB8C00]/[0.09] p-3">
            <span className="shrink-0 text-[15px]">⚠️</span>
            <span className="text-xs leading-relaxed text-[#8D6E43]">
              Tidak bisa kembali ke soal sebelumnya, seperti ujian asli. Pastikan kamu punya waktu tenang.
            </span>
          </div>

          <div className="flex-1" />
          <button
            type="button"
            onClick={handleStart}
            className="mt-4 h-[52px] w-full rounded-2xl bg-[#1565C0] text-base font-bold text-white shadow-[0_6px_18px_rgba(21,101,192,0.3)]"
          >
            Mulai Ujian
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'in-progress') {
    const question = questions[questionIndex]
    return (
      <div className="flex min-h-screen flex-col bg-[#ECEFF1]">
        <ExamTimer
          secondsRemaining={secondsRemaining}
          questionNumber={question.number}
          totalQuestions={questions.length}
          examLabel={`Mock Exam · ${questions.length} soal`}
        />

        <div className="flex flex-1 flex-col px-3.5 py-4">
          <div className="font-mono text-[13px] font-bold text-[#90A4AE]">Q{question.number}</div>
          <div className="jp mt-2 text-base font-medium leading-[1.7] text-[#263238]">{question.textJp}</div>

          <div className="mt-4 flex flex-col gap-2">
            {question.options.map((opt) => (
              <AnswerOption
                key={opt.number}
                optionNumber={opt.number}
                text={opt.textJp}
                furiganaMap={opt.furiganaMap}
                state={selected === opt.number ? 'selected' : 'idle'}
                onClick={() => setSelected(opt.number)}
              />
            ))}
          </div>

          <div className="flex-1" />
          <button
            type="button"
            onClick={handleNext}
            disabled={selected === null || isSaving}
            className="mt-3 flex h-[50px] w-full items-center justify-center gap-2 rounded-[13px] text-[15px] font-bold"
            style={{
              background: selected === null ? '#CFD8DC' : '#1565C0',
              color: selected === null ? '#78909C' : '#fff',
            }}
          >
            {isSaving ? 'Menyimpan…' : questionIndex + 1 >= questions.length ? 'Selesai' : 'Soal Berikutnya'}
            {!isSaving && <span className="text-lg">→</span>}
          </button>
        </div>
      </div>
    )
  }

  if (!result) return null

  const totalQuestions = questions.length
  const percent = Math.round((result.correctCount / totalQuestions) * 100)
  const passed = percent >= 60
  const delta = previousAttempt ? result.correctCount - previousAttempt.correct_count : null

  const resultParts: PartBreakdown[] = result.partBreakdown.map((p) => {
    const pct = Math.round((p.correct / p.total) * 100)
    return { label: `${p.part} Part`, frac: `${p.correct}/${p.total}`, pct, color: masteryColor(pct) }
  })

  return (
    <div className="min-h-screen bg-[#ECEFF1]">
      <div
        className="relative overflow-hidden px-5 pb-6 pt-7 text-center"
        style={{ background: passed ? '#43A047' : '#E53935' }}
      >
        <div className="absolute -right-5 -top-[30px] h-[120px] w-[120px] rounded-full bg-white/[0.08]" />
        <div className="relative">
          <div className="text-[13px] font-bold tracking-wide text-white/85">SKOR SIMULASI</div>
          <div className="mt-1.5 flex items-baseline justify-center gap-1.5">
            <span className="font-mono text-[52px] font-bold leading-none text-white">{result.correctCount}</span>
            <span className="font-mono text-2xl font-bold text-white/70">/{totalQuestions}</span>
          </div>
          <div className="mt-1 font-mono text-lg font-bold text-white">{percent}%</div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/[0.18] px-3.5 py-1.5">
            <span className="text-sm">{passed ? '🎉' : '📚'}</span>
            <span className="text-[13px] font-bold text-white">
              {passed ? 'Passing line 60% — Kamu lulus!' : 'Belum lulus passing line 60% — terus latihan!'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-[15px] py-4">
        {delta !== null && (
          <div className="flex items-center gap-2.5 rounded-xl bg-white p-3.5 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
            <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#43A047]/[0.12] text-lg">
              {delta >= 0 ? '↗️' : '↘️'}
            </span>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-[#263238]">Dibanding simulasi sebelumnya</div>
              <div className="text-xs text-[#78909C]">
                Sebelumnya {previousAttempt!.correct_count}/{previousAttempt!.total_questions}
              </div>
            </div>
            <span
              className="font-mono text-lg font-bold"
              style={{ color: delta >= 0 ? '#43A047' : '#E53935' }}
            >
              {delta >= 0 ? '+' : ''}
              {delta}
            </span>
          </div>
        )}

        <ExamResultBreakdown parts={resultParts} />

        <div className="mt-4 flex gap-2">
          <Link
            href="/analytics"
            className="flex h-12 flex-1 items-center justify-center rounded-xl border-[1.5px] border-[#1565C0] bg-[#1565C0]/5 text-[13px] font-bold text-[#1565C0]"
          >
            Lihat Analisis
          </Link>
          <Link
            href="/study/weak-review"
            className="flex h-12 flex-1 items-center justify-center rounded-xl bg-[#E53935] text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(229,57,53,0.28)]"
          >
            Review Soal Salah
          </Link>
        </div>
      </div>
    </div>
  )
}
