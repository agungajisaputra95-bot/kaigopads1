import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCachedUser } from '@/lib/supabase/server'
import { getPastYearAttempts, getPastYearSources } from '@/lib/queries/exam'

export default async function PastYearsPage() {
  const user = await getCachedUser()

  if (!user) redirect('/login')

  const [sources, attempts] = await Promise.all([getPastYearSources(), getPastYearAttempts(user.id)])

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-lg font-extrabold text-[#263238]">Latihan Per Tahun</div>
        <div className="mt-0.5 text-[13px] text-[#78909C]">
          Replika soal ujian nasional tahun-tahun sebelumnya (過去問), format & waktu sama persis ujian asli.
        </div>
      </div>

      {sources.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 text-center text-sm text-[#90A4AE] shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
          Belum ada soal 過去問 di bank soal. Tambahkan lewat Admin CMS dengan format source &quot;過去問_&lt;tahun&gt;&quot;.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {sources.map((source) => {
            const attempt = attempts[source]
            return (
              <div
                key={source}
                className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]"
              >
                <div className="min-w-0 flex-1">
                  <div className="jp text-sm font-bold text-[#263238]">{source}</div>
                  <div className="mt-1 text-xs text-[#90A4AE]">
                    {attempt ? (
                      <span>
                        Sudah dikerjakan · skor terakhir{' '}
                        <span className="font-mono font-bold text-[#43A047]">
                          {attempt.correctCount}/{attempt.totalQuestions}
                        </span>
                      </span>
                    ) : (
                      'Belum pernah dikerjakan'
                    )}
                  </div>
                </div>
                <Link
                  href={`/study/mock-exam?year=${encodeURIComponent(source)}`}
                  className="shrink-0 whitespace-nowrap rounded-lg bg-[#1565C0]/10 px-3.5 py-2 text-xs font-bold text-[#1565C0]"
                >
                  Mulai Latihan
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
