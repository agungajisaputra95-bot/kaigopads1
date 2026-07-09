import { Crown, MessageCircle, Plus } from 'lucide-react'
import { FuriganaText } from '@/components/ui/FuriganaText'
import type { FuriganaMapEntry } from '@/types/question'

const PREMIUM_BENEFITS = [
  'Akses semua 13 kamoku (materi + latihan)',
  'Mock exam tanpa batas',
  'Prioritas weak question & kosakata',
  'Analytics lengkap (tren skor, mastery matrix)',
  'Reminder pengingat belajar',
]

interface PaywallKamoku {
  nameJp: string
  furiganaMap: FuriganaMapEntry[]
}

interface MembershipCardProps {
  isPremium: boolean
  premiumUntil?: string
  paywallKamoku?: PaywallKamoku | null
  whatsappHref: string
}

export function MembershipCard({ isPremium, premiumUntil, paywallKamoku, whatsappHref }: MembershipCardProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {paywallKamoku && !isPremium && (
        <div className="rounded-xl border-l-4 border-[#FB8C00] bg-[#FB8C00]/[0.09] p-3.5">
          <div className="text-[13px] font-bold text-[#E65100]">🔒 Kamoku ini butuh Premium</div>
          <div className="jp mt-1 text-xs text-[#8D6E43]">
            <FuriganaText text={paywallKamoku.nameJp} furiganaMap={paywallKamoku.furiganaMap} /> termasuk materi
            Premium — upgrade untuk membukanya.
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        <div className="flex items-center gap-2">
          <Crown size={18} color={isPremium ? '#FB8C00' : '#B0BEC5'} />
          <span className="text-[15px] font-bold text-[#263238]">
            {isPremium ? 'Premium' : 'Free Tier'}
          </span>
          {isPremium && premiumUntil && (
            <span className="ml-auto text-xs text-[#78909C]">Aktif hingga {premiumUntil}</span>
          )}
        </div>

        {!isPremium && (
          <>
            <div className="mt-1 text-xs text-[#78909C]">
              Akses 2 dari 13 kamoku, 1 mock exam/minggu, tanpa analytics.
            </div>
            <div className="mt-3 flex flex-col gap-1.5">
              {PREMIUM_BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-xs text-[#455A64]">
                  <Plus size={14} className="shrink-0 text-[#FB8C00]" />
                  {benefit}
                </div>
              ))}
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#43A047] text-sm font-bold text-white"
            >
              <MessageCircle size={16} />
              Upgrade via WhatsApp
            </a>
          </>
        )}
      </div>
    </div>
  )
}
