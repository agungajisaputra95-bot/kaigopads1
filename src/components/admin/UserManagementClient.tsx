'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { confirmPayment, revokePremium } from '@/app/admin/users/actions'
import type { UserAdminRow } from '@/lib/queries/users'
import { toWaMeNumber } from '@/lib/utils'

const DURATION_OPTIONS = [
  { months: 1, label: '1 bln' },
  { months: 3, label: '3 bln' },
  { months: 12, label: '12 bln' },
]

const PREMIUM_FILTERS = [
  { value: 'all', label: 'Semua' },
  { value: 'premium', label: 'Premium' },
  { value: 'free', label: 'Free' },
] as const

const ACTIVITY_FILTERS = [
  { value: 'all', label: 'Semua' },
  { value: 'active', label: 'Sudah Belajar' },
  { value: 'inactive', label: 'Belum Belajar' },
] as const

type PremiumFilter = (typeof PREMIUM_FILTERS)[number]['value']
type ActivityFilter = (typeof ACTIVITY_FILTERS)[number]['value']

function formatDate(iso: string | null) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function FilterChips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex items-center gap-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className="h-7 rounded-full px-3 text-xs font-bold"
          style={{
            background: value === opt.value ? '#1565C0' : '#ECEFF1',
            color: value === opt.value ? '#fff' : '#78909C',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function UserManagementClient({ users }: { users: UserAdminRow[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pendingUserId, setPendingUserId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [premiumFilter, setPremiumFilter] = useState<PremiumFilter>('all')
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('all')

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase()
    return users.filter((u) => {
      if (premiumFilter === 'premium' && !u.isPremium) return false
      if (premiumFilter === 'free' && u.isPremium) return false
      if (activityFilter === 'active' && u.totalAnswered === 0) return false
      if (activityFilter === 'inactive' && u.totalAnswered > 0) return false
      if (!q) return true
      return (
        (u.name ?? '').toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.whatsapp ?? '').toLowerCase().includes(q)
      )
    })
  }, [users, query, premiumFilter, activityFilter])

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
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#B0BEC5]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama, email, atau WhatsApp…"
            className="h-9 w-64 rounded-lg border border-[#CFD8DC] bg-white pl-8 pr-3 text-xs text-[#263238] placeholder:text-[#B0BEC5]"
          />
        </div>
        <FilterChips options={PREMIUM_FILTERS} value={premiumFilter} onChange={setPremiumFilter} />
        <FilterChips options={ACTIVITY_FILTERS} value={activityFilter} onChange={setActivityFilter} />
        <span className="ml-auto text-xs font-semibold text-[#90A4AE]">{filteredUsers.length} ditemukan</span>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        <div className="grid min-w-[980px] grid-cols-[1.6fr_auto_auto_auto_auto_auto_auto_auto] gap-4 border-b border-[#ECEFF1] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-[#90A4AE]">
          <span>User</span>
          <span>Terdaftar</span>
          <span className="text-right">Soal</span>
          <span className="text-right">Akurasi</span>
          <span className="text-right">Mock Exam</span>
          <span>Terakhir Aktif</span>
          <span>Status</span>
          <span>Aksi</span>
        </div>
        {filteredUsers.length === 0 && (
          <div className="p-6 text-center text-sm text-[#90A4AE]">Tidak ada user yang cocok.</div>
        )}
        {filteredUsers.map((u) => {
        const rowPending = isPending && pendingUserId === u.id
        return (
          <div
            key={u.id}
            className="grid min-w-[980px] grid-cols-[1.6fr_auto_auto_auto_auto_auto_auto_auto] items-center gap-4 border-t border-[#ECEFF1] px-5 py-3"
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-[#263238]">{u.name ?? u.email}</div>
              {u.name && <div className="truncate text-xs text-[#90A4AE]">{u.email}</div>}
              {u.whatsapp && (
                <a
                  href={`https://wa.me/${toWaMeNumber(u.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-block truncate text-xs font-semibold text-[#25D366]"
                >
                  {u.whatsapp}
                </a>
              )}
            </div>
            <span className="whitespace-nowrap text-xs text-[#90A4AE]">{formatDate(u.createdAt)}</span>
            <span className="text-right font-mono text-sm text-[#37474F]">{u.totalAnswered}</span>
            <span className="text-right font-mono text-sm text-[#37474F]">
              {u.accuracyPct !== null ? `${u.accuracyPct}%` : '-'}
            </span>
            <span className="text-right font-mono text-sm text-[#37474F]">{u.examAttemptsCount}</span>
            <span className="whitespace-nowrap text-xs text-[#90A4AE]">{formatDate(u.lastActiveAt)}</span>
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
    </div>
  )
}
