import { useState, useEffect } from 'react'

/**
 * Mendeteksi apakah pengguna sudah men-scroll melewati threshold tertentu.
 * Berguna untuk mengubah tampilan Navbar saat di-scroll.
 *
 * @param threshold - Jumlah pixel dari atas sebelum dianggap "scrolled" (default: 80)
 */
export function useScrolled(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold)

    // Cek kondisi awal
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
