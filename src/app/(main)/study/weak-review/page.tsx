import { redirect } from 'next/navigation'
import Link from 'next/link'
import { WeakSubjectsList } from '@/components/analytics/WeakSubjectsList'
import { WeakVocabList } from '@/components/vocabulary/WeakVocabList'
import { createClient } from '@/lib/supabase/server'
import { getKamokuMasteryStats, getWeakQueueCount } from '@/lib/queries/dashboard'
import { getWeakVocabQueue } from '@/lib/queries/vocabulary'
import { buildWeakSubjects } from '@/lib/weakSubjects'

export default async function WeakReviewPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [stats, weakQuestionCount, weakVocab] = await Promise.all([
    getKamokuMasteryStats(user.id),
    getWeakQueueCount(user.id),
    getWeakVocabQueue(user.id, 30),
  ])

  const weakSubjects = buildWeakSubjects(stats)
  const hasWeakData = weakQuestionCount > 0 || weakSubjects.length > 0 || weakVocab.length > 0

  return (
    <div className="flex flex-col gap-3.5">
      <div>
        <div className="text-lg font-extrabold text-[#263238]">Weak Review</div>
        <div className="mt-0.5 text-[13px] text-[#78909C]">
          Fokus latihan di soal dan kosakata yang paling sering kamu lupa.
        </div>
      </div>

      {hasWeakData ? (
        <div className="rounded-2xl border-l-4 border-[#FB8C00] bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
          <div className="flex items-baseline gap-3.5">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-2xl font-bold text-[#E53935]">{weakQuestionCount}</span>
              <span className="text-xs text-[#78909C]">soal</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-2xl font-bold text-[#FB8C00]">{weakVocab.length}</span>
              <span className="text-xs text-[#78909C]">kosakata</span>
            </div>
          </div>
          {weakSubjects.length > 0 && (
            <Link
              href={`/study/${weakSubjects[0].kamokuId}/practice`}
              className="mt-3.5 flex h-11 w-full items-center justify-center rounded-xl bg-[#FB8C00] text-sm font-bold text-white"
            >
              Mulai Review Kamoku Terlemah
            </Link>
          )}
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-6 text-center text-[13px] text-[#90A4AE] shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
          Belum ada soal atau kosakata yang perlu direview. Kerjakan latihan dulu — yang sering salah/di-tap akan
          otomatis muncul di sini.
        </div>
      )}

      {weakSubjects.length > 0 && (
        <div>
          <div className="mb-2.5 text-[15px] font-bold text-[#263238]">Kamoku Paling Lemah</div>
          <WeakSubjectsList items={weakSubjects} />
        </div>
      )}

      {weakVocab.length > 0 && (
        <div>
          <div className="mb-2.5 text-[15px] font-bold text-[#263238]">Kosakata Perlu Direview</div>
          <WeakVocabList items={weakVocab} />
        </div>
      )}
    </div>
  )
}
