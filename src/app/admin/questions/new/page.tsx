import { QuestionEditorClient } from '@/components/admin/QuestionEditorClient'
import { getAllMaterialSections } from '@/lib/queries/material'
import { getAllVocabulary } from '@/lib/queries/vocabulary'

const EMPTY_OPTIONS = Array.from({ length: 5 }, () => ({ text: '', explanation: '' }))

export default async function NewQuestionPage() {
  const [allMaterialSections, allVocab] = await Promise.all([getAllMaterialSections(), getAllVocabulary()])

  return (
    <QuestionEditorClient
      mode="new"
      displayId="Baru"
      initialKamokuId={6}
      initialSource="Original"
      initialDifficulty="Medium"
      initialQuestionText=""
      initialOptions={EMPTY_OPTIONS}
      initialCorrectOption={0}
      initialFrequency="Medium"
      initialVocabKanji={[]}
      initialLinkedMaterialIds={[]}
      allMaterialSections={allMaterialSections}
      allVocab={allVocab}
    />
  )
}
