export default function Loading() {
  return (
    <div className="flex-1 px-7 py-5">
      <div className="flex animate-pulse flex-col gap-2.5">
        <div className="h-10 rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]" />
        <div className="h-64 rounded-xl bg-white shadow-[0_1px_3px_rgba(55,71,79,0.08)]" />
      </div>
    </div>
  )
}
