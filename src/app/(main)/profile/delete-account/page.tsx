import { redirect } from 'next/navigation'
import { getCachedUser } from '@/lib/supabase/server'
import { DeleteAccountForm } from '@/components/profile/DeleteAccountForm'

export default async function DeleteAccountPage() {
  const user = await getCachedUser()
  if (!user) redirect('/login')

  return <DeleteAccountForm />
}
