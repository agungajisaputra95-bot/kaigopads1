import { notFound } from 'next/navigation'
import { QuestionEditorClient } from '@/components/admin/QuestionEditorClient'
import { getLinkedMaterialSectionIds, getQuestionForEdit } from '@/lib/queries/admin'
import { getAllMaterialSections } from '@/lib/queries/material'
import { getAllVocabulary } from '@/lib/queries/vocabulary'
import { KAMOKU_LIST } from '@/lib/constants'
import type { DifficultyLabel } from '@/components/admin/QuestionEditorForm'
import type { ExamFreqLabel } from '@/components/admin/MetadataPanel'

const DIFFICULTY_DISPLAY: Record<string, DifficultyLabel> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

const FREQUENCY_DISPLAY: Record<string, ExamFreqLabel> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

export default async function EditQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const question = await getQuestionForEdit(id)

  if (!question) notFound()

  const [linkedMaterialIds, allMaterialSections, allVocab] = await Promise.all([
    getLinkedMaterialSectionIds(id),
    getAllMaterialSections(),
    getAllVocabulary(),
  ])

  const kamoku = KAMOKU_LIST.find((k) => k.id === question.kamoku_id)
  const displayId = kamoku ? `Q-${kamoku.part}${kamoku.id}-${id.slice(0, 6)}` : id.slice(0, 8)

  const options = Array.from({ length: 5 }, (_, i) => {
    const opt = question.options.find((o) => o.option_number === i + 1)
    return {
      text: opt?.option_text_jp ?? '',
      explanation: opt?.explanation_id ?? '',
    }
  })

  const initialVocabKanji = (question.furigana_map ?? []).map((f) => f.kanji)

  return (
    <QuestionEditorClient
      mode="edit"
      questionId={question.id}
      displayId={displayId}
      initialKamokuId={question.kamoku_id}
      initialSource={question.source ?? 'Original'}
      initialDifficulty={DIFFICULTY_DISPLAY[question.difficulty ?? ''] ?? 'Medium'}
      initialQuestionText={question.question_text_jp}
      initialImageUrl={question.image_url}
      initialOptions={options}
      initialCorrectOption={question.correct_answer ?? 0}
      initialFrequency={FREQUENCY_DISPLAY[question.exam_frequency ?? ''] ?? 'Medium'}
      initialVocabKanji={initialVocabKanji}
      initialLinkedMaterialIds={linkedMaterialIds}
      allMaterialSections={allMaterialSections}
      allVocab={allVocab}
    />
  )
}
