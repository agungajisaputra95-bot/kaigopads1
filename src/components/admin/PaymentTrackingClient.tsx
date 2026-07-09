'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { confirmPayment, revokePremium } from '@/app/admin/users/payment/actions'
import type { UserPaymentRow } from '@/lib/queries/payments'

const DURATION_OPTIONS = [
  { months: 1, label: '1 bln' },
  { months: 3, label: '3 bln' },
  { months: 12, label: '12 bln' },
]

function formatDate(iso: string | null) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function PaymentTrackingClient({ users }: { users: UserPaymentRow[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pendingUserId, setPendingUserId] = useState<string | null>(null)

  function handleConfirm(userId: string, months: number) {
    setPendingUserId(userId)
    startTransition(async () => {
      await confirmPayment(userId, months)
      router.refresh()
      setPendingUserId(null)
    })
  }

  function handleRevoke(userId: string) {
    setPendingUserId(userId)
    startTransition(async () => {
      await revokePremium(userId)
      router.refresh()
      setPendingUserId(null)
    })
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-[#ECEFF1] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-[#90A4AE]">
        <span>User</span>
        <span>Terdaftar</span>
        <span>Status</span>
        <span>Aksi</span>
      </div>
      {users.length === 0 && <div className="p-6 text-center text-sm text-[#90A4AE]">Belum ada user.</div>}
      {users.map((u) => {
        const rowPending = isPending && pendingUserId === u.id
        return (
          <div
            key={u.id}
            className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-t border-[#ECEFF1] px-5 py-3"
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-[#263238]">{u.name ?? u.email}</div>
              {u.name && <div className="truncate text-xs text-[#90A4AE]">{u.email}</div>}
            </div>
            <span className="whitespace-nowrap text-xs text-[#90A4AE]">{formatDate(u.createdAt)}</span>
            <div className="whitespace-nowrap">
              {u.isPremium ? (
                <span className="rounded-full bg-[#FB8C00]/[0.12] px-2.5 py-1 text-[11px] font-bold text-[#E65100]">
                  Premium · s/d {formatDate(u.premiumUntil)}
                </span>
              ) : (
                <span className="rounded-full bg-[#ECEFF1] px-2.5 py-1 text-[11px] font-bold text-[#78909C]">
                  Free
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {u.isPremium ? (
                <button
                  type="button"
                  disabled={rowPending}
                  onClick={() => handleRevoke(u.id)}
                  className="h-8 rounded-lg border border-[#E53935]/40 bg-[#E53935]/[0.06] px-3 text-xs font-bold text-[#C62828] disabled:opacity-50"
                >
                  {rowPending ? '…' : 'Cabut'}
                </button>
              ) : (
                DURATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.months}
                    type="button"
                    disabled={rowPending}
                    onClick={() => handleConfirm(u.id, opt.months)}
                    className="h-8 rounded-lg bg-[#1565C0]/10 px-2.5 text-xs font-bold text-[#1565C0] disabled:opacity-50"
                  >
                    {rowPending ? '…' : opt.label}
                  </button>
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
