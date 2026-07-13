import { createClient } from '@supabase/supabase-js'
import webpush from 'web-push'

// Kirim notifikasi "Pengingat Belajar" harian ke semua device yang subscribe.
// Jadwal: 12:00 UTC = 19:00 WIB, cocok buat pengingat belajar malam hari.
const handler = async () => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  webpush.setVapidDetails(
    'mailto:admin@kaigopads.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  )

  const { data: subs } = await supabase.from('push_subscriptions').select('*')
  if (!subs || subs.length === 0) return new Response('no subscribers', { status: 200 })

  const payload = JSON.stringify({
    title: 'KaigoPads',
    body: 'Yuk lanjutkan belajar hari ini biar makin siap ujian Kaigo Fukushi Shi! 💪',
    url: '/dashboard',
  })

  const staleIds: string[] = []

  await Promise.all(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload
        )
      } catch (err) {
        const statusCode = (err as { statusCode?: number }).statusCode
        if (statusCode === 404 || statusCode === 410) staleIds.push(sub.id)
      }
    })
  )

  if (staleIds.length > 0) {
    await supabase.from('push_subscriptions').delete().in('id', staleIds)
  }

  return new Response(`sent to ${subs.length - staleIds.length} subscribers`, { status: 200 })
}

export default handler
export const config = { schedule: '0 12 * * *' }
