import { redirect } from 'next/navigation'
import { MockExamClient } from '@/components/exam/MockExamClient'
import { getExamQuestions } from '@/lib/queries/exam'
import { getLatestExamAttempt } from '@/lib/queries/dashboard'
import { createClient } from '@/lib/supabase/server'

interface MockExamPageProps {
  searchParams: Promise<{ year?: string; date?: string }>
}

export default async function MockExamPage({ searchParams }: MockExamPageProps) {
  const { year, date } = await searchParams

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [questions, previousAttempt] = await Promise.all([
    getExamQuestions(year),
    getLatestExamAttempt(user.id),
  ])

  return (
    <MockExamClient
      questions={questions}
      initialYear={year}
      initialYearDate={date}
      previousAttempt={previousAttempt}
    />
  )
}
