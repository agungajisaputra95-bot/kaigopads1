'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { MembershipCard } from '@/components/profile/MembershipCard'
import { SettingsList } from '@/components/profile/SettingsList'
import { createClient } from '@/lib/supabase/client'
import { buildWhatsappUpgradeLink } from '@/lib/constants'
import type { FuriganaMapEntry } from '@/types/question'

interface ProfileClientProps {
  name: string
  email: string
  isPremium: boolean
  premiumUntil?: string
  isAdmin: boolean
  paywallKamoku: { nameJp: string; furiganaMap: FuriganaMapEntry[] } | null
}

export function ProfileClient({ name, email, isPremium, premiumUntil, isAdmin, paywallKamoku }: ProfileClientProps) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const whatsappHref = buildWhatsappUpgradeLink(
    paywallKamoku
      ? `Halo, saya mau upgrade ke Premium KaigoPads untuk buka kamoku ${paywallKamoku.nameJp}.`
      : 'Halo, saya mau upgrade ke Premium KaigoPads.'
  )

  return (
    <div className="flex flex-col gap-3.5">
      <ProfileHeader name={name} email={email} avatarInitial={name.charAt(0).toUpperCase()} />

      <MembershipCard
        isPremium={isPremium}
        premiumUntil={premiumUntil}
        paywallKamoku={paywallKamoku}
        whatsappHref={whatsappHref}
      />

      {isAdmin && (
        <Link
          href="/admin"
          className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]"
        >
          <ShieldCheck size={18} className="text-[#1565C0]" />
          <div className="flex-1 text-left">
            <div className="text-[13px] font-bold text-[#263238]">Admin Panel</div>
            <div className="mt-0.5 text-xs text-[#90A4AE]">Kelola soal, materi, dan user</div>
          </div>
        </Link>
      )}

      <SettingsList onLogout={handleLogout} />
    </div>
  )
}
