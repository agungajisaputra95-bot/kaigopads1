import { FuriganaProvider } from '@/components/ui/FuriganaText'
import { MainChrome } from '@/components/ui/MainChrome'
import { getCachedUser } from '@/lib/supabase/server'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const user = await getCachedUser()

  const displayName = user?.user_metadata?.full_name || user?.email || ''
  const userInitial = displayName.trim().charAt(0).toUpperCase() || 'K'

  return (
    <FuriganaProvider>
      <MainChrome userInitial={userInitial}>{children}</MainChrome>
    </FuriganaProvider>
  )
}
