/**
 * Mengformat tanggal ISO 8601 menjadi format yang mudah dibaca dalam Bahasa Indonesia.
 * Membutuhkan `date-fns` dan `date-fns/locale`.
 */
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

/**
 * Format: "15 November 2025"
 */
export function formatDate(isoString: string): string {
  return format(parseISO(isoString), 'd MMMM yyyy', { locale: id })
}

/**
 * Format: "Nov 2025"
 */
export function formatDateShort(isoString: string): string {
  return format(parseISO(isoString), 'MMM yyyy', { locale: id })
}

/**
 * Format relatif: "3 hari yang lalu", "2 bulan yang lalu"
 */
export function formatRelativeDate(isoString: string): string {
  return formatDistanceToNow(parseISO(isoString), { addSuffix: true, locale: id })
}

/**
 * Mengubah string menjadi URL slug.
 * Contoh: "SMANESKA Maju Terus!" → "smaneska-maju-terus"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // hapus diakritik
    .replace(/[^a-z0-9\s-]/g, '')   // hanya huruf, angka, spasi, tanda hubung
    .trim()
    .replace(/\s+/g, '-')            // spasi → tanda hubung
    .replace(/-+/g, '-')             // tanda hubung berulang → satu
}

/**
 * Memotong teks panjang dengan ellipsis.
 * Contoh: truncate("Teks yang sangat panjang", 10) → "Teks yang…"
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

/**
 * Membuat class string dari array kondisi (utility serupa `clsx`).
 * Contoh: cx('base', isActive && 'active', 'other') → "base active other"
 */
export function cx(...classes: (string | boolean | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
