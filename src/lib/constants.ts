export type KamokuPart = 'A' | 'B' | 'C'

export interface KamokuDef {
  id: number
  part: KamokuPart
  nameJp: string
  nameId: string
  bankQuestionCount: number
}

// Referensi resmi: 13 kamoku ujian Kaigo Fukushi Shi, dikelompokkan per Part A/B/C
export const KAMOKU_LIST: KamokuDef[] = [
  // Part A — Dasar & Teknik Dasar Kaigo
  { id: 1, part: 'A', nameJp: '人間の尊厳と自立', nameId: 'Martabat dan Kemandirian Manusia', bankQuestionCount: 24 },
  { id: 2, part: 'A', nameJp: '介護の基本', nameId: 'Dasar-Dasar Perawatan (Kaigo)', bankQuestionCount: 120 },
  { id: 3, part: 'A', nameJp: '社会の理解', nameId: 'Pemahaman Masyarakat', bankQuestionCount: 144 },
  { id: 4, part: 'A', nameJp: '人間関係とコミュニケーション', nameId: 'Hubungan Antarmanusia dan Komunikasi', bankQuestionCount: 48 },
  { id: 5, part: 'A', nameJp: 'コミュニケーション技術', nameId: 'Teknik Komunikasi', bankQuestionCount: 72 },
  { id: 6, part: 'A', nameJp: '生活支援技術', nameId: 'Teknik Dukungan Kehidupan Sehari-hari', bankQuestionCount: 312 },
  // Part B — Tubuh, Kondisi Fisik & Psikologis Lansia
  { id: 7, part: 'B', nameJp: 'こころとからだのしくみ', nameId: 'Mekanisme Pikiran dan Tubuh', bankQuestionCount: 144 },
  { id: 8, part: 'B', nameJp: '発達と老化の理解', nameId: 'Pemahaman Perkembangan dan Penuaan', bankQuestionCount: 96 },
  { id: 9, part: 'B', nameJp: '認知症の理解', nameId: 'Pemahaman Demensia', bankQuestionCount: 120 },
  { id: 10, part: 'B', nameJp: '障害の理解', nameId: 'Pemahaman Disabilitas', bankQuestionCount: 120 },
  { id: 11, part: 'B', nameJp: '医療的ケア', nameId: 'Perawatan Medis', bankQuestionCount: 60 },
  // Part C — Aplikasi Praktik & Kasus Terintegrasi
  { id: 12, part: 'C', nameJp: '介護過程', nameId: 'Proses Perawatan (Kaigo)', bankQuestionCount: 96 },
  { id: 13, part: 'C', nameJp: '総合問題', nameId: 'Soal Komprehensif/Terintegrasi', bankQuestionCount: 144 },
]

// Free tier: akses 2 dari 13 kamoku (lihat PRD 6.9 — paywall setelah 2 kamoku pertama)
export const FREE_KAMOKU_IDS = [1, 2]

export const EXAM_TOTAL_QUESTIONS = 125
export const EXAM_OPTIONS_PER_QUESTION = 5

// Ujian nasional Kaigofukushishi ke-39 — jadwal resmi 31 Januari 2027.
export const NEXT_EXAM_ROUND = '第39回'
export const NEXT_EXAM_DATE = '2027-01-31'
export const NEXT_EXAM_DATE_LABEL = '31 Jan 2027'

// TODO: ganti dengan nomor WhatsApp admin/CS asli sebelum rilis (format: kode negara tanpa +/0 di depan).
export const ADMIN_WHATSAPP_NUMBER = '6281234567890'

export function buildWhatsappUpgradeLink(message: string) {
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
