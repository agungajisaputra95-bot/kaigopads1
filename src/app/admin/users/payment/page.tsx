import { PaymentTrackingClient } from '@/components/admin/PaymentTrackingClient'
import { getUsersWithPremiumStatus } from '@/lib/queries/payments'

export default async function PaymentTrackingPage() {
  const users = await getUsersWithPremiumStatus()
  const premiumCount = users.filter((u) => u.isPremium).length

  return (
    <>
      <div className="border-b border-[#37474F]/[0.08] bg-white px-7 py-4">
        <div className="text-xs text-[#90A4AE]">Users</div>
        <div className="mt-0.5 text-xl font-extrabold text-[#263238]">Payment Tracking</div>
        <div className="mt-0.5 text-[13px] text-[#78909C]">
          Konfirmasi manual pembayaran Premium (QRIS via WhatsApp).
        </div>
      </div>

      <div className="flex-1 px-7 py-5">
        <div className="mb-4 flex items-center gap-3 text-sm">
          <span className="font-bold text-[#263238]">{users.length} user terdaftar</span>
          <span className="rounded-full bg-[#FB8C00]/[0.12] px-2.5 py-1 text-xs font-bold text-[#E65100]">
            {premiumCount} premium
          </span>
        </div>

        <PaymentTrackingClient users={users} />
      </div>
    </>
  )
}
