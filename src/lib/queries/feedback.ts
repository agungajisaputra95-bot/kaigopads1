import { createAdminClient } from '@/lib/supabase/admin'

export interface FeedbackRow {
  id: string
  message: string
  createdAt: string
  userEmail: string
  userName: string | null
}

export async function getAllFeedback(): Promise<FeedbackRow[]> {
  const supabase = createAdminClient()

  const [feedbackRes, usersRes] = await Promise.all([
    supabase.from('feedback').select('id, user_id, message, created_at').order('created_at', { ascending: false }),
    supabase.auth.admin.listUsers({ page: 1, perPage: 200 }),
  ])

  if (feedbackRes.error || !feedbackRes.data) return []

  const userById = new Map(usersRes.data?.users.map((u) => [u.id, u]) ?? [])

  return feedbackRes.data.map((row) => {
    const user = userById.get(row.user_id)
    return {
      id: row.id,
      message: row.message,
      createdAt: row.created_at,
      userEmail: user?.email ?? '(tanpa email)',
      userName: (user?.user_metadata?.full_name as string | undefined) ?? null,
    }
  })
}
