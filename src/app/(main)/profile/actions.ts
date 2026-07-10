'use server'

import { createClient } from '@/lib/supabase/server'

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
