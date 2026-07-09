import { getUserAnalytics } from '@/lib/queries/users'

function formatDate(iso: string | null) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function UserAnalyticsPage() {
  const users = await getUserAnalytics()
  const premiumCount = users.filter((u) => u.isPremium).length
  const activeCount = users.filter((u) => u.totalAnswered > 0).length

  return (
    <>
      <div className="border-b border-[#37474F]/[0.08] bg-white px-7 py-4">
        <div className="text-xs text-[#90A4AE]">Users</div>
        <div className="mt-0.5 text-xl font-extrabold text-[#263238]">User Analytics</div>
        <div className="mt-0.5 text-[13px] text-[#78909C]">Progress belajar & aktivitas semua user terdaftar.</div>
      </div>

      <div className="flex-1 px-7 py-5">
        <div className="mb-4 flex items-center gap-3 text-sm">
          <span className="font-bold text-[#263238]">{users.length} user</span>
          <span className="rounded-full bg-[#43A047]/[0.12] px-2.5 py-1 text-xs font-bold text-[#2E7D32]">
            {activeCount} sudah mulai belajar
          </span>
          <span className="rounded-full bg-[#FB8C00]/[0.12] px-2.5 py-1 text-xs font-bold text-[#E65100]">
            {premiumCount} premium
          </span>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
          <div className="grid grid-cols-[1.5fr_auto_auto_auto_auto_auto] gap-4 border-b border-[#ECEFF1] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-[#90A4AE]">
            <span>User</span>
            <span className="text-right">Soal</span>
            <span className="text-right">Akurasi</span>
            <span className="text-right">Mock Exam</span>
            <span>Terakhir Aktif</span>
            <span>Status</span>
          </div>
          {users.length === 0 && <div className="p-6 text-center text-sm text-[#90A4AE]">Belum ada user.</div>}
          {users.map((u) => (
            <div
              key={u.id}
              className="grid grid-cols-[1.5fr_auto_auto_auto_auto_auto] items-center gap-4 border-t border-[#ECEFF1] px-5 py-3"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-bold text-[#263238]">{u.name ?? u.email}</div>
                {u.name && <div className="truncate text-xs text-[#90A4AE]">{u.email}</div>}
              </div>
              <span className="text-right font-mono text-sm text-[#37474F]">{u.totalAnswered}</span>
              <span className="text-right font-mono text-sm text-[#37474F]">
                {u.accuracyPct !== null ? `${u.accuracyPct}%` : '-'}
              </span>
              <span className="text-right font-mono text-sm text-[#37474F]">{u.examAttemptsCount}</span>
              <span className="whitespace-nowrap text-xs text-[#90A4AE]">{formatDate(u.lastActiveAt)}</span>
              <span>
                {u.isPremium ? (
                  <span className="rounded-full bg-[#FB8C00]/[0.12] px-2 py-0.5 text-[10px] font-bold text-[#E65100]">
                    Premium
                  </span>
                ) : (
                  <span className="rounded-full bg-[#ECEFF1] px-2 py-0.5 text-[10px] font-bold text-[#78909C]">
                    Free
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
