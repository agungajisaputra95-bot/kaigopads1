import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Skala warna mastery (progress) yang dipakai di dashboard & analytics:
// >=75% hijau, >=60% oranye, di bawah itu merah.
export function masteryColor(pct: number) {
  return pct >= 75 ? '#43A047' : pct >= 60 ? '#FB8C00' : '#E53935'
}

// Varian tint (bg pucat + fg pekat) dari masteryColor, dipakai di heatmap tile.
export function masteryHeat(pct: number): { bg: string; fg: string } {
  if (pct >= 75) return { bg: 'rgba(67,160,71,0.16)', fg: '#2E7D32' }
  if (pct >= 60) return { bg: 'rgba(251,140,0,0.16)', fg: '#E65100' }
  return { bg: 'rgba(229,57,53,0.14)', fg: '#C62828' }
}

// Normalisasi nomor WhatsApp (ID: 08xx / +62 / 62, JP: 070·080·090 / +81 / 81) ke format
// digit-only berkode negara yang dipakai wa.me (mis. "6281234567" atau "817012345678").
export function toWaMeNumber(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, '')
  if (digits.startsWith('+')) return digits.slice(1)
  if (digits.startsWith('62') || digits.startsWith('81')) return digits
  if (digits.startsWith('08')) return `62${digits.slice(1)}`
  if (/^0[789]0/.test(digits)) return `81${digits.slice(1)}`
  return digits
}

// Hitung sisa hari (dibulatkan ke atas) dari sekarang sampai targetDate ('YYYY-MM-DD').
// Dipisah dari komponen supaya panggilan Date.now() tidak dianggap impure di render body.
export function daysUntil(targetDate: string): number {
  const target = new Date(`${targetDate}T00:00:00+09:00`).getTime()
  return Math.max(0, Math.ceil((target - Date.now()) / 86_400_000))
}

// Sisa hari (boleh negatif kalau sudah lewat) dari sekarang sampai timestamp ISO, mis. premium_until.
export function daysUntilIso(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000)
}
