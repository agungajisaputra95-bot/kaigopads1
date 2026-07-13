export function CorrectFeedbackBurst() {
  return (
    <div className="pointer-events-none absolute inset-x-0 -top-3 z-30 flex justify-center">
      <div className="animate-correct-pop flex items-center gap-1.5 rounded-full bg-[#43A047] px-4 py-2 text-sm font-bold text-white shadow-[0_4px_16px_rgba(67,160,71,0.4)]">
        <span className="text-base">✓</span> Benar!
      </div>
    </div>
  )
}
