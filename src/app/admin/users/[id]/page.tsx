import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getUserDetail } from '@/lib/queries/userDetail'
import { UserDetailActions } from '@/components/admin/UserDetailActions'
import { masteryColor, toWaMeNumber } from '@/lib/utils'

function formatDate(iso: string | null) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getUserDetail(id)

  if (!user) notFound()

  const attempted = user.kamokuStats.filter((k) => k.total > 0)

  return (
    <>
      <div className="border-b border-[#37474F]/[0.08] bg-white px-7 py-4">
        <Link href="/admin/users" className="flex items-center gap-1.5 text-xs font-bold text-[#1565C0]">
          <ArrowLeft size={14} /> Kembali ke Users & Pembayaran
        </Link>
        <div className="mt-2 flex items-start justify-between gap-4">
          <div>
            <div className="text-xl font-extrabold text-[#263238]">{user.name ?? user.email}</div>
            <div className="mt-0.5 text-[13px] text-[#78909C]">{user.email}</div>
            {user.whatsapp && (
              <a
                href={`https://wa.me/${toWaMeNumber(user.whatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-block text-[13px] font-semibold text-[#25D366]"
              >
                {user.whatsapp}
              </a>
            )}
            <div className="mt-1 text-xs text-[#90A4AE]">Terdaftar {formatDate(user.createdAt)}</div>
          </div>
          <UserDetailActions
            userId={user.id}
            isPremium={user.isPremium}
            premiumUntil={user.premiumUntil}
          />
        </div>
      </div>

      <div className="flex-1 px-7 py-5">
        <div className="grid grid-cols-3 gap-3.5">
          <div className="rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
            <div className="text-xs font-semibold text-[#78909C]">Total Soal Dijawab</div>
            <div className="mt-2 font-mono text-2xl font-bold text-[#1565C0]">
              {attempted.reduce((sum, k) => sum + k.total, 0)}
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
            <div className="text-xs font-semibold text-[#78909C]">Mock Exam Diambil</div>
            <div className="mt-2 font-mono text-2xl font-bold text-[#5E35B1]">{user.examAttempts.length}</div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
            <div className="text-xs font-semibold text-[#78909C]">Kosakata Di-tap</div>
            <div className="mt-2 font-mono text-2xl font-bold text-[#00897B]">
              {user.vocabTapped}
              {user.vocabWeakCount > 0 && (
                <span className="ml-2 text-sm font-semibold text-[#E53935]">({user.vocabWeakCount} lemah)</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-[13px] font-bold text-[#263238]">Penguasaan per Kamoku</div>
        <div className="mt-2.5 overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
          {attempted.length === 0 && (
            <div className="p-6 text-center text-sm text-[#90A4AE]">Belum ada soal yang dikerjakan.</div>
          )}
          {attempted
            .slice()
            .sort((a, b) => a.pct - b.pct)
            .map((k) => (
              <div
                key={k.kamokuId}
                className="flex items-center gap-4 border-t border-[#ECEFF1] px-5 py-3 first:border-t-0"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-[#263238]">{k.nameJp}</div>
                  <div className="truncate text-xs text-[#90A4AE]">{k.nameId}</div>
                </div>
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[#ECEFF1]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${k.pct}%`, background: masteryColor(k.pct) }}
                  />
                </div>
                <span className="w-12 text-right font-mono text-sm font-bold" style={{ color: masteryColor(k.pct) }}>
                  {k.pct}%
                </span>
                <span className="w-16 text-right font-mono text-xs text-[#90A4AE]">
                  {k.correct}/{k.total}
                </span>
              </div>
            ))}
        </div>

        <div className="mt-6 text-[13px] font-bold text-[#263238]">Riwayat Mock Exam</div>
        <div className="mt-2.5 overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
          {user.examAttempts.length === 0 && (
            <div className="p-6 text-center text-sm text-[#90A4AE]">Belum pernah mengambil mock exam.</div>
          )}
          {user.examAttempts.map((a) => {
            const pct = Math.round((a.correctCount / a.totalQuestions) * 100)
            return (
              <div
                key={a.id}
                className="flex items-center justify-between gap-4 border-t border-[#ECEFF1] px-5 py-3 first:border-t-0"
              >
                <div>
                  <div className="text-sm font-bold text-[#263238]">{a.source}</div>
                  <div className="text-xs text-[#90A4AE]">{formatDate(a.takenAt)}</div>
                </div>
                <span className="font-mono text-sm font-bold" style={{ color: masteryColor(pct) }}>
                  {a.correctCount}/{a.totalQuestions} ({pct}%)
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-6 text-[13px] font-bold text-[#263238]">Kritik & Saran dari User Ini</div>
        <div className="mt-2.5 overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
          {user.feedback.length === 0 && (
            <div className="p-6 text-center text-sm text-[#90A4AE]">Belum pernah kirim masukan.</div>
          )}
          {user.feedback.map((f) => (
            <div key={f.id} className="border-t border-[#ECEFF1] px-5 py-3 first:border-t-0">
              <div className="text-xs text-[#90A4AE]">{formatDate(f.createdAt)}</div>
              <div className="mt-1 text-sm text-[#37474F]">{f.message}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
