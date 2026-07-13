import Link from 'next/link'
import { ChevronRight, CircleHelp, History, KeyRound, UserPen } from 'lucide-react'

const LINKS = [
  { href: '/profile/edit', label: 'Edit Profil', description: 'Ubah nama dan nomor WhatsApp', icon: UserPen },
  { href: '/profile/change-password', label: 'Ganti Password', description: 'Perbarui password akun kamu', icon: KeyRound },
  { href: '/profile/payment-history', label: 'Riwayat Pembayaran', description: 'Histori konfirmasi Premium kamu', icon: History },
  { href: '/profile/help', label: 'Bantuan & FAQ', description: 'Pertanyaan umum & hubungi CS', icon: CircleHelp },
]

export function AccountLinksCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      {LINKS.map(({ href, label, description, icon: Icon }, i) => (
        <Link
          key={href}
          href={href}
          className={`flex w-full items-center gap-3 p-4 ${i > 0 ? 'border-t border-[#ECEFF1]' : ''}`}
        >
          <Icon size={18} className="text-[#546E7A]" />
          <div className="flex-1 text-left">
            <div className="text-[13px] font-bold text-[#263238]">{label}</div>
            <div className="mt-0.5 text-xs text-[#90A4AE]">{description}</div>
          </div>
          <ChevronRight size={16} className="text-[#B0BEC5]" />
        </Link>
      ))}
    </div>
  )
}
