import { Link } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from 'lucide-react'

// SVG inline untuk ikon sosial media (lucide-react tidak menyertakannya)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)
import { ROUTE_PATHS } from '@/routes/routePaths'
import { SITE_CONFIG } from '@/constants/siteConfig'

const QUICK_LINKS = [
  { label: 'Beranda', path: ROUTE_PATHS.HOME },
  { label: 'Profil Sekolah', path: ROUTE_PATHS.PROFILE },
  { label: 'Akademik', path: ROUTE_PATHS.ACADEMIC },
  { label: 'Kesiswaan', path: ROUTE_PATHS.STUDENT },
  { label: 'Prestasi', path: ROUTE_PATHS.ACHIEVEMENTS },
  { label: 'Galeri', path: ROUTE_PATHS.GALLERY },
]

const PROGRAM_LINKS = [
  { label: 'Kurikulum', path: ROUTE_PATHS.ACADEMIC_CURRICULUM },
  { label: 'Program Double Track', path: ROUTE_PATHS.ACADEMIC },
  { label: 'Ekstrakurikuler', path: ROUTE_PATHS.STUDENT_EXTRACURRICULAR },
  { label: 'PPDB 2026/2027', path: ROUTE_PATHS.ADMISSION },
  { label: 'Berita & Kegiatan', path: ROUTE_PATHS.NEWS },
  { label: 'Kontak', path: ROUTE_PATHS.CONTACT },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-forest text-white/80">
      {/* Ornamen atas */}
      <div className="h-1 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Kolom 1 — Identitas Sekolah */}
          <div className="lg:col-span-1">
            <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-3 mb-5 group">
              <div className="size-11 flex items-center justify-center shrink-0">
                <img
                  src="/images/logo.png"
                  alt="Logo SMANESKA"
                  className="size-full object-contain"
                  style={{
                    clipPath: 'polygon(50% 0%, 98% 33%, 78.5% 99%, 21.5% 99%, 2% 33%)'
                  }}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-white text-xl">SMANESKA</span>
                <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                  Est. {SITE_CONFIG.founded}
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-white/60 mb-5">
              {SITE_CONFIG.description}
            </p>

            {/* Akreditasi badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/15 border border-gold/25">
              <span className="font-mono text-xs text-gold/80 uppercase tracking-wider">Akreditasi</span>
              <span className="font-display font-bold text-gold text-lg leading-none">
                {SITE_CONFIG.accreditation}
              </span>
            </div>

            {/* Sosial Media */}
            <div className="flex items-center gap-2 mt-6">
              {SITE_CONFIG.socialMedia.facebook && (
                <a
                  href={SITE_CONFIG.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook SMANESKA"
                  className="size-9 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
                >
                  <FacebookIcon />
                </a>
              )}
              {SITE_CONFIG.socialMedia.instagram && (
                <a
                  href={SITE_CONFIG.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram OSIS SMANESKA"
                  className="size-9 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
                >
                  <InstagramIcon />
                </a>
              )}
              {SITE_CONFIG.socialMedia.twitter && (
                <a
                  href={SITE_CONFIG.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter/X SMANESKA"
                  className="size-9 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
                >
                  <TwitterIcon />
                </a>
              )}
            </div>
          </div>

          {/* Kolom 2 — Link Cepat */}
          <div>
            <h3 className="font-display font-semibold text-white text-base mb-5">
              Navigasi
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white hover:gap-2.5 transition-all duration-200"
                  >
                    <span className="size-1.5 rounded-full bg-gold/60 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3 — Program */}
          <div>
            <h3 className="font-display font-semibold text-white text-base mb-5">
              Program & Layanan
            </h3>
            <ul className="space-y-2.5">
              {PROGRAM_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white hover:gap-2.5 transition-all duration-200"
                  >
                    <span className="size-1.5 rounded-full bg-gold/60 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4 — Kontak */}
          <div>
            <h3 className="font-display font-semibold text-white text-base mb-5">
              Hubungi Kami
            </h3>
            <address className="not-italic space-y-4">
              <div className="flex gap-3">
                <MapPin className="size-4 text-gold shrink-0 mt-0.5" />
                <p className="text-sm text-white/60 leading-relaxed">
                  {SITE_CONFIG.address.full}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-gold shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-gold shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </address>

            {/* Tombol ke halaman kontak */}
            <Link
              to={ROUTE_PATHS.CONTACT}
              className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-lg border border-white/20 text-sm text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200"
            >
              Lihat Peta Lokasi
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Baris bawah — copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-white/35 text-center sm:text-left">
            © {year} {SITE_CONFIG.fullName}. Seluruh hak cipta dilindungi.
          </p>
          <p className="font-mono text-xs text-white/25">
            NPSN {SITE_CONFIG.npsn}
          </p>
        </div>
      </div>
    </footer>
  )
}
