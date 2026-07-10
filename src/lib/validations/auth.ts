import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.email({ error: 'Masukkan email yang valid.' }),
  password: z.string().min(1, { error: 'Password wajib diisi.' }),
})

export const RegisterSchema = z
  .object({
    name: z.string().min(2, { error: 'Nama minimal 2 karakter.' }).trim(),
    email: z.email({ error: 'Masukkan email yang valid.' }),
    password: z
      .string()
      .min(8, { error: 'Password minimal 8 karakter.' })
      .regex(/[a-zA-Z]/, { error: 'Password harus mengandung huruf.' })
      .regex(/[0-9]/, { error: 'Password harus mengandung angka.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Konfirmasi password tidak cocok.',
    path: ['confirmPassword'],
  })

export type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type RegisterFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        confirmPassword?: string[]
      }
      message?: string
      success?: boolean
    }
  | undefined

export const ForgotPasswordSchema = z.object({
  email: z.email({ error: 'Masukkan email yang valid.' }),
})

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { error: 'Password minimal 8 karakter.' })
      .regex(/[a-zA-Z]/, { error: 'Password harus mengandung huruf.' })
      .regex(/[0-9]/, { error: 'Password harus mengandung angka.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Konfirmasi password tidak cocok.',
    path: ['confirmPassword'],
  })

export type ForgotPasswordFormState =
  | {
      errors?: { email?: string[] }
      message?: string
      success?: boolean
    }
  | undefined

export type ResetPasswordFormState =
  | {
      errors?: { password?: string[]; confirmPassword?: string[] }
      message?: string
      success?: boolean
    }
  | undefined
