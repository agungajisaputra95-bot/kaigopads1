import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { getCachedUser } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCachedUser()

  const displayName = user?.user_metadata?.full_name || user?.email || ''

  return (
    <div className="flex min-h-screen flex-col bg-[#ECEFF1] md:flex-row">
      <AdminSidebar adminName={displayName} />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  )
}
