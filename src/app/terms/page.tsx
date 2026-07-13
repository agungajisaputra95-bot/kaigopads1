import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Syarat & Ketentuan — KaigoPads',
}

export default function TermsPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 px-4 py-10">
      <Link href="/login" className="flex items-center gap-1.5 text-xs font-bold text-[#1565C0]">
        <ArrowLeft size={14} /> Kembali
      </Link>

      <div>
        <h1 className="text-xl font-extrabold text-[#263238]">Syarat &amp; Ketentuan</h1>
        <p className="mt-1 text-xs text-[#90A4AE]">Terakhir diperbarui: 14 Juli 2026</p>
      </div>

      <div className="flex flex-col gap-4 text-sm leading-relaxed text-[#455A64]">
        <p>
          Dengan mendaftar dan menggunakan KaigoPads, kamu setuju dengan ketentuan berikut.
        </p>

        <section>
          <h2 className="mb-1 text-sm font-bold text-[#263238]">Layanan</h2>
          <p>
            KaigoPads adalah aplikasi bantu belajar persiapan ujian Kaigo Fukushi Shi (materi, latihan soal, dan
            simulasi ujian). Konten disusun untuk membantu persiapan, bukan pengganti sumber belajar resmi.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-bold text-[#263238]">Akun Premium &amp; Pembayaran</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>
              Beberapa konten hanya bisa diakses dengan akun Premium. Aktivasi Premium saat ini dilakukan secara
              manual: kamu melakukan pembayaran lalu mengonfirmasi ke admin, dan admin mengaktifkan Premium setelah
              memverifikasi.
            </li>
            <li>Masa aktif Premium mengikuti durasi yang dikonfirmasi (1/3/12 bulan) sejak tanggal aktivasi.</li>
            <li>
              Pembayaran yang keliru (salah transfer, dobel bayar, dll.) bisa dikonfirmasi ke admin lewat halaman
              Bantuan untuk diselesaikan.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-bold text-[#263238]">Kewajiban Pengguna</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>Menjaga kerahasiaan password akunmu.</li>
            <li>Tidak menyalahgunakan fitur (mis. membuat akun ganda untuk mengambil bonus berulang).</li>
            <li>Memberikan data pendaftaran (nama, email, WhatsApp) yang benar.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-bold text-[#263238]">Perubahan Layanan</h2>
          <p>
            Fitur, tampilan, dan ketentuan ini dapat berubah sewaktu-waktu seiring pengembangan aplikasi. Perubahan
            signifikan akan kami sampaikan lewat aplikasi.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-bold text-[#263238]">Kontak</h2>
          <p>
            Pertanyaan seputar akun atau pembayaran bisa disampaikan lewat halaman{' '}
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
