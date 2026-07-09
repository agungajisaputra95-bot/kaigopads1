import Link from 'next/link'
import { getKamokuInventory } from '@/lib/queries/admin'
import type { KamokuPart } from '@/lib/constants'

const PART_BADGE_BG: Record<KamokuPart, string> = { A: '#1565C0', B: '#FB8C00', C: '#43A047' }

export default async function KamokuManagementPage() {
  const inventory = await getKamokuInventory()

  return (
    <>
      <div className="border-b border-[#37474F]/[0.08] bg-white px-7 py-4">
        <div className="text-xs text-[#90A4AE]">Content</div>
        <div className="mt-0.5 text-xl font-extrabold text-[#263238]">Manajemen Kamoku</div>
        <div className="mt-0.5 text-[13px] text-[#78909C]">Inventaris konten per kamoku — soal, materi, dan kosakata.</div>
      </div>

      <div className="flex-1 px-7 py-5">
        <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 border-b border-[#ECEFF1] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-[#90A4AE]">
            <span>Part</span>
            <span>Kamoku</span>
            <span className="text-right">Soal</span>
            <span className="text-right">Materi</span>
            <span className="text-right">Kosakata</span>
          </div>
          {inventory.map((k) => (
            <Link
              key={k.id}
              href={`/admin/questions?kamoku=${k.id}`}
              className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 border-t border-[#ECEFF1] px-5 py-3"
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-extrabold text-white"
                style={{ background: PART_BADGE_BG[k.part as KamokuPart] }}
              >
                {k.part}
              </span>
              <div className="min-w-0">
                <div className="jp truncate text-sm font-bold text-[#263238]">{k.nameJp}</div>
                <div className="truncate text-xs text-[#90A4AE]">{k.nameId}</div>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-bold text-[#37474F]">{k.questionCount}</span>
                {k.draftCount > 0 && (
                  <span className="ml-1.5 rounded-full bg-[#FB8C00]/[0.12] px-1.5 py-0.5 text-[10px] font-bold text-[#E65100]">
                    {k.draftCount} draft
                  </span>
                )}
              </div>
              <span className="text-right font-mono text-sm text-[#546E7A]">{k.materialCount}</span>
              <span className="text-right font-mono text-sm text-[#546E7A]">{k.vocabCount}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
