import { createClient } from '@/lib/supabase/server'

export interface ProfilePremiumStatus {
  isPremium: boolean
  premiumUntil: string | null
  isAdmin: boolean
}

export async function getUserPremiumStatus(userId: string): Promise<ProfilePremiumStatus> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('user_premium')
    .select('is_premium, premium_until, is_admin')
    .eq('user_id', userId)
    .maybeSingle()

  return {
    isPremium: data?.is_premium ?? false,
    premiumUntil: data?.premium_until ?? null,
    isAdmin: data?.is_admin ?? false,
  }
}

export async function hasActivePushSubscription(userId: string): Promise<boolean> {
  const supabase = await createClient()
  const { count } = await supabase
    .from('push_subscriptions')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)

  return (count ?? 0) > 0
}
