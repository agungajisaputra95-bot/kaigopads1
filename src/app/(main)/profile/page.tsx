import { redirect } from 'next/navigation'
import { ProfileClient } from '@/components/profile/ProfileClient'
import { getCachedUser } from '@/lib/supabase/server'
import { getUserPremiumStatus, hasActivePushSubscription } from '@/lib/queries/profile'
import { KAMOKU_LIST } from '@/lib/constants'

interface ProfilePageProps {
  searchParams: Promise<{ paywall?: string }>
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const { paywall } = await searchParams
  const user = await getCachedUser()

  if (!user) redirect('/login')

  const [premium, pushEnabled] = await Promise.all([
    getUserPremiumStatus(user.id),
    hasActivePushSubscription(user.id),
  ])
  const name = (user.user_metadata?.full_name as string | undefined) ?? user.email?.split('@')[0] ?? 'Pengguna'
  const email = user.email ?? '-'
  const premiumUntil = premium.premiumUntil
    ? new Date(premium.premiumUntil).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    : undefined

  const kamoku = paywall ? KAMOKU_LIST.find((k) => k.id === Number(paywall)) : undefined

  return (
    <ProfileClient
      name={name}
      email={email}
      isPremium={premium.isPremium}
      premiumUntil={premiumUntil}
      isAdmin={premium.isAdmin}
      paywallKamoku={kamoku ? { nameJp: kamoku.nameJp, furiganaMap: [] } : null}
      pushEnabled={pushEnabled}
    />
  )
}
