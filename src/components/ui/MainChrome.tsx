'use client'

import { usePathname } from 'next/navigation'
import { AppHeader } from '@/components/ui/AppHeader'
import { BottomNav } from '@/components/ui/BottomNav'

// Rute sesi belajar terfokus (practice/materi/mock-exam) pakai header sendiri
// dan menyembunyikan bottom nav supaya tidak ada distraksi/navigasi tak sengaja.
const FOCUSED_ROUTE_PATTERNS = [
  /^\/study\/[^/]+\/practice/,
  /^\/study\/[^/]+\/materi/,
  /^\/study\/mock-exam/,
  /^\/onboarding/,
]

// Rute yang punya header sendiri (judul halaman + kontrol khusus) tapi tetap
// menampilkan bottom nav karena masih salah satu tab utama.
const CUSTOM_HEADER_ROUTE_PATTERNS = [/^\/analytics/]

export function MainChrome({
  children,
  userInitial,
}: {
  children: React.ReactNode
  userInitial?: string
}) {
  const pathname = usePathname()
  const isFocused = FOCUSED_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname))
  const hasCustomHeader = CUSTOM_HEADER_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname))

  if (isFocused) {
    return (
      <div className="flex min-h-screen justify-center bg-[#ECEFF1]">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen justify-center bg-[#ECEFF1]">
      <div className="flex min-h-screen w-full max-w-sm flex-col">
        {!hasCustomHeader && <AppHeader userInitial={userInitial} />}
        <main className={hasCustomHeader ? 'flex flex-1 flex-col' : 'flex flex-1 flex-col gap-3.5 px-4 pb-6 pt-4'}>
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
