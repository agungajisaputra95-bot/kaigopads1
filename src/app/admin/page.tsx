import Link from 'next/link'
import { FileQuestion, BookOpen, Languages, ListTree, ArrowRight, Upload, Users, MessageSquareText } from 'lucide-react'
import { getContentStats } from '@/lib/queries/admin'

export default async function AdminDashboardPage() {
  const stats = await getContentStats()

  const statCards = [
    { icon: FileQuestion, label: 'Total Soal', value: stats.totalQuestions, color: '#1565C0' },
    {
      icon: FileQuestion,
      label: 'Soal Draft (belum ada jawaban)',
      value: stats.draftQuestions,
      color: stats.draftQuestions > 0 ? '#E65100' : '#43A047',
    },
    { icon: BookOpen, label: 'Section Materi', value: stats.totalMaterialSections, color: '#5E35B1' },
    { icon: Languages, label: 'Kosakata', value: stats.totalVocabulary, color: '#00897B' },
    { icon: ListTree, label: 'Kamoku Punya Materi', value: `${stats.kamokuWithMateriCount}/13`, color: '#43A047' },
  ]

  const quickLinks = [
    { href: '/admin/questions', label: 'Question Editor', description: 'Kelola bank soal', icon: FileQuestion, available: true },
    { href: '/admin/kamoku', label: 'Manajemen Kamoku', description: 'Inventaris konten per kamoku', icon: ListTree, available: true },
    { href: '/admin/import', label: 'Bulk Import', description: 'Import banyak soal sekaligus', icon: Upload, available: false },
    { href: '/admin/users', label: 'Users & Pembayaran', description: 'Statistik, progress, dan konfirmasi pembayaran user', icon: Users, available: true },
    { href: '/admin/feedback', label: 'Kritik & Saran', description: 'Masukan dari user', icon: MessageSquareText, available: true },
  ]

  return (
    <>
      <div className="border-b border-[#37474F]/[0.08] bg-white px-7 py-4">
        <div className="text-xs text-[#90A4AE]">Overview</div>
        <div className="mt-0.5 text-xl font-extrabold text-[#263238]">Dashboard</div>
      </div>

      <div className="flex-1 px-4 py-5 md:px-7">
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3">
          {statCards.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
              <div className="flex items-center gap-2">
                <Icon size={16} color={color} />
                <span className="text-xs font-semibold text-[#78909C]">{label}</span>
              </div>
              <div className="mt-2 font-mono text-2xl font-bold" style={{ color }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-[13px] font-bold text-[#263238]">Akses Cepat</div>
        <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {quickLinks.map(({ href, label, description, icon: Icon, available }) => {
            const content = (
              <>
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: available ? 'rgba(21,101,192,0.1)' : '#ECEFF1' }}
                >
                  <Icon size={18} color={available ? '#1565C0' : '#B0BEC5'} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold" style={{ color: available ? '#263238' : '#B0BEC5' }}>
                    {label}
                  </div>
                  <div className="mt-0.5 text-xs text-[#90A4AE]">
                    {available ? description : 'Segera hadir'}
                  </div>
                </div>
                {available && <ArrowRight size={16} className="shrink-0 text-[#B0BEC5]" />}
              </>
            )

            return available ? (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-xl bg-white p-3.5 shadow-[0_1px_3px_rgba(55,71,79,0.08)]"
              >
                {content}
              </Link>
            ) : (
              <div key={href} className="flex items-center gap-3 rounded-xl bg-white p-3.5 opacity-60 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
