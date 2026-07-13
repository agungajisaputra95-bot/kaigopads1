'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import {
  EditProfileSchema,
  ChangePasswordSchema,
  type EditProfileFormState,
  type ChangePasswordFormState,
} from '@/lib/validations/auth'

export async function updateProfile(_state: EditProfileFormState, formData: FormData): Promise<EditProfileFormState> {
  const validated = EditProfileSchema.safeParse({
    name: formData.get('name'),
    whatsapp: formData.get('whatsapp'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { message: 'Sesi kamu berakhir, silakan login ulang.' }

  const { error } = await supabase.auth.updateUser({
    data: { full_name: validated.data.name, whatsapp: validated.data.whatsapp },
  })

  if (error) return { message: error.message }

  revalidatePath('/profile')
  return { success: true, message: 'Profil berhasil diperbarui.' }
}

export async function changePassword(
  _state: ChangePasswordFormState,
  formData: FormData
): Promise<ChangePasswordFormState> {
  const validated = ChangePasswordSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) return { message: 'Sesi kamu berakhir, silakan login ulang.' }

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: validated.data.currentPassword,
  })

  if (verifyError) {
    return { errors: { currentPassword: ['Password saat ini salah.'] } }
  }

  const { error } = await supabase.auth.updateUser({ password: validated.data.password })

  if (error) return { message: error.message }

  return { success: true, message: 'Password berhasil diganti.' }
}

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
