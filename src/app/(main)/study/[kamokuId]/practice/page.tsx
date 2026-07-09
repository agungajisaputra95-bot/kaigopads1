import Link from 'next/link'
import { PracticeClient } from '@/components/practice/PracticeClient'
import { getQuestionsForKamoku } from '@/lib/queries/questions'
import { getVocabularyDictForKamoku } from '@/lib/queries/vocabulary'
import { getFirstMaterialSectionForKamoku } from '@/lib/queries/material'
import { KAMOKU_LIST } from '@/lib/constants'

export default async function PracticePage({ params }: { params: Promise<{ kamokuId: string }> }) {
  const { kamokuId } = await params
  const kamoku = KAMOKU_LIST.find((k) => k.id === Number(kamokuId))

  if (!kamoku) {
    return <div className="p-4 text-sm text-[#78909C]">Kamoku tidak ditemukan.</div>
  }

  const [questions, vocabDict, materialSection] = await Promise.all([
    getQuestionsForKamoku(kamoku.id),
    getVocabularyDictForKamoku(kamoku.id),
    getFirstMaterialSectionForKamoku(kamoku.id),
  ])

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="text-3xl">📭</div>
        <div className="text-base font-bold text-[#263238]">Belum ada soal untuk kamoku ini</div>
        <p className="max-w-xs text-sm text-[#78909C]">
          Bank soal <span className="jp">{kamoku.nameJp}</span> masih kosong. Coba kamoku lain dulu, atau tambahkan
          soal lewat Admin CMS.
        </p>
        <Link href="/dashboard" className="mt-2 rounded-xl bg-[#1565C0] px-5 py-2.5 text-sm font-bold text-white">
          Kembali ke Dashboard
        </Link>
      </div>
    )
  }

  const relatedMaterial = materialSection
    ? {
        titleJp: materialSection.title_jp,
        titleFuriganaMap: [],
        bodyJp: materialSection.content_jp,
        bodyFuriganaMap: materialSection.furigana_map ?? [],
        bodyId: materialSection.content_id,
        exampleJp: materialSection.example_jp ?? '',
        exampleFuriganaMap: [],
        exampleId: materialSection.example_id ?? '',
      }
    : null

  return (
    <PracticeClient kamoku={kamoku} questions={questions} vocabDict={vocabDict} relatedMaterial={relatedMaterial} />
  )
}
