import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const displayName = user?.user_metadata?.full_name || user?.email || ''

  return (
    <div className="flex min-h-screen bg-[#ECEFF1]">
      <AdminSidebar adminName={displayName} />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  )
}
