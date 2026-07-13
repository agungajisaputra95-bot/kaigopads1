import { redirect } from 'next/navigation'
import { getCachedUser } from '@/lib/supabase/server'
import { OnboardingClient } from '@/components/onboarding/OnboardingClient'

export default async function OnboardingPage() {
  const user = await getCachedUser()
  if (!user) redirect('/login')

  return <OnboardingClient />
}
