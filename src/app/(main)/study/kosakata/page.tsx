import { KosakataClient } from '@/components/vocabulary/KosakataClient'
import { getAllVocabulary } from '@/lib/queries/vocabulary'

export default async function KosakataPage() {
  const allVocab = await getAllVocabulary()

  return <KosakataClient allVocab={allVocab} />
}
