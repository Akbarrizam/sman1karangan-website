import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, Trophy, Leaf, Quote, Star } from 'lucide-react'
import { ROUTE_PATHS } from '@/routes/routePaths'
import { SITE_CONFIG } from '@/constants/siteConfig'
import SectionHeader from '@/components/sections/SectionHeader'
import NewsCard from '@/components/sections/NewsCard'
import AchievementCard from '@/components/sections/AchievementCard'
import Button from '@/components/common/Button'
import SEO from '@/components/common/SEO'
import ScrollReveal from '@/components/common/ScrollReveal'
import newsData from '@/data/news.json'
import achievementsData from '@/data/achievements.json'
import testimonialsData from '@/data/testimonials.json'
import { type NewsArticle } from '@/types/news.types'
import { type Achievement } from '@/types/achievement.types'
import { type Testimonial } from '@/types'

const news = newsData as NewsArticle[]
const achievements = achievementsData as Achievement[]
const testimonials = testimonialsData as Testimonial[]


// Komponen animasi Counter/CountUp yang elegan menggunakan IntersectionObserver & requestAnimationFrame
function CountUp({ end, duration = 1500 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) return

    let startTimestamp: number | null = null
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step)
      }
    }
    animationFrameId = window.requestAnimationFrame(step)

    return () => window.cancelAnimationFrame(animationFrameId)
  }, [hasStarted, end, duration])

  return <span ref={ref}>{count}</span>
}

const STATS = [
  { icon: Users,    value: SITE_CONFIG.stats.students,           suffix: '',  label: 'Siswa Aktif' },
  { icon: BookOpen, value: SITE_CONFIG.stats.teachers,           suffix: '',  label: 'Tenaga Pendidik' },
  { icon: Trophy,   value: SITE_CONFIG.stats.achievements,       suffix: '+', label: 'Prestasi Diraih' },
  { icon: Leaf,     value: SITE_CONFIG.stats.extracurriculars,   suffix: '',  label: 'Ekstrakurikuler' },
]

export default function Home() {
  const featuredNews  = news.filter((n) => n.featured).slice(0, 1)
  const recentNews    = news.filter((n) => !n.featured).slice(0, 3)
  const topAchieve    = achievements
    .filter((a) => a.level === 'nasional' || a.level === 'provinsi')
    .slice(0, 3)

  const schoolSchema = {
    '@context': 'https://schema.org',
    '@type': 'School',
    'name': SITE_CONFIG.fullName,
    'alternateName': SITE_CONFIG.shortName,
    'description': SITE_CONFIG.description,
    'url': SITE_CONFIG.contact.website,
    'logo': `${SITE_CONFIG.contact.website}/logo.png`,
    'npsn': SITE_CONFIG.npsn,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': SITE_CONFIG.address.street,
      'addressLocality': SITE_CONFIG.address.city,
      'addressRegion': SITE_CONFIG.address.province,
      'postalCode': SITE_CONFIG.address.postalCode,
      'addressCountry': 'ID',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -8.05602,
      'longitude': 111.67756,
    },
    'telephone': SITE_CONFIG.contact.phone,
    'email': SITE_CONFIG.contact.email,
    'sameAs': [
      SITE_CONFIG.socialMedia.facebook,
      SITE_CONFIG.socialMedia.instagram,
      SITE_CONFIG.socialMedia.twitter,
    ].filter(Boolean),
  }

  return (
    <>
      <SEO
        title="Beranda"
        description="Selamat datang di Website Resmi SMA Negeri 1 Karangan (SMANESKA), Trenggalek. Sekolah berwawasan seni budaya, ramah lingkungan (Green School), dan program vokasional Double Track."
        keywords="sman 1 karangan, smaneska, sma trenggalek, sekolah double track, green education school trenggalek"
        schema={schoolSchema}
      />
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center bg-forest overflow-hidden"
      >
        {/* Background Image of the School */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform scale-[1.01]"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />

        {/* Gradient Overlay for Text Readability & Forest Branding Blending */}
        <div className="absolute inset-0 bg-gradient-to-tr from-forest/95 via-forest/80 to-black/40 z-0" />

        {/* Glowing Background Auras (Pulsing Lights) */}
        <div className="absolute top-1/4 right-1/4 size-[500px] rounded-full bg-gold/10 blur-[120px] animate-pulse-glow pointer-events-none z-0" />
        <div className="absolute bottom-1/4 left-10 size-[450px] rounded-full bg-white/4 blur-[100px] animate-pulse-glow pointer-events-none z-0" style={{ animationDelay: '-4s' }} />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] z-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating Leaf Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {[
            { left: '8%', size: 'size-4', delay: '0s', duration: '18s' },
            { left: '22%', size: 'size-6', delay: '3s', duration: '22s' },
            { left: '38%', size: 'size-5', delay: '7s', duration: '16s' },
            { left: '52%', size: 'size-4', delay: '2s', duration: '24s' },
            { left: '68%', size: 'size-7', delay: '5s', duration: '20s' },
            { left: '82%', size: 'size-5', delay: '1s', duration: '21s' },
            { left: '92%', size: 'size-4', delay: '9s', duration: '17s' },
          ].map((leaf, index) => (
            <div
              key={index}
              className={`absolute bottom-0 text-gold/15 animate-float-leaf ${leaf.size}`}
              style={{
                left: leaf.left,
                animationDelay: leaf.delay,
                animationDuration: leaf.duration,
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L2.18,20.66C4.26,15.49 6.87,8.27 17,6.24V2H21V6C21,12 17.5,18 10,21V19C16.5,16.5 17,11 17,8Z" />
              </svg>
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 z-10">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gold/15 border border-gold/25 mb-8">
                <span className="size-2 rounded-full bg-gold animate-pulse" />
                <span className="font-mono text-xs text-gold tracking-widest uppercase">
                  Est. {SITE_CONFIG.founded} · Kabupaten Trenggalek
                </span>
              </div>
            </div>

            {/* Title */}
            <h1
              className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              SMA Negeri 1<br />
              <span className="text-gold">Karangan</span>
            </h1>

            {/* Slogan */}
            <p
              className="font-display text-white/60 text-lg sm:text-xl italic mb-4 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '450ms' }}
            >
              "{SITE_CONFIG.tagline}"
            </p>

            {/* Motto */}
            <p
              className="text-white/50 text-sm font-mono tracking-wide mb-10 animate-fade-in-up"
              style={{ animationDelay: '600ms' }}
            >
              {SITE_CONFIG.motto}
            </p>

            {/* Buttons */}
            <div
              className="flex flex-wrap gap-4 animate-fade-in-up"
              style={{ animationDelay: '750ms' }}
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={() => (window.location.href = ROUTE_PATHS.ADMISSION)}
              >
                Daftar PPDB 2026/2027
                <ArrowRight className="size-4" />
              </Button>
              <Link
                to={ROUTE_PATHS.PROFILE}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200 text-base font-medium"
              >
                Profil Sekolah
              </Link>
            </div>
          </div>
        </div>

        {/* Gelombang bawah */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" className="w-full fill-canvas" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ─── STATISTIK ─────────────────────────────────────────── */}
      <section id="statistik" className="bg-canvas py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ icon: Icon, value, suffix, label }, index) => (
              <ScrollReveal
                key={label}
                animation="fade-in-up"
                delay={index * 100}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-paper border border-ink/8 hover:border-forest/20 hover:shadow-xl hover:-translate-y-1 hover:shadow-forest/5 transition-all duration-300"
              >
                <div className="size-12 rounded-xl bg-forest/8 flex items-center justify-center mb-4">
                  <Icon className="size-6 text-forest" />
                </div>
                <p className="font-display font-bold text-forest text-3xl mb-1">
                  <CountUp end={value} />{suffix}
                </p>
                <p className="font-mono text-xs text-ink/50 uppercase tracking-wider">{label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SAMBUTAN KEPALA SEKOLAH ───────────────────────────── */}
      <section id="sambutan" className="py-16 lg:py-20 bg-paper border-y border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Foto Kepala Sekolah */}
            <ScrollReveal animation="fade-in-left" className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-gold to-forest rounded-3xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative rounded-2xl overflow-hidden border-4 border-white bg-paper aspect-[4/5] w-72 sm:w-80 shadow-2xl">
                  <img
                    src="/images/pagus.jpg"
                    alt="Agus Joko Santoso, S.Pd"
                    className="size-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent p-4 text-center">
                    <p className="font-display font-semibold text-white text-base">Agus Joko Santoso, S.Pd</p>
                    <p className="text-xs text-gold/80 font-mono tracking-wider mt-0.5">Kepala Sekolah SMANESKA</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Pesan Sambutan */}
            <ScrollReveal animation="fade-in-right" className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest bg-forest/5 px-3 py-1 rounded-full border border-forest/10 inline-block mb-3">
                  Sambutan Resmi
                </span>
                <h2 className="font-display font-bold text-forest text-3xl sm:text-4xl leading-tight">
                  Maju Terus, Mantap Berkarya Nyata
                </h2>
              </div>

              <div className="space-y-4 text-ink/75 text-sm sm:text-base leading-relaxed">
                <p className="italic font-semibold text-forest text-base border-l-4 border-gold pl-4">
                  "Assalamu’alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera bagi Kita Semua."
                </p>
                <p>
                  Selamat datang di portal informasi resmi SMA Negeri 1 Karangan (SMANESKA) Trenggalek. 
                  Website ini kami dedikasikan sebagai wadah komunikasi, transparansi informasi, serta apresiasi terhadap 
                  seluruh karya dan dedikasi civitas akademika sekolah.
                </p>
                <p>
                  Sebagai lembaga pendidikan yang berkomitmen melahirkan generasi unggul berkarakter, 
                  kami bangga memadukan prestasi akademik dengan pelestarian nilai budaya lokal, khususnya 
                  seni tari Turonggo Yakso, serta pembekalan kecakapan hidup praktis vokasional melalui program 
                  Double Track. Kami percaya setiap anak memiliki potensi istimewa yang siap diasah secara optimal.
                </p>
                <p>
                  Mari kita bersatu, bersinergi, berkarya nyata, dan terus melangkah maju demi mewujudkan 
                  generasi penerus bangsa yang beriman, berprestasi, berkarakter, dan berbudaya lingkungan.
                </p>
              </div>

              <div className="pt-4 border-t border-ink/8 flex items-center justify-between">
                <div>
                  <p className="text-xs text-ink/40 font-mono uppercase tracking-wider">Hormat Kami,</p>
                  <p className="font-display font-bold text-forest text-base sm:text-lg mt-1">Agus Joko Santoso, S.Pd</p>
                  <p className="text-xs text-ink/50">Kepala Sekolah SMAN 1 Karangan</p>
                </div>
                <div className="font-signature text-6xl text-forest/35 select-none transform -rotate-3 tracking-wide pr-6 pointer-events-none">
                  Agus Joko S
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── IDENTITAS SEKOLAH ─────────────────────────────────── */}
      <section id="identitas" className="py-16 lg:py-20 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal animation="fade-in-left">
              <SectionHeader
                eyebrow="Tentang Kami"
                title="Sekolah Berwawasan Seni Budaya & Lingkungan Hijau"
                description={`${SITE_CONFIG.fullName} adalah sekolah menengah atas negeri di Kabupaten Trenggalek yang berdiri sejak ${SITE_CONFIG.founded}. Kami dikenal sebagai sekolah yang memadukan keunggulan akademik dengan kecintaan pada seni budaya dan semangat Green Education School.`}
              />
              <Link to={ROUTE_PATHS.PROFILE}>
                <Button variant="outline" size="md">
                  Selengkapnya
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </ScrollReveal>

            {/* Visi-Misi ringkas */}
            <ScrollReveal animation="fade-in-right" className="space-y-4">
              <div className="p-6 rounded-2xl bg-forest text-white">
                <p className="font-mono text-xs text-gold/70 uppercase tracking-widest mb-2">Visi</p>
                <p className="font-display text-lg leading-snug font-semibold">
                  {SITE_CONFIG.vision}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {SITE_CONFIG.mission.slice(0, 3).map((m, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-canvas border border-ink/8">
                    <span className="font-mono text-xs font-bold text-gold/70 shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm text-ink/70 leading-relaxed">{m}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── BERITA & KEGIATAN ────────────────────────────────── */}
      <section id="berita" className="py-16 lg:py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Informasi Terkini"
            title="Berita & Kegiatan"
            description="Ikuti perkembangan terbaru kegiatan akademik, seni budaya, dan prestasi SMANESKA."
            action={
              <Link to={ROUTE_PATHS.NEWS}>
                <Button variant="ghost" size="sm">
                  Semua Berita <ArrowRight className="size-4" />
                </Button>
              </Link>
            }
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured article */}
            {featuredNews[0] && (
              <ScrollReveal animation="fade-in-up" delay={0} className="md:col-span-2 lg:col-span-1">
                <NewsCard article={featuredNews[0]} variant="featured" />
              </ScrollReveal>
            )}
            {/* Recent articles */}
            {recentNews.slice(0, 2).map((article, index) => (
              <ScrollReveal key={article.id} animation="fade-in-up" delay={(index + 1) * 150}>
                <NewsCard article={article} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRESTASI ─────────────────────────────────────────── */}
      <section id="prestasi" className="py-16 lg:py-20 bg-canvas border-y border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Kebanggaan SMANESKA"
            title="Prestasi Unggulan"
            description="Raihan SMANESKA di berbagai bidang — akademik, seni budaya, olahraga, dan kepramukaan."
            action={
              <Link to={ROUTE_PATHS.ACHIEVEMENTS}>
                <Button variant="ghost" size="sm">
                  Semua Prestasi <ArrowRight className="size-4" />
                </Button>
              </Link>
            }
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topAchieve.map((a, index) => (
              <ScrollReveal key={a.id} animation="fade-in-up" delay={index * 150}>
                <AchievementCard achievement={a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONI ALUMNI ────────────────────────────────── */}
      <section id="testimoni" className="py-16 lg:py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Kisah Sukses"
            title="Testimoni Alumni"
            align="center"
            description="Bagaimana SMANESKA membantu meletakkan landasan masa depan yang kokoh bagi para lulusan di tingkat perguruan tinggi maupun wirausaha mandiri."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {testimonials.map((testi, index) => (
              <ScrollReveal
                key={testi.id}
                animation="fade-in-up"
                delay={index * 150}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-canvas border border-ink/8 hover:border-forest/20 hover:shadow-xl hover:-translate-y-1 hover:shadow-forest/5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                    <Quote className="size-7 text-forest/10 group-hover:text-forest/20 transition-colors" />
                  </div>
                  <p className="text-ink/75 text-sm sm:text-base leading-relaxed italic mb-6">
                    "{testi.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-ink/8">
                  <div className="size-11 rounded-full overflow-hidden border border-forest/10 shrink-0">
                    <img
                      src={testi.photo}
                      alt={testi.name}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-ink text-sm sm:text-base leading-snug group-hover:text-forest transition-colors">
                      {testi.name}
                    </h4>
                    <p className="text-[10px] text-ink/50 font-mono tracking-wide uppercase mt-0.5">
                      Lulusan {testi.gradYear} · {testi.status}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* ─── CTA PPDB ─────────────────────────────────────────── */}
      <section id="ppdb-cta" className="py-16 bg-forest relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 50%, #c98a2b 0%, transparent 55%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-xs text-gold/70 uppercase tracking-widest mb-4">
            Penerimaan Peserta Didik Baru
          </p>
          <h2 className="font-display font-bold text-white text-3xl sm:text-4xl mb-4">
            PPDB SMANESKA 2026/2027
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Bergabunglah bersama keluarga besar SMANESKA. Pendaftaran online segera dibuka — pantau jadwal dan persyaratan lengkap di halaman PPDB.
          </p>
          <Link to={ROUTE_PATHS.ADMISSION}>
            <Button variant="secondary" size="lg">
              Informasi PPDB
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
