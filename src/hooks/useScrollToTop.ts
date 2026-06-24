import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scroll ke atas halaman setiap kali route berubah.
 * Gunakan di dalam MainLayout.
 */
export function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
}
