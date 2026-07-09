'use client'

import { useState } from 'react'
import { Bell, Languages, LogOut } from 'lucide-react'
import { useFurigana } from '@/components/ui/FuriganaText'

function ToggleSwitch({ checked }: { checked: boolean }) {
  return (
    <span
      className="flex h-6 w-10 shrink-0 items-center rounded-full p-0.5 transition-colors"
      style={{ background: checked ? '#1565C0' : '#CFD8DC' }}
    >
      <span
        className="h-5 w-5 rounded-full bg-white shadow transition-transform"
        style={{ transform: checked ? 'translateX(16px)' : 'translateX(0)' }}
      />
    </span>
  )
}

export function SettingsList({ onLogout }: { onLogout: () => void }) {
  const { showFurigana, toggle } = useFurigana()
  const [reminderOn, setReminderOn] = useState(true)

  return (
    <div className="flex flex-col gap-2.5">
      <div className="rounded-2xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        <button
          type="button"
          onClick={toggle}
          className="jp flex w-full items-center gap-3 p-4"
        >
          <span className="text-base">ふり</span>
          <div className="flex-1 text-left">
            <div className="text-[13px] font-bold text-[#263238]">Furigana Default</div>
            <div className="mt-0.5 text-xs text-[#90A4AE]">Tampilkan furigana otomatis saat buka app</div>
          </div>
          <ToggleSwitch checked={showFurigana} />
        </button>

        <button
          type="button"
          onClick={() => setReminderOn((v) => !v)}
          className="flex w-full items-center gap-3 border-t border-[#ECEFF1] p-4"
        >
          <Bell size={18} className="text-[#546E7A]" />
          <div className="flex-1 text-left">
            <div className="text-[13px] font-bold text-[#263238]">Pengingat Belajar</div>
            <div className="mt-0.5 text-xs text-[#90A4AE]">Notifikasi harian supaya konsisten belajar</div>
          </div>
          <ToggleSwitch checked={reminderOn} />
        </button>

        <div className="flex w-full items-center gap-3 border-t border-[#ECEFF1] p-4">
          <Languages size={18} className="text-[#546E7A]" />
          <div className="flex-1 text-left">
            <div className="text-[13px] font-bold text-[#263238]">Bahasa</div>
            <div className="mt-0.5 text-xs text-[#90A4AE]">Bahasa Indonesia</div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white p-4 text-sm font-bold text-[#E53935] shadow-[0_1px_3px_rgba(55,71,79,0.08)]"
      >
        <LogOut size={16} />
        Keluar
      </button>
    </div>
  )
}
