'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { login } from '@/app/(auth)/actions'

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-extrabold text-[#263238]">Masuk</h1>
        <p className="mt-1 text-sm text-[#78909C]">Lanjutkan belajar persiapan Kaigo Fukushi Shi kamu.</p>
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

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="password" className="block text-xs font-bold text-[#78909C]">
            Password
          </label>
          <Link href="/forgot-password" className="text-xs font-bold text-[#1565C0]">
            Lupa kata sandi?
          </Link>
        </div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            className="h-11 w-full rounded-lg border border-[#CFD8DC] px-3 pr-10 text-sm text-[#263238]"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-[#90A4AE]"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {state?.errors?.password && <p className="mt-1 text-xs text-[#E53935]">{state.errors.password[0]}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-1 h-11 w-full rounded-xl bg-[#1565C0] text-sm font-bold text-white disabled:opacity-60"
      >
        {pending ? 'Memproses…' : 'Masuk'}
      </button>

      <p className="text-center text-xs text-[#90A4AE]">
        Belum punya akun?{' '}
        <Link href="/register" className="font-bold text-[#1565C0]">
          Daftar
        </Link>
      </p>
    </form>
  )
}
