'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { ArrowLeft, TriangleAlert } from 'lucide-react'
import { deleteAccount } from '@/app/(main)/profile/actions'

export function DeleteAccountForm() {
  const [state, formAction, pending] = useActionState(deleteAccount, undefined)

  return (
    <div className="flex flex-col gap-3.5">
      <Link href="/profile" className="flex items-center gap-1.5 text-xs font-bold text-[#1565C0]">
        <ArrowLeft size={14} /> Kembali ke Profil
      </Link>

      <div className="rounded-2xl border-l-4 border-[#E53935] bg-[#E53935]/[0.06] p-4">
        <div className="flex items-center gap-2 text-[#C62828]">
          <TriangleAlert size={18} />
          <span className="text-sm font-bold">Aksi ini tidak bisa dibatalkan</span>
        </div>
        <p className="mt-1.5 text-xs text-[#78909C]">
          Semua progress belajar, riwayat mock exam, status premium, dan data akun kamu akan dihapus permanen.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        {state?.message && <div className="rounded-lg bg-[#E53935]/10 p-3 text-xs font-medium text-[#C62828]">{state.message}</div>}

        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-bold text-[#78909C]">
            Konfirmasi Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="h-11 w-full rounded-lg border border-[#CFD8DC] px-3 text-sm text-[#263238]"
          />
          {state?.errors?.password && <p className="mt-1 text-xs text-[#E53935]">{state.errors.password[0]}</p>}
        </div>

        <div>
          <label htmlFor="confirmText" className="mb-1.5 block text-xs font-bold text-[#78909C]">
            Ketik <span className="font-mono text-[#E53935]">HAPUS</span> untuk konfirmasi
          </label>
          <input
            id="confirmText"
            name="confirmText"
            type="text"
            className="h-11 w-full rounded-lg border border-[#CFD8DC] px-3 text-sm text-[#263238]"
            placeholder="HAPUS"
          />
          {state?.errors?.confirmText && <p className="mt-1 text-xs text-[#E53935]">{state.errors.confirmText[0]}</p>}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="h-11 w-full rounded-xl bg-[#E53935] text-sm font-bold text-white disabled:opacity-60"
        >
          {pending ? 'Menghapus…' : 'Hapus Akun Saya'}
        </button>
      </form>
    </div>
  )
}
