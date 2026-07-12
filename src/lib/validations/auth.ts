import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.email({ error: 'Masukkan email yang valid.' }),
  password: z.string().min(1, { error: 'Password wajib diisi.' }),
})

// Nomor HP Indonesia (08xx / +62 / 62) atau Jepang (070·080·090 / +81 / 81), tanpa spasi/strip.
const ID_PHONE = /^(\+62|62|0)8[1-9][0-9]{6,10}$/
const JP_PHONE = /^(\+81|81|0)[789]0[0-9]{7,8}$/

export const RegisterSchema = z
  .object({
    name: z.string().min(2, { error: 'Nama minimal 2 karakter.' }).trim(),
    email: z.email({ error: 'Masukkan email yang valid.' }),
    whatsapp: z
      .string()
      .trim()
      .min(1, { error: 'Nomor WhatsApp wajib diisi.' })
      .transform((v) => v.replace(/[\s-()]/g, ''))
      .refine((v) => ID_PHONE.test(v) || JP_PHONE.test(v), {
        error: 'Masukkan nomor WhatsApp Indonesia (08xx / +62) atau Jepang (070/080/090 / +81) yang valid.',
      }),
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
        whatsapp?: string[]
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
