import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#ECEFF1] px-4 py-10">
      <Link href="/" className="mb-6 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1565C0] text-base font-extrabold text-white">
          K
        </div>
        <span className="text-lg font-extrabold tracking-tight text-[#263238]">KaigoPads</span>
      </Link>
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
        {children}
      </div>
    </div>
  )
}
