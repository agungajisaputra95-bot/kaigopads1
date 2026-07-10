'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import {
  LoginSchema,
  RegisterSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  type LoginFormState,
  type RegisterFormState,
  type ForgotPasswordFormState,
  type ResetPasswordFormState,
} from '@/lib/validations/auth'

async function getOrigin() {
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host')
  const protocol = h.get('x-forwarded-proto') ?? 'https'
  return `${protocol}://${host}`
}

export async function login(_state: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const validated = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(validated.data)

  if (error) {
    return { message: error.message === 'Invalid login credentials' ? 'Email atau password salah.' : error.message }
  }

  redirect('/dashboard')
}

export async function register(_state: RegisterFormState, formData: FormData): Promise<RegisterFormState> {
  const validated = RegisterSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email: validated.data.email,
    password: validated.data.password,
    options: { data: { full_name: validated.data.name } },
  })

  if (error) {
    return { message: error.message }
  }

  return { success: true, message: 'Akun berhasil dibuat. Cek email kamu untuk konfirmasi sebelum login.' }
}

export async function requestPasswordReset(
  _state: ForgotPasswordFormState,
  formData: FormData
): Promise<ForgotPasswordFormState> {
  const validated = ForgotPasswordSchema.safeParse({
    email: formData.get('email'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const origin = await getOrigin()

  await supabase.auth.resetPasswordForEmail(validated.data.email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  })

  // Selalu tampilkan pesan sukses yang sama, meskipun email tidak terdaftar,
  // supaya tidak bisa dipakai untuk mengecek email mana yang punya akun (enumeration).
  return {
    success: true,
    message: 'Kalau email itu terdaftar, kami sudah kirim link untuk reset password. Cek inbox kamu.',
  }
}

export async function updatePassword(
  _state: ResetPasswordFormState,
  formData: FormData
): Promise<ResetPasswordFormState> {
  const validated = ResetPasswordSchema.safeParse({
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

  if (!user) {
    return { message: 'Link reset password sudah tidak berlaku. Minta link baru ya.' }
  }

  const { error } = await supabase.auth.updateUser({ password: validated.data.password })

  if (error) {
    return { message: error.message }
  }

  redirect('/dashboard')
}
