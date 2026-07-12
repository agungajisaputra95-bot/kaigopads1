import { createAdminClient } from '@/lib/supabase/admin'

export interface UserPaymentRow {
  id: string
  email: string
  name: string | null
  whatsapp: string | null
  createdAt: string
  isPremium: boolean
  premiumUntil: string | null
  paymentConfirmedAt: string | null
}

export async function getUsersWithPremiumStatus(): Promise<UserPaymentRow[]> {
  const supabase = createAdminClient()

  const [usersRes, premiumRes] = await Promise.all([
    supabase.auth.admin.listUsers({ page: 1, perPage: 200 }),
    supabase.from('user_premium').select('*'),
  ])

  if (usersRes.error) return []

  const premiumByUser = new Map((premiumRes.data ?? []).map((row) => [row.user_id, row]))

  return usersRes.data.users
    .map((u) => {
      const premium = premiumByUser.get(u.id)
      return {
        id: u.id,
        email: u.email ?? '(tanpa email)',
        name: (u.user_metadata?.full_name as string | undefined) ?? null,
        whatsapp: (u.user_metadata?.whatsapp as string | undefined) ?? null,
        createdAt: u.created_at,
        isPremium: premium?.is_premium ?? false,
        premiumUntil: premium?.premium_until ?? null,
        paymentConfirmedAt: premium?.payment_confirmed_at ?? null,
      }
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}
