export interface PartBreakdown {
  label: string
  frac: string
  pct: number
  color: string
}

export function ExamResultBreakdown({ parts }: { parts: PartBreakdown[] }) {
  return (
    <div className="mt-3 rounded-xl bg-white p-3.5 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      <div className="mb-3 text-[13px] font-bold text-[#263238]">Breakdown per Part</div>
      <div className="flex flex-col gap-3">
        {parts.map((p) => (
          <div key={p.label}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-bold text-[#455A64]">{p.label}</span>
              <span className="font-mono text-xs font-bold" style={{ color: p.color }}>
                {p.frac} · {p.pct}%
              </span>
            </div>
            <div className="h-[9px] overflow-hidden rounded-[5px] bg-[#ECEFF1]">
              <div
                className="h-full rounded-[5px]"
                style={{ width: `${p.pct}%`, background: p.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
