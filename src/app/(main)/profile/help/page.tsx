import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { buildWhatsappUpgradeLink } from '@/lib/constants'

const FAQ = [
  {
    q: 'Bagaimana cara upgrade ke Premium?',
    a: 'Buka halaman Profil, tap kartu Membership, lalu pilih durasi dan klik "Hubungi CS via WhatsApp" untuk konfirmasi pembayaran manual.',
  },
  {
    q: 'Saya lupa password, gimana?',
    a: 'Di halaman Masuk, klik "Lupa kata sandi?" lalu ikuti link yang dikirim ke email kamu. Kalau sudah login, bisa juga ganti langsung lewat Profil > Ganti Password.',
  },
  {
    q: 'Kenapa progress belajar saya tidak tersimpan?',
    a: 'Pastikan koneksi internet stabil saat mengerjakan soal — jawaban tersimpan otomatis ke server tiap kamu submit.',
  },
  {
    q: 'Berapa lama Premium saya berlaku?',
    a: 'Cek tanggal berlakunya di kartu Membership pada Profil, atau lihat detailnya di Profil > Riwayat Pembayaran.',
  },
  {
    q: 'Bagaimana cara nyalakan pengingat belajar harian?',
    a: 'Buka Profil > Pengingat Belajar, nyalakan toggle-nya, lalu izinkan notifikasi saat diminta browser.',
  },
]

export default function HelpPage() {
  const whatsappHref = buildWhatsappUpgradeLink('Halo, saya mau tanya soal penggunaan KaigoPads.')

  return (
    <div className="flex flex-col gap-3.5">
      <Link href="/profile" className="flex items-center gap-1.5 text-xs font-bold text-[#1565C0]">
        <ArrowLeft size={14} /> Kembali ke Profil
      </Link>

      <div>
        <h1 className="text-lg font-extrabold text-[#263238]">Bantuan & FAQ</h1>
        <p className="mt-1 text-xs text-[#78909C]">Pertanyaan yang sering ditanyakan.</p>
      </div>

      <div className="flex flex-col gap-2.5">
        {FAQ.map((item) => (
          <div key={item.q} className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(55,71,79,0.08)]">
            <div className="text-[13px] font-bold text-[#263238]">{item.q}</div>
            <div className="mt-1 text-xs text-[#78909C]">{item.a}</div>
          </div>
        ))}
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-bold text-white"
      >
        <MessageCircle size={16} /> Hubungi CS via WhatsApp
      </a>
    </div>
  )
}
