import { createClient } from '@supabase/supabase-js'

// PERINGATAN: pakai service role key (bypass RLS sepenuhnya). Hanya boleh dipakai
// di Server Component / Server Action untuk halaman admin — jangan pernah diimpor
// dari komponen client atau dikirim ke browser.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
