import { getAllFeedback } from '@/lib/queries/feedback'

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default async function FeedbackPage() {
  const feedback = await getAllFeedback()

  return (
    <>
      <div className="border-b border-[#37474F]/[0.08] bg-white px-7 py-4">
        <div className="text-xs text-[#90A4AE]">Users</div>
        <div className="mt-0.5 text-xl font-extrabold text-[#263238]">Kritik & Saran</div>
        <div className="mt-0.5 text-[13px] text-[#78909C]">Masukan yang dikirim user lewat halaman Profil.</div>
      </div>

      <div className="flex-1 px-7 py-5">
        <div className="mb-4 text-sm font-bold text-[#263238]">{feedback.length} masukan</div>

        {feedback.length === 0 ? (
          <div className="rounded-xl bg-white p-6 text-center text-sm text-[#90A4AE] shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
            Belum ada kritik/saran yang masuk.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {feedback.map((item) => (
              <div key={item.id} className="rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[13px] font-bold text-[#263238]">{item.userName ?? item.userEmail}</div>
                  <div className="shrink-0 text-xs text-[#90A4AE]">{formatDateTime(item.createdAt)}</div>
                </div>
                {item.userName && <div className="text-xs text-[#90A4AE]">{item.userEmail}</div>}
                <div className="mt-2 whitespace-pre-wrap text-sm text-[#455A64]">{item.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
