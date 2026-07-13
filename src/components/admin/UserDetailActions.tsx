'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { confirmPayment, revokePremium } from '@/app/admin/users/actions'

const DURATION_OPTIONS = [
  { months: 1, label: '1 bln' },
  { months: 3, label: '3 bln' },
  { months: 12, label: '12 bln' },
]

function formatDate(iso: string | null) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function UserDetailActions({
  userId,
  isPremium,
  premiumUntil,
}: {
  userId: string
  isPremium: boolean
  premiumUntil: string | null
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [referenceNote, setReferenceNote] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleConfirm(months: number) {
    if (!referenceNote.trim()) {
      setError('Isi catatan referensi pembayaran dulu (nominal/metode/waktu transfer).')
      return
    }
    setError(null)
    startTransition(async () => {
      await confirmPayment(userId, months, referenceNote)
      setReferenceNote('')
      router.refresh()
    })
  }

  function handleRevoke() {
    startTransition(async () => {
      await revokePremium(userId)
      router.refresh()
    })
  }

  return (
    <div className="flex shrink-0 flex-col items-end gap-2">
      {isPremium ? (
        <span className="rounded-full bg-[#FB8C00]/[0.12] px-2.5 py-1 text-[11px] font-bold text-[#E65100]">
          Premium · s/d {formatDate(premiumUntil)}
        </span>
      ) : (
        <span className="rounded-full bg-[#ECEFF1] px-2.5 py-1 text-[11px] font-bold text-[#78909C]">Free</span>
      )}
      {!isPremium && (
        <input
          type="text"
          value={referenceNote}
          onChange={(e) => setReferenceNote(e.target.value)}
          placeholder="Catatan referensi transfer (nominal/metode/waktu)…"
          className="h-8 w-56 rounded-lg border border-[#CFD8DC] px-2.5 text-xs text-[#263238] placeholder:text-[#B0BEC5]"
        />
      )}
      {error && <p className="text-[11px] font-medium text-[#E53935]">{error}</p>}

      <div className="flex items-center gap-1.5">
        {isPremium ? (
          <button
            type="button"
            disabled={isPending}
            onClick={handleRevoke}
            className="h-8 rounded-lg border border-[#E53935]/40 bg-[#E53935]/[0.06] px-3 text-xs font-bold text-[#C62828] disabled:opacity-50"
          >
            {isPending ? '…' : 'Cabut Premium'}
          </button>
        ) : (
          DURATION_OPTIONS.map((opt) => (
            <button
              key={opt.months}
              type="button"
              disabled={isPending}
              onClick={() => handleConfirm(opt.months)}
              className="h-8 rounded-lg bg-[#1565C0]/10 px-2.5 text-xs font-bold text-[#1565C0] disabled:opacity-50"
            >
              {isPending ? '…' : opt.label}
            </button>
          ))
        )}
      </div>
    </div>
  )
}
