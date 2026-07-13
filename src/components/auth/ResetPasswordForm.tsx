'use client'

import { useActionState, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { updatePassword } from '@/app/(auth)/actions'

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(updatePassword, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-extrabold text-[#263238]">Buat Password Baru</h1>
        <p className="mt-1 text-sm text-[#78909C]">Masukkan password baru untuk akun kamu.</p>
      </div>

      {state?.message && (
        <div className="rounded-lg bg-[#E53935]/10 p-3 text-xs font-medium text-[#C62828]">{state.message}</div>
      )}

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
          Konfirmasi Password
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
        className="mt-1 h-11 w-full rounded-xl bg-[#1565C0] text-sm font-bold text-white disabled:opacity-60"
      >
        {pending ? 'Menyimpan…' : 'Simpan Password Baru'}
      </button>
    </form>
  )
}
