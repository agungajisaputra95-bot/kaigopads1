'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'

export async function confirmPayment(userId: string, months: number) {
  const supabase = createAdminClient()
  const premiumUntil = new Date()
  premiumUntil.setMonth(premiumUntil.getMonth() + months)

  await supabase.from('user_premium').upsert({
    user_id: userId,
    is_premium: true,
    premium_until: premiumUntil.toISOString(),
    payment_confirmed_at: new Date().toISOString(),
  })

  revalidatePath('/admin/users/payment')
}

export async function revokePremium(userId: string) {
  const supabase = createAdminClient()
  await supabase.from('user_premium').upsert({ user_id: userId, is_premium: false })
  revalidatePath('/admin/users/payment')
}
