import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Leaf,
  Music4,
  GraduationCap,
  Award,
  Layers,
  ArrowRight,
  Users,
} from 'lucide-react'
import { ROUTE_PATHS } from '@/routes/routePaths'
import { SITE_CONFIG } from '@/constants/siteConfig'
import SectionHeader from '@/components/sections/SectionHeader'
import Button from '@/components/common/Button'
import Badge from '@/components/common/Badge'
import SEO from '@/components/common/SEO'
import ScrollReveal from '@/components/common/ScrollReveal'
import teachersData from '@/data/teachers.json'
import { type Teacher } from '@/types/teacher.types'

const teachers = teachersData as Teacher[]


const MILESTONES = [
  { year: '1991', label: 'Sekolah didirikan di Kabupaten Trenggalek' },
  { year: '2000', label: 'Meraih Akreditasi A pertama kali' },
  { year: '2010', label: 'Ditetapkan sebagai sekolah berwawasan seni budaya' },
  { year: '2016', label: 'Pencanangan program Green Education School' },
  { year: '2019', label: 'Program Double Track vokasional dimulai' },
  { year: '2023', label: 'Akreditasi A dipertahankan, prestasi nasional meningkat' },
]

const HIGHLIGHTS = [
  {
    icon: Music4,
    title: 'Seni & Budaya Lokal',
    desc: 'Pelestari aktif Turonggo Yakso, Gamelan, Campursari, dan seni tari tradisional khas Trenggalek.',
  },
  {
    icon: Leaf,
    title: 'Green Education School',
    desc: 'Lingkungan sekolah hijau, bersih, dan tertata sebagai wujud kepedulian lingkungan hidup.',
  },
  {
    icon: Layers,
    title: 'Program Double Track',
    desc: 'Membekali siswa keterampilan vokasional setara SMK untuk kesiapan dunia kerja.',
  },
  {
    icon: Award,
    title: 'Prestasi Akademik',
    desc: 'Aktif di olimpiade sains, matematika, debat Bahasa Inggris, dan KIR tingkat nasional.',
  },
]

export default function Profile() {
  const { pathname } = useLocation()

  useEffect(() => {
    let targetId = ''
    if (pathname === ROUTE_PATHS.PROFILE || pathname === ROUTE_PATHS.PROFILE_HISTORY) {
      targetId = 'sejarah'
    } else if (pathname === ROUTE_PATHS.PROFILE_VISION) {
      targetId = 'visi-misi'
    } else if (pathname === ROUTE_PATHS.PROFILE_STRUCTURE) {
      targetId = 'struktur-organisasi'
    }

    if (targetId) {
      const el = document.getElementById(targetId)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname])

  const kepalaSekolah = teachers.find(t => t.position === 'Kepala Sekolah')
  const wakaList = teachers.filter(t => t.position && (t.position.includes('Waka') || t.position.startsWith('Wk')))


  return (
    <>
      <SEO
        title="Profil Sekolah"
        description="Profil resmi SMA Negeri 1 Karangan (SMANESKA) Trenggalek. Temukan sejarah berdirinya sekolah, visi dan misi, ciri khas kebudayaan lokal, akreditasi, dan informasi resmi lainnya."
        keywords="profil smaneska, sejarah sman 1 karangan, visi misi smaneska, akreditasi sman 1 karangan, sekolah menengah atas trenggalek"
      />
      {/* ─── PAGE HEADER ─────────────────────────────────────── */}
      <section className="relative bg-forest pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 80% 40%, #c98a2b 0%, transparent 55%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="gold" className="mb-4">Profil Sekolah</Badge>
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4 leading-tight">
            {SITE_CONFIG.fullName}
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            Mengenal lebih dalam identitas, sejarah, dan nilai-nilai yang membentuk SMANESKA
            sebagai sekolah unggul di Kabupaten Trenggalek.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-canvas" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ─── SEJARAH ─────────────────────────────────────────── */}
      <section id="sejarah" className="bg-canvas py-16 lg:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <ScrollReveal animation="fade-in-left">
              <SectionHeader
                eyebrow="Perjalanan Kami"
                title="Sejarah Singkat SMANESKA"
                description={`${SITE_CONFIG.fullName} (SMANESKA) berdiri pada tahun ${SITE_CONFIG.founded} di Kecamatan Karangan, Kabupaten Trenggalek, Jawa Timur. Selama lebih dari tiga dekade, SMANESKA telah berkembang menjadi salah satu sekolah menengah atas negeri terkemuka di Trenggalek dengan ciri khas yang kuat: perpaduan antara keunggulan akademik, kecintaan pada seni budaya lokal, dan komitmen terhadap lingkungan hidup.`}
              />
              <p className="text-ink/60 leading-relaxed mb-8">
                Dengan motto <em className="text-forest not-italic font-semibold">
                "Makarya Ngesti Kuncaraning Siwi, SMANESKA Maju Terus, Mantap Berkarya Nyata"</em>,
                sekolah ini terus melahirkan generasi yang beriman, berprestasi, dan berkarakter.
              </p>
              {/* Akreditasi */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-paper border border-ink/8">
                <div className="size-16 rounded-xl bg-gold/15 border-2 border-gold/30 flex flex-col items-center justify-center">
                  <span className="font-display font-bold text-gold text-3xl leading-none">A</span>
                </div>
                <div>
                  <p className="font-semibold text-ink">Akreditasi A</p>
                  <p className="text-sm text-ink/50">Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M)</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-forest via-gold to-transparent" />
              <div className="space-y-6">
                {MILESTONES.map((m, index) => (
                  <ScrollReveal
                    key={m.year}
                    animation="fade-in-up"
                    delay={index * 100}
                    className="flex gap-5 items-start pl-0"
                  >
                    <div className="shrink-0 relative">
                      <div className="size-12 rounded-xl bg-paper border-2 border-forest/30 flex items-center justify-center shadow-sm">
                        <span className="font-mono text-xs font-bold text-forest">{m.year}</span>
                      </div>
                    </div>
                    <div className="flex-1 pt-2.5">
                      <p className="text-sm text-ink/70 leading-relaxed">{m.label}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VISI & MISI ─────────────────────────────────────── */}
      <section id="visi-misi" className="bg-paper py-16 lg:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Arah & Tujuan"
            title="Visi & Misi"
            align="center"
          />
          {/* Visi */}
          <ScrollReveal animation="zoom-in" className="max-w-3xl mx-auto mb-12">
            <div className="relative p-8 rounded-2xl bg-forest text-white text-center overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle at 50% 50%, #c98a2b 0%, transparent 60%)',
                }}
              />
              <GraduationCap className="size-10 text-gold mx-auto mb-4 relative" />
              <p className="font-mono text-xs text-gold/70 uppercase tracking-widest mb-3 relative">Visi</p>
              <p className="font-display text-xl sm:text-2xl font-semibold leading-snug relative">
                {SITE_CONFIG.vision}
              </p>
            </div>
          </ScrollReveal>

          {/* Misi */}
          <div>
            <p className="font-mono text-xs text-forest/70 uppercase tracking-widest text-center mb-6">Misi</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {SITE_CONFIG.mission.map((m, i) => (
                <ScrollReveal
                  key={i}
                  animation="fade-in-up"
                  delay={i * 100}
                  className="flex gap-4 p-5 rounded-xl bg-canvas border border-ink/8 hover:border-forest/20 transition-colors"
                >
                  <span className="font-mono text-sm font-bold text-gold shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-ink/70 leading-relaxed">{m}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STRUKTUR ORGANISASI ─────────────────────────────── */}
      <section id="struktur-organisasi" className="bg-paper py-16 lg:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Manajemen"
            title="Struktur Organisasi"
            align="center"
            description="Struktur kepemimpinan dan wewenang di lingkungan SMA Negeri 1 Karangan."
          />
          
          <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto mt-10">
            {/* Kepala Sekolah */}
            {kepalaSekolah && (
              <ScrollReveal
                animation="zoom-in"
                className="flex flex-col items-center p-6 rounded-2xl bg-forest text-white w-64 text-center shadow-lg shadow-forest/10 border border-gold/25 group"
              >
                <div className="size-28 rounded-full border-4 border-white/20 flex items-center justify-center mb-4 overflow-hidden relative bg-white/10">
                  {kepalaSekolah.photo ? (
                    <img
                      src={kepalaSekolah.photo}
                      alt={kepalaSekolah.name}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Users className="size-12 text-gold" />
                  )}
                </div>
                <h3 className="font-display font-semibold text-lg leading-snug group-hover:text-gold transition-colors">{kepalaSekolah.name}</h3>
                <p className="text-xs text-gold/80 uppercase tracking-widest mt-1.5">{kepalaSekolah.position}</p>
              </ScrollReveal>
            )}

            {/* Hubungan Garis */}
            <div className="h-8 w-px bg-forest/30" />

            {/* Waka & Staf */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {wakaList.map((waka, index) => (
                <ScrollReveal
                  key={waka.id}
                  animation="fade-in-up"
                  delay={index * 100}
                  className="flex flex-col items-center p-5 rounded-2xl bg-canvas border border-ink/8 text-center shadow-sm hover:border-forest/20 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                >
                  <div className="size-24 rounded-full border-4 border-forest/10 flex items-center justify-center mb-3 overflow-hidden relative bg-forest/5">
                    {waka.photo ? (
                      <img
                        src={waka.photo}
                        alt={waka.name}
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Users className="size-10 text-forest" />
                    )}
                  </div>
                  <h4 className="font-display font-semibold text-ink text-sm sm:text-base leading-snug group-hover:text-forest transition-colors">{waka.name}</h4>
                  <p className="text-xs text-forest/70 uppercase tracking-widest mt-1.5 font-medium">{waka.position}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CIRI KHAS ───────────────────────────────────────── */}
      <section className="bg-canvas py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Keunggulan Kami"
            title="Ciri Khas SMANESKA"
            description="Yang membedakan kami dari sekolah lain di Kabupaten Trenggalek."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map(({ icon: Icon, title, desc }, index) => (
              <ScrollReveal
                key={title}
                animation="fade-in-up"
                delay={index * 100}
                className="group flex flex-col p-6 rounded-2xl bg-paper border border-ink/8 hover:border-forest/25 hover:shadow-lg hover:shadow-forest/8 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="size-12 rounded-xl bg-forest/8 flex items-center justify-center mb-5 group-hover:bg-forest/15 transition-colors">
                  <Icon className="size-6 text-forest" />
                </div>
                <h3 className="font-display font-semibold text-ink mb-2">{title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INFORMASI SEKOLAH ───────────────────────────────── */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Data Sekolah"
            title="Informasi Resmi"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {[
              { label: 'Nama Resmi',     value: SITE_CONFIG.fullName },
              { label: 'NPSN',           value: SITE_CONFIG.npsn },
              { label: 'Tahun Berdiri',  value: SITE_CONFIG.founded.toString() },
              { label: 'Akreditasi',     value: 'A (Unggul)' },
              { label: 'Kurikulum',      value: SITE_CONFIG.curriculum },
              { label: 'Program Khusus', value: SITE_CONFIG.specialization },
              { label: 'Alamat',         value: SITE_CONFIG.address.full },
              { label: 'Telepon',        value: SITE_CONFIG.contact.phone },
              { label: 'Email',          value: SITE_CONFIG.contact.email },
            ].map(({ label, value }, index) => (
              <ScrollReveal
                key={label}
                animation="fade-in-up"
                delay={(index % 3) * 100}
                className="p-4 rounded-xl bg-canvas border border-ink/8"
              >
                <p className="font-mono text-xs text-ink/40 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm font-medium text-ink">{value}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="bg-canvas py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-forest">
          <div>
            <p className="font-mono text-xs text-gold/70 uppercase tracking-widest mb-1">Tertarik bergabung?</p>
            <h2 className="font-display font-bold text-white text-xl">Daftarkan diri di PPDB 2026/2027</h2>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to={ROUTE_PATHS.CONTACT}>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                Hubungi Kami
              </Button>
            </Link>
            <Link to={ROUTE_PATHS.ADMISSION}>
              <Button variant="secondary">
                Info PPDB <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
