'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LoginSchema, RegisterSchema, type LoginFormState, type RegisterFormState } from '@/lib/validations/auth'

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
