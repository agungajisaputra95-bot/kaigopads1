'use client'

import { useActionState, useEffect, useRef } from 'react'
import { MessageSquareText } from 'lucide-react'
import { submitFeedback, type FeedbackFormState } from '@/app/(main)/profile/actions'

const initialState: FeedbackFormState = {}

export function FeedbackCard() {
  const [state, formAction, pending] = useActionState(submitFeedback, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) formRef.current?.reset()
  }, [state.success])

  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
      <div className="flex items-center gap-2">
        <MessageSquareText size={18} className="text-[#1565C0]" />
        <span className="text-[15px] font-bold text-[#263238]">Kritik & Saran</span>
      </div>
      <div className="mt-1 text-xs text-[#78909C]">Ada masukan buat KaigoPads? Tulis di sini, langsung sampai ke tim kami.</div>

      <form ref={formRef} action={formAction} className="mt-3 flex flex-col gap-2">
        <textarea
          name="message"
          rows={3}
          placeholder="Tulis kritik atau saran kamu..."
          className="w-full resize-none rounded-xl border border-[#ECEFF1] p-3 text-sm text-[#263238] placeholder:text-[#B0BEC5] focus:border-[#1565C0] focus:outline-none"
        />

        {state.message && (
          <div className={`text-xs font-medium ${state.success ? 'text-[#43A047]' : 'text-[#E53935]'}`}>
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="h-10 w-full rounded-xl bg-[#1565C0] text-sm font-bold text-white disabled:opacity-60"
        >
          {pending ? 'Mengirim…' : 'Kirim'}
        </button>
      </form>
    </div>
  )
}
