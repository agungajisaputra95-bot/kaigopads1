import { redirect } from 'next/navigation'
import { getCachedUser } from '@/lib/supabase/server'
import { ChangePasswordForm } from '@/components/profile/ChangePasswordForm'

export default async function ChangePasswordPage() {
  const user = await getCachedUser()
  if (!user) redirect('/login')

  return <ChangePasswordForm />
}
