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

export interface PaymentHistoryItem {
  id: string
  months: number
  premiumUntilAfter: string
  confirmedAt: string
}

export async function getMyPaymentHistory(userId: string): Promise<PaymentHistoryItem[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('payment_history')
    .select('id, months, premium_until_after, confirmed_at')
    .eq('user_id', userId)
    .order('confirmed_at', { ascending: false })

  return (data ?? []).map((row) => ({
    id: row.id,
    months: row.months,
    premiumUntilAfter: row.premium_until_after,
    confirmedAt: row.confirmed_at,
  }))
}
