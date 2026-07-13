'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Download, Search } from 'lucide-react'
import { confirmPayment, revokePremium } from '@/app/admin/users/actions'
import type { UserAdminRow } from '@/lib/queries/users'
import { daysUntilIso, isUserAtRisk, toWaMeNumber } from '@/lib/utils'

const DURATION_OPTIONS = [
  { months: 1, label: '1 bln' },
  { months: 3, label: '3 bln' },
  { months: 12, label: '12 bln' },
]

const PREMIUM_FILTERS = [
  { value: 'all', label: 'Semua' },
  { value: 'premium', label: 'Premium' },
  { value: 'free', label: 'Free' },
  { value: 'expiring', label: 'Habis ≤7 Hari' },
] as const

const ACTIVITY_FILTERS = [
  { value: 'all', label: 'Semua' },
  { value: 'active', label: 'Sudah Belajar' },
  { value: 'inactive', label: 'Belum Belajar' },
  { value: 'at_risk', label: 'At Risk' },
] as const

type PremiumFilter = (typeof PREMIUM_FILTERS)[number]['value']
type ActivityFilter = (typeof ACTIVITY_FILTERS)[number]['value']

type SortKey = 'createdAt' | 'totalAnswered' | 'accuracyPct' | 'examAttemptsCount' | 'lastActiveAt'
type Sort = { key: SortKey; dir: 'asc' | 'desc' }

const PAGE_SIZE = 25

function formatDate(iso: string | null) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function daysLeft(iso: string | null): number | null {
  return iso ? daysUntilIso(iso) : null
}

function toCsv(rows: UserAdminRow[]): string {
  const header = [
    'Nama',
    'Email',
    'WhatsApp',
    'Terdaftar',
    'Soal Dijawab',
    'Akurasi (%)',
    'Mock Exam',
    'Terakhir Aktif',
    'Status Premium',
    'Premium Sampai',
  ]
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`
  const lines = rows.map((u) =>
    [
      u.name ?? '',
      u.email,
      u.whatsapp ?? '',
      u.createdAt,
      String(u.totalAnswered),
      u.accuracyPct !== null ? String(u.accuracyPct) : '',
      String(u.examAttemptsCount),
      u.lastActiveAt ?? '',
      u.isPremium ? 'Premium' : 'Free',
      u.premiumUntil ?? '',
    ]
      .map(escape)
      .join(',')
  )
  return [header.map(escape).join(','), ...lines].join('\n')
}

function downloadCsv(rows: UserAdminRow[]) {
  const csv = toCsv(rows)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `kaigopads-users-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function SortableHeader({
  label,
  active,
  dir,
  onClick,
  align = 'left',
}: {
  label: string
  active: boolean
  dir: 'asc' | 'desc'
  onClick: () => void
  align?: 'left' | 'right'
}) {
  const Icon = active ? (dir === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1"
      style={{ justifyContent: align === 'right' ? 'flex-end' : 'flex-start', color: active ? '#1565C0' : undefined }}
    >
      <span>{label}</span>
      <Icon size={11} />
    </button>
  )
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
  const [sort, setSort] = useState<Sort | null>(null)
  const [page, setPage] = useState(1)

  function updateQuery(v: string) {
    setQuery(v)
    setPage(1)
  }

  function updatePremiumFilter(v: PremiumFilter) {
    setPremiumFilter(v)
    setPage(1)
  }

  function updateActivityFilter(v: ActivityFilter) {
    setActivityFilter(v)
    setPage(1)
  }

  function handleSort(key: SortKey) {
    setSort((prev) => (prev?.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' }))
    setPage(1)
  }

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = users.filter((u) => {
      if (premiumFilter === 'premium' && !u.isPremium) return false
      if (premiumFilter === 'free' && u.isPremium) return false
      if (premiumFilter === 'expiring') {
        const left = daysLeft(u.premiumUntil)
        if (!u.isPremium || left === null || left > 7) return false
      }
      if (activityFilter === 'active' && u.totalAnswered === 0) return false
      if (activityFilter === 'inactive' && u.totalAnswered > 0) return false
      if (activityFilter === 'at_risk' && !isUserAtRisk(u.totalAnswered, u.lastActiveAt)) return false
      if (!q) return true
      return (
        (u.name ?? '').toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.whatsapp ?? '').toLowerCase().includes(q)
      )
    })

    if (!sort) return filtered

    return [...filtered].sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      if (av === null && bv === null) return 0
      if (av === null) return 1
      if (bv === null) return -1
      if (typeof av === 'string' && typeof bv === 'string') {
        return sort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      }
      return sort.dir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number)
    })
  }, [users, query, premiumFilter, activityFilter, sort])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pagedUsers = filteredUsers.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

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
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Cari nama, email, atau WhatsApp…"
            className="h-9 w-64 rounded-lg border border-[#CFD8DC] bg-white pl-8 pr-3 text-xs text-[#263238] placeholder:text-[#B0BEC5]"
          />
        </div>
        <FilterChips options={PREMIUM_FILTERS} value={premiumFilter} onChange={updatePremiumFilter} />
        <FilterChips options={ACTIVITY_FILTERS} value={activityFilter} onChange={updateActivityFilter} />
        <span className="text-xs font-semibold text-[#90A4AE]">{filteredUsers.length} ditemukan</span>
        <button
          type="button"
          onClick={() => downloadCsv(filteredUsers)}
          className="ml-auto flex h-9 items-center gap-1.5 rounded-lg border border-[#CFD8DC] bg-white px-3 text-xs font-bold text-[#37474F]"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        <div className="grid min-w-[980px] grid-cols-[1.6fr_auto_auto_auto_auto_auto_auto_auto] gap-4 border-b border-[#ECEFF1] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-[#90A4AE]">
          <span>User</span>
          <SortableHeader
            label="Terdaftar"
            active={sort?.key === 'createdAt'}
            dir={sort?.key === 'createdAt' ? sort.dir : 'desc'}
            onClick={() => handleSort('createdAt')}
          />
          <SortableHeader
            label="Soal"
            align="right"
            active={sort?.key === 'totalAnswered'}
            dir={sort?.key === 'totalAnswered' ? sort.dir : 'desc'}
            onClick={() => handleSort('totalAnswered')}
          />
          <SortableHeader
            label="Akurasi"
            align="right"
            active={sort?.key === 'accuracyPct'}
            dir={sort?.key === 'accuracyPct' ? sort.dir : 'desc'}
            onClick={() => handleSort('accuracyPct')}
          />
          <SortableHeader
            label="Mock Exam"
            align="right"
            active={sort?.key === 'examAttemptsCount'}
            dir={sort?.key === 'examAttemptsCount' ? sort.dir : 'desc'}
            onClick={() => handleSort('examAttemptsCount')}
          />
          <SortableHeader
            label="Terakhir Aktif"
            active={sort?.key === 'lastActiveAt'}
            dir={sort?.key === 'lastActiveAt' ? sort.dir : 'desc'}
            onClick={() => handleSort('lastActiveAt')}
          />
          <span>Status</span>
          <span>Aksi</span>
        </div>
        {filteredUsers.length === 0 && (
          <div className="p-6 text-center text-sm text-[#90A4AE]">Tidak ada user yang cocok.</div>
        )}
        {pagedUsers.map((u) => {
        const rowPending = isPending && pendingUserId === u.id
        const premiumDaysLeft = u.isPremium ? daysLeft(u.premiumUntil) : null
        const expiringSoon = premiumDaysLeft !== null && premiumDaysLeft <= 7
        return (
          <div
            key={u.id}
            className="grid min-w-[980px] grid-cols-[1.6fr_auto_auto_auto_auto_auto_auto_auto] items-center gap-4 border-t border-[#ECEFF1] px-5 py-3"
          >
            <div className="min-w-0">
              <Link
                href={`/admin/users/${u.id}`}
                className="truncate text-sm font-bold text-[#263238] hover:text-[#1565C0] hover:underline"
              >
                {u.name ?? u.email}
              </Link>
              {u.name && <div className="truncate text-xs text-[#90A4AE]">{u.email}</div>}
              {isUserAtRisk(u.totalAnswered, u.lastActiveAt) && (
                <span className="mt-0.5 inline-block rounded-full bg-[#E53935]/[0.1] px-1.5 py-0.5 text-[10px] font-bold text-[#C62828]">
                  At Risk
                </span>
              )}
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
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                  style={{
                    background: expiringSoon ? 'rgba(229,57,53,0.12)' : 'rgba(251,140,0,0.12)',
                    color: expiringSoon ? '#C62828' : '#E65100',
                  }}
                >
                  {expiringSoon
                    ? `⚠ Habis ${premiumDaysLeft! <= 0 ? 'hari ini' : `${premiumDaysLeft} hari lagi`}`
                    : `Premium · s/d ${formatDate(u.premiumUntil)}`}
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

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-3 text-xs text-[#78909C]">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage(safePage - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#CFD8DC] disabled:opacity-40"
          >
            <ChevronLeft size={14} />
          </button>
          <span>
            Halaman {safePage} dari {totalPages}
          </span>
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setPage(safePage + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#CFD8DC] disabled:opacity-40"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
