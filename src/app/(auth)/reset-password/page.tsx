import Link from 'next/link'
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'
import { createClient } from '@/lib/supabase/server'

export default async function ResetPasswordPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="flex flex-col gap-3 text-center">
        <div className="text-3xl">⏰</div>
        <h1 className="text-xl font-extrabold text-[#263238]">Link Sudah Tidak Berlaku</h1>
        <p className="text-sm text-[#78909C]">Link reset password ini sudah kedaluwarsa atau sudah dipakai.</p>
        <Link
          href="/forgot-password"
          className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-[#1565C0] text-sm font-bold text-white"
        >
          Minta Link Baru
        </Link>
      </div>
    )
  }

  return <ResetPasswordForm />
}
