'use client'

import { useActionState, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { changePassword } from '@/app/(main)/profile/actions'

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, undefined)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      const timeout = setTimeout(() => router.push('/profile'), 1200)
      return () => clearTimeout(timeout)
    }
  }, [state?.success, router])

  return (
    <div className="flex flex-col gap-3.5">
      <Link href="/profile" className="flex items-center gap-1.5 text-xs font-bold text-[#1565C0]">
        <ArrowLeft size={14} /> Kembali ke Profil
      </Link>

      <form action={formAction} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        <div>
          <h1 className="text-lg font-extrabold text-[#263238]">Ganti Password</h1>
          <p className="mt-1 text-xs text-[#78909C]">Masukkan password saat ini, lalu password baru kamu.</p>
        </div>

        {state?.message && (
          <div
            className={`rounded-lg p-3 text-xs font-medium ${
              state.success ? 'bg-[#43A047]/10 text-[#2E7D32]' : 'bg-[#E53935]/10 text-[#C62828]'
            }`}
          >
            {state.message}
          </div>
        )}

        <div>
          <label htmlFor="currentPassword" className="mb-1.5 block text-xs font-bold text-[#78909C]">
            Password Saat Ini
          </label>
          <div className="relative">
            <input
              id="currentPassword"
              name="currentPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              className="h-11 w-full rounded-lg border border-[#CFD8DC] px-3 pr-10 text-sm text-[#263238]"
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
          {state?.errors?.currentPassword && (
            <p className="mt-1 text-xs text-[#E53935]">{state.errors.currentPassword[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-bold text-[#78909C]">
            Password Baru
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="h-11 w-full rounded-lg border border-[#CFD8DC] px-3 pr-10 text-sm text-[#263238]"
              placeholder="Minimal 8 karakter"
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
          {state?.errors?.password && (
            <ul className="mt-1 list-inside list-disc text-xs text-[#E53935]">
              {state.errors.password.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-xs font-bold text-[#78909C]">
            Konfirmasi Password Baru
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="h-11 w-full rounded-lg border border-[#CFD8DC] px-3 pr-10 text-sm text-[#263238]"
              placeholder="Ulangi password baru"
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
          {state?.errors?.confirmPassword && (
            <p className="mt-1 text-xs text-[#E53935]">{state.errors.confirmPassword[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="h-11 w-full rounded-xl bg-[#1565C0] text-sm font-bold text-white disabled:opacity-60"
        >
          {pending ? 'Menyimpan…' : 'Ganti Password'}
        </button>
      </form>
    </div>
  )
}
