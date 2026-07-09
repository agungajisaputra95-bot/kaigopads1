import { MateriClient } from '@/components/materi/MateriClient'
import { getAllMaterialSectionsForKamoku } from '@/lib/queries/material'
import { getVocabularyDictForKamoku } from '@/lib/queries/vocabulary'
import { getRelatedQuestionsForKamoku, getDominantExamFrequency } from '@/lib/queries/questions'
import { KAMOKU_LIST } from '@/lib/constants'

export default async function MateriPage({ params }: { params: Promise<{ kamokuId: string }> }) {
  const { kamokuId } = await params
  const kamoku = KAMOKU_LIST.find((k) => k.id === Number(kamokuId))

  if (!kamoku) {
    return <div className="p-4 text-sm text-[#78909C]">Kamoku tidak ditemukan.</div>
  }

  const [sections, vocabDict, relatedQuestions, examFrequency] = await Promise.all([
    getAllMaterialSectionsForKamoku(kamoku.id),
    getVocabularyDictForKamoku(kamoku.id),
    getRelatedQuestionsForKamoku(kamoku.id),
    getDominantExamFrequency(kamoku.id),
  ])

  const totalChars = sections.reduce((sum, s) => sum + s.content_jp.length, 0)
  const estimatedMinutes = Math.max(1, Math.round(totalChars / 400))

  return (
    <MateriClient
      kamoku={kamoku}
      sections={sections}
      vocabDict={vocabDict}
      relatedQuestions={relatedQuestions}
      estimatedMinutes={estimatedMinutes}
      examFrequency={examFrequency}
    />
  )
}
