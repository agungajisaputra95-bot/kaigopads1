import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { FuriganaText } from '@/components/ui/FuriganaText'
import { getMaterialSectionCounts } from '@/lib/queries/material'
import { KAMOKU_LIST, type KamokuPart } from '@/lib/constants'

const PART_LABEL: Record<KamokuPart, { label: string; badgeBg: string }> = {
  A: { label: 'A Part — Dasar & Teknik Kaigo', badgeBg: '#1565C0' },
  B: { label: 'B Part — Tubuh & Kondisi Lansia', badgeBg: '#FB8C00' },
  C: { label: 'C Part — Aplikasi Praktik & Kasus', badgeBg: '#43A047' },
}

export default async function MateriPickerPage() {
  const counts = await getMaterialSectionCounts()
  const parts: KamokuPart[] = ['A', 'B', 'C']

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-lg font-extrabold text-[#263238]">Materi per Kamoku</div>
        <div className="mt-0.5 text-[13px] text-[#78909C]">
          Pelajari konsep dulu sebelum latihan soal — pilih kamoku di bawah.
        </div>
      </div>

      {parts.map((part) => (
        <div key={part}>
          <div className="mb-1.5 flex items-center gap-2 px-0.5">
            <span
              className="flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-extrabold text-white"
              style={{ background: PART_LABEL[part].badgeBg }}
            >
              {part}
            </span>
            <span className="text-xs font-bold text-[#546E7A]">{PART_LABEL[part].label}</span>
          </div>

          <div className="flex flex-col gap-2">
            {KAMOKU_LIST.filter((k) => k.part === part).map((k) => {
              const sectionCount = counts[k.id] ?? 0
              const hasMateri = sectionCount > 0
              return (
                <Link
                  key={k.id}
                  href={`/study/${k.id}/materi`}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-[0_1px_3px_rgba(55,71,79,0.08)]"
                >
                  <div className="min-w-0 flex-1">
                    <div className="jp text-sm font-bold text-[#263238]">
                      <FuriganaText text={k.nameJp} />
                    </div>
                    <div className="mt-0.5 text-xs text-[#90A4AE]">{k.nameId}</div>
                  </div>
                  <span
                    className="shrink-0 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-bold"
                    style={{
                      background: hasMateri ? 'rgba(67,160,71,0.12)' : '#ECEFF1',
                      color: hasMateri ? '#2E7D32' : '#90A4AE',
                    }}
                  >
                    {hasMateri ? `${sectionCount} materi` : 'Belum ada'}
                  </span>
                  <ChevronRight size={16} className="shrink-0 text-[#B0BEC5]" />
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
