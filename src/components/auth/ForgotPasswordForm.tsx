'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { requestPasswordReset } from '@/app/(auth)/actions'

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, undefined)

  if (state?.success) {
    return (
      <div className="flex flex-col gap-3 text-center">
        <div className="text-3xl">📬</div>
        <h1 className="text-xl font-extrabold text-[#263238]">Cek Email Kamu</h1>
        <p className="text-sm text-[#78909C]">{state.message}</p>
        <Link
          href="/login"
          className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-[#1565C0] text-sm font-bold text-white"
        >
          Ke Halaman Masuk
        </Link>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-extrabold text-[#263238]">Lupa Kata Sandi</h1>
        <p className="mt-1 text-sm text-[#78909C]">
          Masukkan email akun kamu, nanti kami kirim link untuk buat password baru.
        </p>
      </div>

      {state?.message && (
        <div className="rounded-lg bg-[#E53935]/10 p-3 text-xs font-medium text-[#C62828]">{state.message}</div>
      )}

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-bold text-[#78909C]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="h-11 w-full rounded-lg border border-[#CFD8DC] px-3 text-sm text-[#263238]"
          placeholder="kamu@email.com"
        />
        {state?.errors?.email && <p className="mt-1 text-xs text-[#E53935]">{state.errors.email[0]}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-1 h-11 w-full rounded-xl bg-[#1565C0] text-sm font-bold text-white disabled:opacity-60"
      >
        {pending ? 'Mengirim…' : 'Kirim Link Reset'}
      </button>

      <p className="text-center text-xs text-[#90A4AE]">
        Ingat password?{' '}
        <Link href="/login" className="font-bold text-[#1565C0]">
          Masuk
        </Link>
      </p>
    </form>
  )
}
