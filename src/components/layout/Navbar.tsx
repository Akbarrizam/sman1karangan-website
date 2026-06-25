import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ROUTE_PATHS } from '@/routes/routePaths'
import { SITE_CONFIG } from '@/constants/siteConfig'
import { useScrolled } from '@/hooks/useScrolled'
import { cx } from '@/utils'

interface NavItem {
  label: string
  path?: string
  children?: { label: string; path: string }[]
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda', path: ROUTE_PATHS.HOME },
  {
    label: 'Profil',
    children: [
      { label: 'Sejarah & Identitas', path: ROUTE_PATHS.PROFILE },
      { label: 'Visi & Misi', path: ROUTE_PATHS.PROFILE_VISION },
      { label: 'Struktur Organisasi', path: ROUTE_PATHS.PROFILE_STRUCTURE },
    ],
  },
  {
    label: 'Akademik',
    children: [
      { label: 'Kurikulum', path: ROUTE_PATHS.ACADEMIC_CURRICULUM },
      { label: 'Kalender Akademik', path: ROUTE_PATHS.ACADEMIC_CALENDAR },
      { label: 'Daftar Guru', path: ROUTE_PATHS.ACADEMIC_TEACHERS },
    ],
  },
  {
    label: 'Kesiswaan',
    children: [
      { label: 'Ekstrakurikuler', path: ROUTE_PATHS.STUDENT_EXTRACURRICULAR },
      { label: 'OSIS', path: ROUTE_PATHS.STUDENT_OSIS },
      { label: 'Tata Tertib', path: ROUTE_PATHS.STUDENT_RULES },
    ],
  },
  { label: 'Fasilitas', path: ROUTE_PATHS.FACILITIES },
  { label: 'Prestasi', path: ROUTE_PATHS.ACHIEVEMENTS },
  { label: 'Berita', path: ROUTE_PATHS.NEWS },
  { label: 'PPDB', path: ROUTE_PATHS.ADMISSION },
  { label: 'Kontak', path: ROUTE_PATHS.CONTACT },
]

export default function Navbar() {
  const scrolled = useScrolled(60)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Tutup mobile menu saat resize ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false)
        setOpenDropdown(null)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Kunci scroll body saat mobile menu terbuka
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = () => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }


  return (
    <>
      <header
        className={cx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-forest/98 backdrop-blur-md shadow-lg shadow-forest/20'
            : 'bg-gradient-to-b from-forest/90 to-transparent',
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link
              to={ROUTE_PATHS.HOME}
              className="flex items-center gap-3 group shrink-0"
              onClick={closeMobile}
              aria-label="Beranda SMANESKA"
            >
              <div className="size-10 flex items-center justify-center shrink-0">
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
                <span className="font-display font-bold text-white text-lg tracking-tight">
                  SMANESKA
                </span>
                <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
                  {SITE_CONFIG.address.city}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1" role="menubar">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className="relative group"
                  role="none"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.children ? (
                    <>
                      <button
                        role="menuitem"
                        aria-haspopup="true"
                        aria-expanded={openDropdown === item.label}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                      >
                        {item.label}
                        <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" />
                      </button>

                      {/* Dropdown */}
                      <div
                        role="menu"
                        className={cx(
                          'absolute top-full left-0 mt-1 w-52 rounded-xl bg-white shadow-xl shadow-forest/15',
                          'border border-ink/8 py-1.5 transition-all duration-200 origin-top',
                          openDropdown === item.label
                            ? 'opacity-100 scale-100 pointer-events-auto'
                            : 'opacity-0 scale-95 pointer-events-none',
                        )}
                      >
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            role="menuitem"
                            className={({ isActive }) =>
                              cx(
                                'block px-4 py-2.5 text-sm transition-colors duration-150',
                                isActive
                                  ? 'text-forest font-semibold bg-forest/6'
                                  : 'text-ink/80 hover:text-forest hover:bg-forest/5',
                              )
                            }
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={item.path!}
                      role="menuitem"
                      className={({ isActive }) =>
                        cx(
                          'block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'text-gold font-semibold'
                            : 'text-white/80 hover:text-white hover:bg-white/10',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-toggle"
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex items-center justify-center size-10 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        aria-hidden={!mobileOpen}
        className={cx(
          'fixed inset-0 z-40 lg:hidden transition-all duration-300',
          mobileOpen ? 'visible' : 'invisible',
        )}
      >
        {/* Backdrop */}
        <div
          className={cx(
            'absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={closeMobile}
        />

        {/* Drawer */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Menu navigasi"
          className={cx(
            'absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl',
            'flex flex-col transition-transform duration-300 ease-out',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-forest">
            <div className="flex items-center gap-2">
              <img
                src="/images/logo.png"
                alt="Logo SMANESKA"
                className="size-6 object-contain"
                style={{
                  clipPath: 'polygon(50% 0%, 98% 33%, 78.5% 99%, 21.5% 99%, 2% 33%)'
                }}
              />
              <span className="font-display font-bold text-white">SMANESKA</span>
            </div>
            <button
              onClick={closeMobile}
              aria-label="Tutup menu"
              className="size-8 flex items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Drawer Nav */}
          <nav className="flex-1 overflow-y-auto py-3">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown((v) => (v === item.label ? null : item.label))
                      }
                      className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-ink hover:bg-forest/5 transition-colors"
                    >
                      {item.label}
                      <ChevronDown
                        className={cx(
                          'size-4 text-ink/40 transition-transform duration-200',
                          openDropdown === item.label && 'rotate-180',
                        )}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="bg-canvas/60 border-l-2 border-forest/20 ml-5">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            onClick={closeMobile}
                            className={({ isActive }) =>
                              cx(
                                'block px-5 py-2.5 text-sm transition-colors',
                                isActive
                                  ? 'text-forest font-semibold'
                                  : 'text-ink/70 hover:text-forest',
                              )
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path!}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      cx(
                        'block px-5 py-3 text-sm font-semibold transition-colors',
                        isActive
                          ? 'text-forest bg-forest/8'
                          : 'text-ink hover:text-forest hover:bg-forest/5',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Drawer Footer */}
          <div className="px-5 py-4 border-t border-ink/8">
            <p className="font-mono text-xs text-ink/40 text-center">
              © {new Date().getFullYear()} {SITE_CONFIG.fullName}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
