'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from '@/app/(main)/onboarding/actions'
import { KAMOKU_LIST } from '@/lib/constants'

const SLIDES = [
  {
    emoji: '🇯🇵',
    title: 'Selamat Datang di KaigoPads',
    body: 'Persiapan ujian Kaigo Fukushi Shi jadi lebih terarah — materi, latihan soal, dan simulasi ujian dalam satu tempat.',
  },
  {
    emoji: '📚',
    title: '13 Kamoku Lengkap',
    body: 'Materi dan latihan soal untuk semua 13 mata pelajaran ujian, lengkap dengan furigana otomatis biar gampang dibaca.',
  },
  {
    emoji: '📊',
    title: 'Mock Exam & Analytics',
    body: 'Simulasi ujian penuh 125 soal dengan timer, plus analytics yang nunjukin kamoku mana yang masih perlu kamu perkuat.',
  },
]

export function OnboardingClient() {
  const [step, setStep] = useState(0)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const firstKamoku = KAMOKU_LIST[0]
  const isFinalStep = step === SLIDES.length

  function finishAndGo(href: string) {
    startTransition(async () => {
      await completeOnboarding()
      router.push(href)
    })
  }

  return (
    <div className="flex min-h-screen flex-col justify-between p-6">
      <div className="flex justify-end">
        {!isFinalStep && (
          <button
            type="button"
            onClick={() => finishAndGo('/dashboard')}
            className="text-xs font-semibold text-[#90A4AE]"
          >
            Lewati
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {!isFinalStep ? (
          <>
            <div className="text-6xl">{SLIDES[step].emoji}</div>
            <h1 className="mt-5 text-xl font-extrabold text-[#263238]">{SLIDES[step].title}</h1>
            <p className="mt-2 text-sm text-[#78909C]">{SLIDES[step].body}</p>
          </>
        ) : (
          <>
            <div className="text-6xl">🚀</div>
            <h1 className="mt-5 text-xl font-extrabold text-[#263238]">Mulai dari mana?</h1>
            <p className="mt-2 text-sm text-[#78909C]">Kamu bisa ganti mode kapan saja nanti.</p>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: SLIDES.length + 1 }, (_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{ width: i === step ? 20 : 6, background: i === step ? '#1565C0' : '#CFD8DC' }}
            />
          ))}
        </div>

        {!isFinalStep ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="h-12 w-full rounded-xl bg-[#1565C0] text-[15px] font-bold text-white"
          >
            Lanjut
          </button>
        ) : (
          <>
            <button
              type="button"
              disabled={isPending}
              onClick={() => finishAndGo(`/study/${firstKamoku.id}/practice`)}
              className="h-12 w-full rounded-xl bg-[#1565C0] text-[15px] font-bold text-white disabled:opacity-60"
            >
              {isPending ? 'Memuat…' : 'Soal Dulu'}
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={() => finishAndGo(`/study/${firstKamoku.id}/materi`)}
              className="h-12 w-full rounded-xl border-[1.5px] border-[#1565C0] text-[15px] font-bold text-[#1565C0] disabled:opacity-60"
            >
              {isPending ? 'Memuat…' : 'Materi Dulu'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
