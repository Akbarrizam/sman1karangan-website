import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '@/routes/routePaths'
import SEO from '@/components/common/SEO'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-canvas">
      <SEO title="Halaman Tidak Ditemukan" />
      <p className="font-mono text-8xl font-bold text-forest/20">404</p>
      <h1 className="text-2xl font-display font-semibold text-ink">Halaman Tidak Ditemukan</h1>
      <p className="text-ink/60 text-center max-w-sm">
        Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
      </p>
      <Link
        to={ROUTE_PATHS.HOME}
        className="px-6 py-3 bg-forest text-white rounded-lg font-medium hover:bg-forest/90 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  )
}
