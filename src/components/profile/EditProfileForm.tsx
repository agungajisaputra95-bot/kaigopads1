'use client'

import { useActionState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { updateProfile } from '@/app/(main)/profile/actions'

export function EditProfileForm({ initialName, initialWhatsapp }: { initialName: string; initialWhatsapp: string }) {
  const [state, formAction, pending] = useActionState(updateProfile, undefined)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) router.push('/profile')
  }, [state?.success, router])

  return (
    <div className="flex flex-col gap-3.5">
      <Link href="/profile" className="flex items-center gap-1.5 text-xs font-bold text-[#1565C0]">
        <ArrowLeft size={14} /> Kembali ke Profil
      </Link>

      <form action={formAction} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        <div>
          <h1 className="text-lg font-extrabold text-[#263238]">Edit Profil</h1>
          <p className="mt-1 text-xs text-[#78909C]">Ubah nama dan nomor WhatsApp kamu.</p>
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
          <label htmlFor="name" className="mb-1.5 block text-xs font-bold text-[#78909C]">
            Nama
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={initialName}
            className="h-11 w-full rounded-lg border border-[#CFD8DC] px-3 text-sm text-[#263238]"
          />
          {state?.errors?.name && <p className="mt-1 text-xs text-[#E53935]">{state.errors.name[0]}</p>}
        </div>

        <div>
          <label htmlFor="whatsapp" className="mb-1.5 block text-xs font-bold text-[#78909C]">
            Nomor WhatsApp
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            defaultValue={initialWhatsapp}
            className="h-11 w-full rounded-lg border border-[#CFD8DC] px-3 text-sm text-[#263238]"
            placeholder="08xx… (ID) atau 070/080/090… (JP)"
          />
          {state?.errors?.whatsapp && <p className="mt-1 text-xs text-[#E53935]">{state.errors.whatsapp[0]}</p>}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="h-11 w-full rounded-xl bg-[#1565C0] text-sm font-bold text-white disabled:opacity-60"
        >
          {pending ? 'Menyimpan…' : 'Simpan'}
        </button>
      </form>
    </div>
  )
}
