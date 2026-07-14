import { FlashcardClient } from '@/components/vocabulary/FlashcardClient'
import { getAllVocabulary } from '@/lib/queries/vocabulary'

export default async function FlashcardPage() {
  const allVocab = await getAllVocabulary()

  return <FlashcardClient allVocab={allVocab} />
}
