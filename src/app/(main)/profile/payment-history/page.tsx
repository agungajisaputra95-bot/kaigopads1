import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getCachedUser } from '@/lib/supabase/server'
import { getMyPaymentHistory } from '@/lib/queries/profile'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function PaymentHistoryPage() {
  const user = await getCachedUser()
  if (!user) redirect('/login')

  const history = await getMyPaymentHistory(user.id)

  return (
    <div className="flex flex-col gap-3.5">
      <Link href="/profile" className="flex items-center gap-1.5 text-xs font-bold text-[#1565C0]">
        <ArrowLeft size={14} /> Kembali ke Profil
      </Link>

      <div>
        <h1 className="text-lg font-extrabold text-[#263238]">Riwayat Pembayaran</h1>
        <p className="mt-1 text-xs text-[#78909C]">Histori konfirmasi pembayaran Premium kamu.</p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        {history.length === 0 ? (
          <div className="p-6 text-center text-sm text-[#90A4AE]">Belum ada riwayat pembayaran.</div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 border-t border-[#ECEFF1] p-4 first:border-t-0">
              <div>
                <div className="text-sm font-bold text-[#263238]">Premium {item.months} bulan</div>
                <div className="mt-0.5 text-xs text-[#90A4AE]">Dikonfirmasi {formatDate(item.confirmedAt)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#90A4AE]">Berlaku s/d</div>
                <div className="text-sm font-bold text-[#E65100]">{formatDate(item.premiumUntilAfter)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
