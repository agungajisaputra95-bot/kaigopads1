import Link from 'next/link'
import { BookText, Timer, History, RotateCcw, SlidersHorizontal, BookMarked, ChevronRight } from 'lucide-react'

const STUDY_MODES = [
  {
    href: '/study/materi',
    icon: BookText,
    color: '#5E35B1',
    title: 'Materi Kamoku',
    description: 'Pelajari konsep tiap kamoku sebelum latihan soal',
  },
  {
    href: '/study/mock-exam',
    icon: Timer,
    color: '#1565C0',
    title: 'Mock Exam',
    description: 'Simulasi ujian penuh, 125 soal dengan timer 120 menit',
  },
  {
    href: '/study/past-years',
    icon: History,
    color: '#43A047',
    title: 'Latihan Per Tahun',
    description: 'Replika soal ujian tahun-tahun sebelumnya (過去問)',
  },
  {
    href: '/study/weak-review',
    icon: RotateCcw,
    color: '#FB8C00',
    title: 'Weak Question Review',
    description: 'Fokus latihan soal & kosakata yang paling sering salah',
  },
  {
    href: '/study/custom',
    icon: SlidersHorizontal,
    color: '#8E24AA',
    title: 'Kustomisasi Latihan',
    description: 'Pilih sendiri kamoku, tingkat kesulitan, dan jumlah soal',
  },
  {
    href: '/study/kosakata',
    icon: BookMarked,
    color: '#00897B',
    title: 'Kosakata',
    description: 'Kamus istilah penting dari semua kamoku',
  },
] as const

export default function StudyHubPage() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-lg font-extrabold text-[#263238]">Mode Belajar</div>
        <div className="mt-0.5 text-[13px] text-[#78909C]">Pilih cara latihan yang sesuai kebutuhanmu</div>
      </div>

      {STUDY_MODES.map(({ href, icon: Icon, color, title, description }) => (
        <Link
          key={href}
          href={href}
          className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]"
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{ background: `${color}1A` }}
          >
            <Icon size={22} color={color} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-bold text-[#263238]">{title}</div>
            <div className="mt-0.5 text-xs leading-snug text-[#78909C]">{description}</div>
          </div>
          <ChevronRight size={18} className="shrink-0 text-[#B0BEC5]" />
        </Link>
      ))}
    </div>
  )
}
