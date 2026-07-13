'use server'

import { createClient } from '@/lib/supabase/server'

export interface PushSubscriptionPayload {
  endpoint: string
  keys: { p256dh: string; auth: string }
}

export async function subscribePush(subscription: PushSubscriptionPayload) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'unauthenticated' as const }

  const { error } = await supabase.from('push_subscriptions').upsert(
    {
      user_id: user.id,
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    },
    { onConflict: 'endpoint' }
  )

  return error ? { error: error.message } : { success: true as const }
}

export async function unsubscribePush(endpoint: string) {
  const supabase = await createClient()
  await supabase.from('push_subscriptions').delete().eq('endpoint', endpoint)
  return { success: true as const }
}

export interface FeedbackFormState {
  success?: boolean
  message?: string
}

export async function submitFeedback(_state: FeedbackFormState, formData: FormData): Promise<FeedbackFormState> {
  const message = formData.get('message')

  if (typeof message !== 'string' || message.trim().length < 5) {
    return { message: 'Tulis kritik/saran minimal 5 karakter.' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { message: 'Sesi kamu berakhir, silakan login ulang.' }
  }

  const { error } = await supabase.from('feedback').insert({ user_id: user.id, message: message.trim() })

  if (error) {
    return { message: 'Gagal mengirim. Coba lagi ya.' }
  }

  return { success: true, message: 'Terima kasih! Kritik/saran kamu sudah terkirim.' }
}
