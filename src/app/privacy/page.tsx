import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Kebijakan Privasi — KaigoPads',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 px-4 py-10">
      <Link href="/login" className="flex items-center gap-1.5 text-xs font-bold text-[#1565C0]">
        <ArrowLeft size={14} /> Kembali
      </Link>

      <div>
        <h1 className="text-xl font-extrabold text-[#263238]">Kebijakan Privasi</h1>
        <p className="mt-1 text-xs text-[#90A4AE]">Terakhir diperbarui: 14 Juli 2026</p>
      </div>

      <div className="flex flex-col gap-4 text-sm leading-relaxed text-[#455A64]">
        <p>
          KaigoPads (&quot;kami&quot;) menghargai privasi kamu. Halaman ini menjelaskan data apa saja yang kami
          kumpulkan, untuk apa data itu dipakai, dan bagaimana kamu bisa mengontrolnya.
        </p>

        <section>
          <h2 className="mb-1 text-sm font-bold text-[#263238]">Data yang Kami Kumpulkan</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>Nama, email, dan nomor WhatsApp yang kamu isi saat mendaftar.</li>
            <li>Riwayat belajar: jawaban latihan soal, hasil mock exam, dan progress per kamoku.</li>
            <li>Riwayat konfirmasi pembayaran Premium (durasi, tanggal, catatan referensi transfer).</li>
            <li>Kritik &amp; saran yang kamu kirimkan lewat halaman Profil.</li>
            <li>Data langganan notifikasi push, jika kamu mengaktifkan Pengingat Belajar.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-bold text-[#263238]">Untuk Apa Data Ini Dipakai</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>Menyediakan fitur belajar, tracking progress, dan analitik pribadi kamu.</li>
            <li>Verifikasi dan konfirmasi status akun Premium.</li>
            <li>Menghubungi kamu lewat WhatsApp/email terkait akun atau pembayaran, bila diperlukan.</li>
            <li>Mengirim pengingat belajar, jika fitur notifikasi diaktifkan.</li>
            <li>Memperbaiki aplikasi berdasarkan kritik &amp; saran yang masuk.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-bold text-[#263238]">Siapa yang Bisa Mengakses</h2>
          <p>
            Data kamu hanya dapat diakses oleh kamu sendiri (lewat akunmu) dan admin KaigoPads untuk keperluan
            operasional (mis. konfirmasi pembayaran, dukungan teknis). Kami tidak menjual atau membagikan data
            kamu ke pihak ketiga untuk tujuan komersial.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-bold text-[#263238]">Kontrol Kamu</h2>
          <p>
            Kamu bisa mengubah data profil, menonaktifkan notifikasi, atau menghapus akun kapan saja lewat halaman
            Profil. Menghapus akun akan menghapus data pribadi dan riwayat belajar terkait akunmu.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-bold text-[#263238]">Kontak</h2>
          <p>
            Ada pertanyaan soal privasi datamu? Hubungi kami lewat halaman{' '}
            <Link href="/profile/help" className="font-bold text-[#1565C0] underline">
              Bantuan &amp; FAQ
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
