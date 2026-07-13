import { getUserAdminOverview } from '@/lib/queries/users'
import { UserManagementClient } from '@/components/admin/UserManagementClient'
import { daysUntilIso } from '@/lib/utils'

export default async function UsersPage() {
  const users = await getUserAdminOverview()
  const premiumCount = users.filter((u) => u.isPremium).length
  const activeCount = users.filter((u) => u.totalAnswered > 0).length
  const expiringSoonCount = users.filter(
    (u) => u.isPremium && u.premiumUntil && daysUntilIso(u.premiumUntil) <= 7
  ).length

  return (
    <>
      <div className="border-b border-[#37474F]/[0.08] bg-white px-7 py-4">
        <div className="text-xs text-[#90A4AE]">Users</div>
        <div className="mt-0.5 text-xl font-extrabold text-[#263238]">Users & Pembayaran</div>
        <div className="mt-0.5 text-[13px] text-[#78909C]">
          Progress belajar, aktivitas, dan status premium semua user terdaftar.
        </div>
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
          {expiringSoonCount > 0 && (
            <span className="rounded-full bg-[#E53935]/[0.12] px-2.5 py-1 text-xs font-bold text-[#C62828]">
              ⚠ {expiringSoonCount} premium habis ≤7 hari
            </span>
          )}
        </div>

        <UserManagementClient users={users} />
      </div>
    </>
  )
}
