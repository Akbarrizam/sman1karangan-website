import { Outlet } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useScrollToTop } from '@/hooks/useScrollToTop'

/**
 * Kerangka halaman utama: Navbar + konten halaman + Footer.
 * Semua halaman menggunakan layout ini melalui <Route element={<MainLayout />}>.
 */
export default function MainLayout() {
  useScrollToTop()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Konten halaman aktif dirender di sini oleh React Router */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
