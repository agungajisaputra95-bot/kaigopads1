'use client'

import { useFurigana } from '@/components/ui/FuriganaText'

export function FuriganaPill({ compact = false }: { compact?: boolean }) {
  const { showFurigana, toggle } = useFurigana()

  return (
    <button
      type="button"
      onClick={toggle}
      className={`flex items-center gap-1.5 rounded-full border font-sans ${compact ? 'h-[30px] px-2.5' : 'h-8 px-2.5'}`}
      style={{
        borderColor: showFurigana ? 'rgba(21,101,192,0.25)' : 'rgba(55,71,79,0.15)',
        background: showFurigana ? 'rgba(21,101,192,0.08)' : '#fff',
      }}
    >
      <span
        className={`jp font-bold leading-none ${compact ? 'text-xs' : 'text-[13px]'}`}
        style={{ color: showFurigana ? '#1565C0' : '#90A4AE' }}
      >
        ふり
      </span>
      <span
        className={`font-bold tracking-wide ${compact ? 'text-[9px]' : 'text-[10px]'}`}
        style={{ color: showFurigana ? '#1565C0' : '#90A4AE' }}
      >
        {showFurigana ? 'ON' : 'OFF'}
      </span>
    </button>
  )
}
