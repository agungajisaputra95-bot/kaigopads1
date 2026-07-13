import { createAdminClient } from '@/lib/supabase/admin'

export interface UserAdminRow {
  id: string
  email: string
  name: string | null
  whatsapp: string | null
  createdAt: string
  isPremium: boolean
  premiumUntil: string | null
  paymentConfirmedAt: string | null
  totalAnswered: number
  correctCount: number
  accuracyPct: number | null
  examAttemptsCount: number
  lastActiveAt: string | null
}

// Gabungan User Analytics + Payment Tracking: satu query untuk halaman /admin/users.
export async function getUserAdminOverview(): Promise<UserAdminRow[]> {
  const supabase = createAdminClient()

  const [usersRes, premiumRes, progressRes, examRes] = await Promise.all([
    supabase.auth.admin.listUsers({ page: 1, perPage: 200 }),
    supabase.from('user_premium').select('*'),
    supabase.from('user_progress').select('user_id, is_correct, answered_at'),
    supabase.from('exam_attempts').select('user_id'),
  ])

  if (usersRes.error) return []

  const premiumByUser = new Map((premiumRes.data ?? []).map((r) => [r.user_id, r]))

  const progressByUser = new Map<string, { total: number; correct: number; lastActive: string | null }>()
  for (const row of progressRes.data ?? []) {
    const entry = progressByUser.get(row.user_id) ?? { total: 0, correct: 0, lastActive: null }
    entry.total += 1
    if (row.is_correct) entry.correct += 1
    if (!entry.lastActive || row.answered_at > entry.lastActive) entry.lastActive = row.answered_at
    progressByUser.set(row.user_id, entry)
  }

  const examCountByUser = new Map<string, number>()
  for (const row of examRes.data ?? []) {
    examCountByUser.set(row.user_id, (examCountByUser.get(row.user_id) ?? 0) + 1)
  }

  return usersRes.data.users
    .map((u) => {
      const premium = premiumByUser.get(u.id)
      const progress = progressByUser.get(u.id)
      return {
        id: u.id,
        email: u.email ?? '(tanpa email)',
        name: (u.user_metadata?.full_name as string | undefined) ?? null,
        whatsapp: (u.user_metadata?.whatsapp as string | undefined) ?? null,
        createdAt: u.created_at,
        isPremium: premium?.is_premium ?? false,
        premiumUntil: premium?.premium_until ?? null,
        paymentConfirmedAt: premium?.payment_confirmed_at ?? null,
        totalAnswered: progress?.total ?? 0,
        correctCount: progress?.correct ?? 0,
        accuracyPct: progress && progress.total > 0 ? Math.round((progress.correct / progress.total) * 100) : null,
        examAttemptsCount: examCountByUser.get(u.id) ?? 0,
        lastActiveAt: progress?.lastActive ?? null,
      }
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}
