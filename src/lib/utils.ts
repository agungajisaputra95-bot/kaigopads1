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

// Hitung sisa hari (dibulatkan ke atas) dari sekarang sampai targetDate ('YYYY-MM-DD').
// Dipisah dari komponen supaya panggilan Date.now() tidak dianggap impure di render body.
export function daysUntil(targetDate: string): number {
  const target = new Date(`${targetDate}T00:00:00+09:00`).getTime()
  return Math.max(0, Math.ceil((target - Date.now()) / 86_400_000))
}
