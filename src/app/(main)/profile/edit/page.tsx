import { redirect } from 'next/navigation'
import { getCachedUser } from '@/lib/supabase/server'
import { EditProfileForm } from '@/components/profile/EditProfileForm'

export default async function EditProfilePage() {
  const user = await getCachedUser()
  if (!user) redirect('/login')

  const name = (user.user_metadata?.full_name as string | undefined) ?? ''
  const whatsapp = (user.user_metadata?.whatsapp as string | undefined) ?? ''

  return <EditProfileForm initialName={name} initialWhatsapp={whatsapp} />
}
