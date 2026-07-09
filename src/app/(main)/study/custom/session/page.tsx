import { redirect } from 'next/navigation'
import { CustomSessionClient } from '@/components/practice/CustomSessionClient'
import { createClient } from '@/lib/supabase/server'
import { getFilteredQuestions } from '@/lib/queries/questions'
import { getVocabularyDictForKamokuIds } from '@/lib/queries/vocabulary'

interface CustomSessionPageProps {
  searchParams: Promise<{ kamoku?: string; difficulty?: string; count?: string; weak?: string }>
}

export default async function CustomSessionPage({ searchParams }: CustomSessionPageProps) {
  const params = await searchParams

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const kamokuIds = (params.kamoku ?? '')
    .split(',')
    .map((v) => Number(v))
    .filter((v) => !Number.isNaN(v))

  if (kamokuIds.length === 0) redirect('/study/custom')

  const difficulties = (params.difficulty ?? '').split(',').filter(Boolean)
  const count = Math.max(1, Number(params.count) || 20)
  const weakOnly = params.weak === '1'

  const [questions, vocabDict] = await Promise.all([
    getFilteredQuestions({ kamokuIds, difficulties, weakOnly, userId: user.id, limit: count }),
    getVocabularyDictForKamokuIds(kamokuIds),
  ])

  return <CustomSessionClient questions={questions} vocabDict={vocabDict} />
}
