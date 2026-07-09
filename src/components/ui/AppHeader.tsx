import { FuriganaPill } from '@/components/ui/FuriganaPill'

export function AppHeader({ userInitial = 'R' }: { userInitial?: string }) {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-[#37474F]/[0.06] bg-[#ECEFF1]/90 px-4 py-3.5 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#1565C0] text-[15px] font-extrabold text-white">
          K
        </div>
        <span className="text-lg font-extrabold tracking-tight text-[#263238]">KaigoPads</span>
      </div>
      <div className="flex items-center gap-2.5">
        <FuriganaPill />
        <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-white bg-[#CFD8DC] text-sm font-bold text-[#455A64] shadow-[0_1px_3px_rgba(55,71,79,0.15)]">
          {userInitial}
        </div>
      </div>
    </div>
  )
}
