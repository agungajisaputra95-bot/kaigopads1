'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutGrid, PenLine, Upload, ListTree, Users, MessageSquareText, Menu, X } from 'lucide-react'

const MENU = [
  { href: '/admin', label: 'Dashboard', icon: LayoutGrid },
  { href: '/admin/questions', label: 'Question Editor', icon: PenLine },
  { href: '/admin/import', label: 'Bulk Import', icon: Upload },
  { href: '/admin/kamoku', label: 'Manajemen Kamoku', icon: ListTree },
  { href: '/admin/users', label: 'Users & Pembayaran', icon: Users },
  { href: '/admin/feedback', label: 'Kritik & Saran', icon: MessageSquareText },
]

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col">
      {MENU.map(({ href, label, icon: Icon }) => {
        const active = href === '/admin' ? pathname === href : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className="mx-3 my-px flex items-center gap-3 rounded-[9px] px-5 py-2.5"
            style={{
              color: active ? '#fff' : '#B0BEC5',
              background: active ? '#1565C0' : 'transparent',
              boxShadow: active ? '0 2px 8px rgba(21,101,192,0.4)' : 'none',
            }}
          >
            <Icon size={16} className="w-[18px] shrink-0" />
            <span className="text-[13.5px]" style={{ fontWeight: active ? 700 : 500 }}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

function SidebarFooter({ adminName, initial }: { adminName: string; initial: string }) {
  return (
    <div className="mx-3 flex items-center gap-2.5 border-t border-white/[0.08] px-2 pt-3.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#455A64] text-[13px] font-bold">
        {initial}
      </div>
      <div className="min-w-0">
        <div className="truncate text-xs font-semibold">{adminName || 'Admin'}</div>
        <div className="text-[10px] text-[#78909C]">Content Manager</div>
      </div>
    </div>
  )
}

export function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const initial = adminName.trim().charAt(0).toUpperCase() || 'A'

  return (
    <>
      {/* Mobile top bar + hamburger */}
      <div className="flex items-center justify-between bg-[#263238] px-4 py-3 text-white md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1565C0] text-sm font-extrabold">
            K
          </div>
          <span className="text-sm font-extrabold tracking-tight">KaigoPads CMS</span>
        </div>
        <button type="button" onClick={() => setOpen(true)} aria-label="Buka menu" className="p-1">
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile off-canvas drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="flex w-[240px] shrink-0 flex-col bg-[#263238] py-5 text-white">
            <div className="flex items-center justify-between px-5 pb-[22px]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1565C0] text-base font-extrabold">
                  K
                </div>
                <div>
                  <div className="text-base font-extrabold tracking-tight">KaigoPads</div>
                  <div className="text-[10px] tracking-wide text-[#78909C]">CONTENT CMS</div>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Tutup menu" className="p-1">
                <X size={20} />
              </button>
            </div>
            <div className="px-5 pb-2 text-[10px] font-bold tracking-wide text-[#607D8B]">MENU</div>
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
            <div className="flex-1" />
            <SidebarFooter adminName={adminName} initial={initial} />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden w-[240px] shrink-0 flex-col bg-[#263238] py-5 text-white md:flex">
        <div className="flex items-center gap-2.5 px-5 pb-[22px]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1565C0] text-base font-extrabold">
            K
          </div>
          <div>
            <div className="text-base font-extrabold tracking-tight">KaigoPads</div>
            <div className="text-[10px] tracking-wide text-[#78909C]">CONTENT CMS</div>
          </div>
        </div>

        <div className="px-5 pb-2 text-[10px] font-bold tracking-wide text-[#607D8B]">MENU</div>
        <NavLinks pathname={pathname} />

        <div className="flex-1" />
        <SidebarFooter adminName={adminName} initial={initial} />
      </div>
    </>
  )
}
