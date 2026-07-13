import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { FREE_KAMOKU_IDS } from '@/lib/constants'

const PROTECTED_PREFIXES = ['/dashboard', '/study', '/analytics', '/profile', '/admin', '/onboarding']
const AUTH_PATHS = ['/login', '/register']

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })
  let user = null
  let supabase: ReturnType<typeof createServerClient> | null = null

  try {
    supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const {
      data: { user: fetchedUser },
    } = await supabase.auth.getUser()
    user = fetchedUser
  } catch {
    // Supabase belum terkonfigurasi (env placeholder) atau sedang down —
    // jangan sampai seluruh situs ikut down, perlakukan sebagai unauthenticated.
  }

  const path = request.nextUrl.pathname
  const isProtected = PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix))
  const isAuthPath = AUTH_PATHS.some((prefix) => path.startsWith(prefix))

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (isAuthPath && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // onboarding_completed cuma di-set eksplisit ke false saat signUp (lihat actions.ts) —
  // undefined (akun lama) dianggap sudah "selesai" supaya user existing tidak ke-redirect.
  if (user && user.user_metadata?.onboarding_completed === false && !path.startsWith('/onboarding')) {
    const url = request.nextUrl.clone()
    url.pathname = '/onboarding'
    return NextResponse.redirect(url)
  }

  if (path.startsWith('/onboarding') && user && user.user_metadata?.onboarding_completed !== false) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  if (path.startsWith('/admin') && user && supabase) {
    const { data: adminRow } = await supabase
      .from('user_premium')
      .select('is_admin')
      .eq('user_id', user.id)
      .maybeSingle()

    if (!adminRow?.is_admin) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  const kamokuMatch = path.match(/^\/study\/(\d+)/)
  if (kamokuMatch && user && supabase) {
    const kamokuId = Number(kamokuMatch[1])
    if (!FREE_KAMOKU_IDS.includes(kamokuId)) {
      const { data: premium } = await supabase
        .from('user_premium')
        .select('is_premium')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!premium?.is_premium) {
        const url = request.nextUrl.clone()
        url.pathname = '/profile'
        url.searchParams.set('paywall', kamokuId.toString())
        return NextResponse.redirect(url)
      }
    }
  }

  return response
}
