import Link from 'next/link'
import { Plus } from 'lucide-react'
import { QuestionsListClient } from '@/components/admin/QuestionsListClient'
import { getAllQuestionsForAdmin } from '@/lib/queries/admin'

interface QuestionsListPageProps {
  searchParams: Promise<{ kamoku?: string }>
}

export default async function QuestionsListPage({ searchParams }: QuestionsListPageProps) {
  const { kamoku } = await searchParams
  const questions = await getAllQuestionsForAdmin()

  return (
    <>
      <div className="flex items-center justify-between border-b border-[#37474F]/[0.08] bg-white px-7 py-4">
        <div>
          <div className="text-xs text-[#90A4AE]">Question Editor</div>
          <div className="mt-0.5 text-xl font-extrabold text-[#263238]">Semua Soal</div>
        </div>
        <Link
          href="/admin/questions/new"
          className="flex h-[42px] items-center gap-1.5 rounded-[9px] bg-[#1565C0] px-5 text-[13.5px] font-bold text-white shadow-[0_4px_12px_rgba(21,101,192,0.28)]"
        >
          <Plus size={16} />
          Soal Baru
        </Link>
      </div>

      <QuestionsListClient questions={questions} initialKamokuId={kamoku ? Number(kamoku) : undefined} />
    </>
  )
}
