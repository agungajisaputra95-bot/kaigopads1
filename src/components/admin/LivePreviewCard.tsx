import { FuriganaProvider, FuriganaText } from '@/components/ui/FuriganaText'
import type { FuriganaMapEntry } from '@/types/question'

interface PreviewOption {
  text: string
  isCorrect: boolean
}

interface LivePreviewCardProps {
  kamokuNameJp: string
  kamokuFuriganaMap: FuriganaMapEntry[]
  partCode: string
  questionText: string
  questionFuriganaMap: FuriganaMapEntry[]
  options: PreviewOption[]
}

export function LivePreviewCard({
  kamokuNameJp,
  kamokuFuriganaMap,
  partCode,
  questionText,
  questionFuriganaMap,
  options,
}: LivePreviewCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      <div className="flex items-center justify-between p-[14px_18px] border-b border-[#ECEFF1]">
        <div className="text-[13px] font-bold text-[#263238]">📱 Live Preview</div>
        <span className="text-[11px] text-[#90A4AE]">Tampilan di mobile app</span>
      </div>
      <FuriganaProvider initialShowFurigana syncWithStorage={false}>
      <div className="flex justify-center bg-[#DCE3E7] p-[18px]">
        <div className="w-[280px] overflow-hidden rounded-[20px] border-[5px] border-[#37474F] bg-[#ECEFF1] shadow-[0_8px_24px_rgba(55,71,79,0.2)]">
          <div className="flex items-center justify-between border-b border-[#ECEFF1] bg-white px-3 py-2.5">
            <span className="jp text-[13px] font-bold text-[#263238]">
              <FuriganaText text={kamokuNameJp} furiganaMap={kamokuFuriganaMap} />
            </span>
            <span className="rounded-[5px] bg-[#1565C0]/10 px-1.5 py-0.5 text-[8px] font-bold text-[#1565C0]">
              {partCode}
            </span>
          </div>
          <div className="p-3">
            <div className="font-mono text-[10px] font-bold text-[#90A4AE]">Q</div>
            <div className="jp mt-1.5 text-xs leading-relaxed text-[#263238]">
              <FuriganaText text={questionText} furiganaMap={questionFuriganaMap} />
            </div>
            <div className="mt-2.5 flex flex-col gap-1.5">
              {options.map((opt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-[7px] rounded-[7px] bg-white px-2 py-1.5"
                  style={{ border: `1px solid ${opt.isCorrect ? '#43A047' : '#ECEFF1'}` }}
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold"
                    style={{
                      background: opt.isCorrect ? '#43A047' : '#ECEFF1',
                      color: opt.isCorrect ? '#fff' : '#546E7A',
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="jp text-[10.5px] leading-snug text-[#37474F]">{opt.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </FuriganaProvider>
    </div>
  )
}
