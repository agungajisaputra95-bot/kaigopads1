'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, BarChart3, User } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/study', label: 'Study', icon: BookOpen },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="sticky bottom-0 z-30 flex border-t border-[#37474F]/[0.08] bg-white px-1 pb-2.5 pt-2 shadow-[0_-2px_12px_rgba(55,71,79,0.06)]">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href)
        const color = active ? '#1565C0' : '#90A4AE'
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center gap-0.5"
          >
            <Icon size={22} color={color} strokeWidth={active ? 2.2 : 2} />
            <span className="text-[10px]" style={{ color, fontWeight: active ? 700 : 500 }}>
              {label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
