import { useState } from 'react'
import {
  School,
  Monitor,
  Beaker,
  Library,
  Dumbbell,
  Users,
  Coffee,
  HeartPulse,
  Leaf,
  Compass,
  Sparkles,
  TreePine,
  Layers,
  Droplet,
} from 'lucide-react'
import SectionHeader from '@/components/sections/SectionHeader'
import Badge from '@/components/common/Badge'
import SEO from '@/components/common/SEO'
import ScrollReveal from '@/components/common/ScrollReveal'

type FacilityCategory = 'semua' | 'akademik' | 'pendukung' | 'olahraga-seni'

interface Facility {
  id: string
  name: string
  category: 'akademik' | 'pendukung' | 'olahraga-seni'
  description: string
  icon: React.ComponentType<any>
  status: 'Tersedia' | 'Pemeliharaan'
  image: string
}

const CATEGORY_FILTERS: { value: FacilityCategory; label: string }[] = [
  { value: 'semua', label: 'Semua Fasilitas' },
  { value: 'akademik', label: 'Fasilitas Akademik' },
  { value: 'pendukung', label: 'Layanan & Pendukung' },
  { value: 'olahraga-seni', label: 'Olahraga & Seni' },
]

const FACILITIES_DATA: Facility[] = [
  {
    id: 'ruang-kelas',
    name: 'Ruang Kelas Representatif',
    category: 'akademik',
    description: 'Seluruh ruang kelas dilengkapi dengan proyektor LCD, papan tulis ganda, ventilasi udara optimal, dan konektivitas Wi-Fi untuk mendukung pembelajaran interaktif modern.',
    icon: School,
    status: 'Tersedia',
    image: '/images/facility_kelas.png',
  },
  {
    id: 'lab-komputer',
    name: 'Laboratorium Komputer',
    category: 'akademik',
    description: 'Laboratorium multimedia dengan unit komputer berspesifikasi tinggi, ber-AC, dan terkoneksi internet serat optik untuk menunjang ANBK, ujian daring, dan praktek pemrograman.',
    icon: Monitor,
    status: 'Tersedia',
    image: '/images/facility_lab_komp.png',
  },
  {
    id: 'lab-ipa',
    name: 'Laboratorium IPA Terpadu',
    category: 'akademik',
    description: 'Fasilitas praktikum Fisika, Kimia, dan Biologi lengkap dengan peralatan eksperimen modern, mikroskop binokuler, model anatomi, serta sistem keselamatan laboratorium.',
    icon: Beaker,
    status: 'Tersedia',
    image: '/images/facility_lab_ipa.png',
  },
  {
    id: 'perpustakaan',
    name: 'Perpustakaan Widya Pustaka',
    category: 'akademik',
    description: 'Menyediakan ribuan koleksi buku pelajaran, referensi ilmiah, fiksi, dan jurnal ilmiah, dilengkapi dengan ruang baca lesehan ber-AC serta komputer akses e-library.',
    icon: Library,
    status: 'Tersedia',
    image: '/images/facility_perpus.png',
  },
  {
    id: 'aula',
    name: 'Aula SMANESKA',
    category: 'pendukung',
    description: 'Aula indoor serbaguna berkapasitas besar untuk pertemuan orang tua/wali murid, prosesi wisuda, pementasan seni drama/tari, dan seminar kesiswaan.',
    icon: Users,
    status: 'Tersedia',
    image: '/images/facility_aula.png',
  },
  {
    id: 'lapangan-olahraga',
    name: 'Lapangan Olahraga Multi-Fungsi',
    category: 'olahraga-seni',
    description: 'Lapangan terbuka yang terintegrasi untuk cabang olahraga basket, voli, futsal, dan bulu tangkis, dikelilingi oleh pepohonan rindang.',
    icon: Dumbbell,
    status: 'Tersedia',
    image: '/images/facility_lapangan.png',
  },
  {
    id: 'mushola',
    name: 'Mushola Al-Ikhlas',
    category: 'pendukung',
    description: 'Tempat ibadah yang bersih, luas, dan nyaman bagi warga sekolah muslim untuk melaksanakan sholat fardhu berjamaah maupun kegiatan kajian keagamaan.',
    icon: Compass,
    status: 'Tersedia',
    image: '/images/facility_mushola.png',
  },
  {
    id: 'uks',
    name: 'Unit Kesehatan Sekolah (UKS)',
    category: 'pendukung',
    description: 'Pusat pelayanan kesehatan pertolongan pertama siswa dengan fasilitas tempat tidur medis terpisah, obat-obatan dasar, alat ukur tekanan darah, dan tim PMR siaga.',
    icon: HeartPulse,
    status: 'Tersedia',
    image: '/images/facility_uks.png',
  },
  {
    id: 'kantin',
    name: 'Kantin Sehat & Higienis',
    category: 'pendukung',
    description: 'Kantin sekolah dengan standar kebersihan tinggi yang hanya menyajikan makanan sehat bebas pengawet/pewarna berbahaya, dilengkapi area makan terbuka.',
    icon: Coffee,
    status: 'Tersedia',
    image: '/images/facility_kantin.png',
  },
  {
    id: 'taman-green-school',
    name: 'Taman & Hutan Sekolah',
    category: 'olahraga-seni',
    description: 'Area hijau rimbun yang berfungsi sebagai paru-paru sekolah, area belajar luar ruang (outdoor classroom), serta sarana konservasi keanekaragaman hayati lokal.',
    icon: Leaf,
    status: 'Tersedia',
    image: '/images/facility_hutan.png',
  },
]

const GREEN_FEATURES = [
  {
    icon: TreePine,
    title: 'Hutan Sekolah & RTH',
    description: 'Lebih dari 40% area sekolah didedikasikan sebagai Ruang Terbuka Hijau (RTH) dengan ratusan jenis pepohonan pelindung yang membuat udara sekolah tetap sejuk dan asri.',
  },
  {
    icon: Layers,
    title: 'Rumah Kompos Organik',
    description: 'Fasilitas daur ulang sampah daun menjadi pupuk kompos organik yang digunakan kembali untuk merawat seluruh tanaman di area sekolah.',
  },
  {
    icon: Droplet,
    title: 'Biopori & Sumur Resapan',
    description: 'Ratusan lubang biopori dan sumur resapan tersebar di seluruh penjuru sekolah untuk mencegah genangan air sekaligus mengoptimalkan cadangan air tanah.',
  },
]

const ZONES_DATA = [
  {
    id: 'zona_a',
    name: 'Zona A',
    title: 'Gedung Utama & Administrasi',
    description: 'Pusat pelayanan administrasi sekolah dan manajemen akademik SMANESKA. Di sinilah seluruh kegiatan struktural dan pelayanan kedinasan berlangsung.',
    rooms: [
      { name: 'Lobi Utama', desc: 'Area penerimaan tamu dan pusat informasi sekolah dengan galeri piala penghargaan.', icon: School },
      { name: 'Ruang Kepala Sekolah', desc: 'Ruang kerja Kepala Sekolah SMAN 1 Karangan, Bapak Agus Joko Santoso, S.Pd.', icon: Users },
      { name: 'Ruang Guru & Staff', desc: 'Ruang kerja guru pendidik yang luas, nyaman, dilengkapi koneksi Wi-Fi kencang.', icon: Users },
      { name: 'Tata Usaha (TU)', desc: 'Pusat administrasi siswa, surat-menyurat, serta pelayanan kesiswaan & alumni.', icon: School },
    ]
  },
  {
    id: 'zona_b',
    name: 'Zona B',
    title: 'Kompleks Sains & Literasi',
    description: 'Pusat eksplorasi sains, teknologi informasi, dan peningkatan literasi siswa. Dilengkapi sarana teknologi mutakhir dan koleksi pustaka lengkap.',
    rooms: [
      { name: 'Lab IPA Terpadu', desc: 'Ruang praktikum Fisika, Kimia, dan Biologi dengan alat ukur presisi dan mikroskop.', icon: Beaker },
      { name: 'Lab Komputer Multimedia', desc: 'Dilengkapi PC modern untuk ANBK, kelas coding, dan desain grafis.', icon: Monitor },
      { name: 'Perpustakaan Widya Pustaka', desc: 'Menyediakan ribuan buku cetak, referensi digital, dan ruang baca ber-AC.', icon: Library },
    ]
  },
  {
    id: 'zona_c',
    name: 'Zona C',
    title: 'Area Olahraga & Sanggar Seni',
    description: 'Tempat pengembangan minat dan bakat non-akademik siswa. Menjadi tempat pelestarian budaya lokal seperti seni tari khas Turonggo Yakso.',
    rooms: [
      { name: 'Sanggar Tari Turonggo Yakso', desc: 'Sanggar khusus untuk berlatih tari jaranan khas Trenggalek, Turonggo Yakso.', icon: Sparkles },
      { name: 'Sanggar Karawitan & Gamelan', desc: 'Fasilitas gamelan lengkap untuk ekstra kurikuler musik tradisional Jawa.', icon: Sparkles },
      { name: 'Lapangan Olahraga Multi-fungsi', desc: 'Lapangan outdoor serbaguna untuk basket, voli, dan futsal.', icon: Dumbbell },
    ]
  },
  {
    id: 'zona_d',
    name: 'Zona D',
    title: 'Area Green School & Fasilitas Umum',
    description: 'Zona bernuansa alam untuk mendukung kenyamanan fisik dan spiritual warga sekolah, serta pusat pelestarian lingkungan hidup.',
    rooms: [
      { name: 'Mushola Al-Ikhlas', desc: 'Tempat ibadah bersih dan nyaman berkapasitas besar bagi warga sekolah.', icon: Compass },
      { name: 'Hutan & Taman Sekolah', desc: 'Ruang terbuka hijau rimbun yang asri dengan beraneka ragam pohon rindang.', icon: TreePine },
      { name: 'Rumah Kompos Organik', desc: 'Tempat pengolahan sampah organik daun gugur menjadi pupuk tanaman.', icon: Layers },
      { name: 'Kantin Sehat SMANESKA', desc: 'Kantin higienis penyedia makanan & minuman sehat bergizi tinggi.', icon: Coffee },
    ]
  }
]

export default function Facilities() {
  const [activeCategory, setActiveCategory] = useState<FacilityCategory>('semua')
  const [activeZone, setActiveZone] = useState<'zona_a' | 'zona_b' | 'zona_c' | 'zona_d'>('zona_a')

  const filteredFacilities =
    activeCategory === 'semua'
      ? FACILITIES_DATA
      : FACILITIES_DATA.filter((fac) => fac.category === activeCategory)

  return (
    <>
      <SEO
        title="Fasilitas & Sarana"
        description="Jelajahi berbagai fasilitas penunjang kegiatan belajar, olahraga, seni budaya, serta area konservasi hijau (Green School) di SMA Negeri 1 Karangan."
        keywords="fasilitas sman 1 karangan, sarana prasarana smaneska, green school trenggalek, laboratorium ipa sma, perpustakaan sekolah"
      />
      {/* ─── PAGE HEADER ─────────────────────────────────────── */}
      <section className="relative bg-forest pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 80% 40%, #c98a2b 0%, transparent 55%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="gold" className="mb-4">Sarana & Prasarana</Badge>
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4 leading-tight">
            Fasilitas Sekolah
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            SMANESKA berkomitmen menyediakan lingkungan belajar terbaik dengan sarana pendukung 
            yang memadai, aman, serta berbasis pelestarian lingkungan.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-canvas" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ─── PETA SEKOLAH INTERAKTIF ──────────────────────────────── */}
      <section className="bg-paper py-16 lg:py-20 border-b border-ink/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Denah Kampus"
            title="Peta Sekolah Interaktif"
            description="Gunakan peta interaktif di bawah ini untuk menjelajahi wilayah SMANESKA secara langsung. Klik pada zona di peta untuk menampilkan detail ruangan."
          />

          {/* Zona Switcher for Mobile/Tablet */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 lg:hidden">
            {ZONES_DATA.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  activeZone === zone.id
                    ? zone.id === 'zona_a'
                      ? 'bg-forest text-white border-forest shadow-sm'
                      : zone.id === 'zona_b'
                      ? 'bg-gold text-white border-gold shadow-sm'
                      : zone.id === 'zona_c'
                      ? 'bg-turonggo text-white border-turonggo shadow-sm'
                      : 'bg-forest/90 text-white border-forest shadow-sm'
                    : 'bg-paper text-ink/75 hover:bg-ink/5 border-ink/10'
                }`}
              >
                {zone.name}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-10">
            {/* Left side: Interactive SVG Map */}
            <ScrollReveal animation="fade-in-left" className="lg:col-span-7 bg-canvas border border-ink/8 p-4 sm:p-6 rounded-3xl shadow-inner">
              <svg viewBox="0 0 600 460" className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
                {/* Grid background for blueprint effect */}
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(22, 35, 27, 0.03)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" rx="16" />

                {/* Main Gate & Entrance Road */}
                <path d="M 300 460 L 300 400" stroke="#e2e8f0" strokeWidth="32" strokeLinecap="square" opacity="0.8" />
                <path d="M 300 460 L 300 400" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                
                {/* Pathways connecting zones */}
                <path d="M 300 320 L 300 240 M 150 240 L 450 240 M 150 240 L 150 110 M 450 240 L 450 110 M 300 110 L 300 90" 
                      stroke="#e2e8f0" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                <path d="M 300 320 L 300 240 M 150 240 L 450 240 M 150 240 L 150 110 M 450 240 L 450 110 M 300 110 L 300 90" 
                      stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />

                {/* Central Circle Courtyard */}
                <circle cx="300" cy="210" r="45" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="6" />
                <circle cx="300" cy="210" r="36" fill="#e8f5e9" />
                <text x="300" y="214" textAnchor="middle" className="fill-forest font-mono text-[9px] font-bold uppercase tracking-wider">Taman Utama</text>

                {/* Tiny Trees / Bush Details around courtyard */}
                <circle cx="255" cy="190" r="6" fill="#81c784" opacity="0.8" />
                <circle cx="345" cy="190" r="6" fill="#81c784" opacity="0.8" />
                <circle cx="255" cy="230" r="6" fill="#81c784" opacity="0.8" />
                <circle cx="345" cy="230" r="6" fill="#81c784" opacity="0.8" />
                <circle cx="300" cy="165" r="7" fill="#4caf50" opacity="0.9" />

                {/* ZONA A (Bawah) */}
                <g 
                  onClick={() => setActiveZone('zona_a')}
                  className="group cursor-pointer transition-all duration-300"
                >
                  <rect 
                    x="120" y="320" width="360" height="80" rx="12" 
                    className={`transition-all duration-300 ${
                      activeZone === 'zona_a'
                        ? 'fill-forest stroke-gold stroke-2 shadow-lg'
                        : 'fill-paper stroke-ink/10 stroke-1 hover:fill-forest/5'
                    }`}
                  />
                  <text 
                    x="300" y="356" textAnchor="middle" 
                    className={`font-display font-bold text-sm transition-colors duration-300 ${
                      activeZone === 'zona_a' ? 'fill-white' : 'fill-ink'
                    }`}
                  >
                    Zona A: Gedung Utama
                  </text>
                  <text 
                    x="300" y="376" textAnchor="middle" 
                    className={`font-sans text-[10px] uppercase tracking-wider font-semibold transition-colors duration-300 ${
                      activeZone === 'zona_a' ? 'fill-gold' : 'fill-ink/40'
                    }`}
                  >
                    Administrasi & Pelayanan
                  </text>
                </g>

                {/* ZONA B (Kiri) */}
                <g 
                  onClick={() => setActiveZone('zona_b')}
                  className="group cursor-pointer transition-all duration-300"
                >
                  <rect 
                    x="50" y="110" width="180" height="190" rx="12" 
                    className={`transition-all duration-300 ${
                      activeZone === 'zona_b'
                        ? 'fill-gold stroke-forest stroke-2 shadow-lg'
                        : 'fill-paper stroke-ink/10 stroke-1 hover:fill-gold/5'
                    }`}
                  />
                  <text 
                    x="140" y="195" textAnchor="middle" 
                    className={`font-display font-bold text-sm transition-colors duration-300 ${
                      activeZone === 'zona_b' ? 'fill-white' : 'fill-ink'
                    }`}
                  >
                    Zona B: Sains & Literasi
                  </text>
                  <text 
                    x="140" y="215" textAnchor="middle" 
                    className={`font-sans text-[10px] uppercase tracking-wider font-semibold transition-colors duration-300 ${
                      activeZone === 'zona_b' ? 'fill-forest' : 'fill-ink/40'
                    }`}
                  >
                    Lab & Perpustakaan
                  </text>
                </g>

                {/* ZONA C (Kanan) */}
                <g 
                  onClick={() => setActiveZone('zona_c')}
                  className="group cursor-pointer transition-all duration-300"
                >
                  <rect 
                    x="370" y="110" width="180" height="190" rx="12" 
                    className={`transition-all duration-300 ${
                      activeZone === 'zona_c'
                        ? 'fill-turonggo stroke-gold stroke-2 shadow-lg'
                        : 'fill-paper stroke-ink/10 stroke-1 hover:fill-turonggo/5'
                    }`}
                  />
                  <text 
                    x="460" y="195" textAnchor="middle" 
                    className={`font-display font-bold text-sm transition-colors duration-300 ${
                      activeZone === 'zona_c' ? 'fill-white' : 'fill-ink'
                    }`}
                  >
                    Zona C: Olahraga & Seni
                  </text>
                  <text 
                    x="460" y="215" textAnchor="middle" 
                    className={`font-sans text-[10px] uppercase tracking-wider font-semibold transition-colors duration-300 ${
                      activeZone === 'zona_c' ? 'fill-gold' : 'fill-ink/40'
                    }`}
                  >
                    Lapangan & Sanggar Tari
                  </text>
                </g>

                {/* ZONA D (Atas) */}
                <g 
                  onClick={() => setActiveZone('zona_d')}
                  className="group cursor-pointer transition-all duration-300"
                >
                  <rect 
                    x="50" y="20" width="500" height="70" rx="12" 
                    className={`transition-all duration-300 ${
                      activeZone === 'zona_d'
                        ? 'fill-forest/90 stroke-gold stroke-2 shadow-lg'
                        : 'fill-paper stroke-ink/10 stroke-1 hover:fill-forest/5'
                    }`}
                  />
                  <text 
                    x="300" y="52" textAnchor="middle" 
                    className={`font-display font-bold text-sm transition-colors duration-300 ${
                      activeZone === 'zona_d' ? 'fill-white' : 'fill-ink'
                    }`}
                  >
                    Zona D: Green School & Umum
                  </text>
                  <text 
                    x="300" y="70" textAnchor="middle" 
                    className={`font-sans text-[10px] uppercase tracking-wider font-semibold transition-colors duration-300 ${
                      activeZone === 'zona_d' ? 'fill-gold' : 'fill-ink/40'
                    }`}
                  >
                    Mushola, Hutan Sekolah & Kantin
                  </text>
                </g>

                {/* Compass Rose or directional indicator */}
                <g transform="translate(565, 425)" opacity="0.6">
                  <circle r="18" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  <polygon points="0,-14 4,0 0,-2" fill="#a33b2e" />
                  <polygon points="0,14 4,0 0,2" fill="#64748b" />
                  <polygon points="0,-14 -4,0 0,-2" fill="#a33b2e" />
                  <polygon points="0,14 -4,0 0,2" fill="#64748b" />
                  <text y="-18" textAnchor="middle" className="font-mono text-[9px] font-bold fill-ink">U</text>
                </g>
              </svg>
            </ScrollReveal>

            {/* Right side: Detailed Zone Info Panel */}
            <ScrollReveal animation="fade-in-right" className="lg:col-span-5 h-full flex flex-col">
              {(() => {
                const zoneData = ZONES_DATA.find((z) => z.id === activeZone)!
                return (
                  <div className="bg-paper border border-ink/8 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full min-h-[460px] animate-fade-in-up">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold font-mono border ${
                          activeZone === 'zona_a'
                            ? 'bg-forest/10 text-forest border-forest/20'
                            : activeZone === 'zona_b'
                            ? 'bg-gold/10 text-gold border-gold/20'
                            : activeZone === 'zona_c'
                            ? 'bg-turonggo/10 text-turonggo border-turonggo/20'
                            : 'bg-forest/10 text-forest border-forest/20'
                        }`}>
                          {zoneData.name.toUpperCase()}
                        </span>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-ink leading-tight">
                          {zoneData.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-ink/70 leading-relaxed mb-6">
                        {zoneData.description}
                      </p>

                      <div className="space-y-4">
                        <h4 className="font-mono text-[10px] text-ink/40 uppercase tracking-widest font-semibold">
                          Daftar Ruangan & Fasilitas:
                        </h4>
                        <div className="grid gap-3.5">
                          {zoneData.rooms.map((room, idx) => {
                            const RoomIcon = room.icon
                            return (
                              <div
                                key={idx}
                                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-canvas border border-ink/6 hover:border-forest/20 hover:bg-paper hover:shadow-sm transition-all duration-200"
                              >
                                <div className={`size-9 rounded-xl flex items-center justify-center shrink-0 ${
                                  activeZone === 'zona_a'
                                    ? 'bg-forest/8 text-forest'
                                    : activeZone === 'zona_b'
                                    ? 'bg-gold/8 text-gold'
                                    : activeZone === 'zona_c'
                                    ? 'bg-turonggo/8 text-turonggo'
                                    : 'bg-forest/8 text-forest'
                                }`}>
                                  <RoomIcon className="size-5" />
                                </div>
                                <div>
                                  <h5 className="font-display font-bold text-sm text-ink mb-1">
                                    {room.name}
                                  </h5>
                                  <p className="text-xs text-ink/65 leading-relaxed">
                                    {room.desc}
                                  </p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-ink/6 flex items-center justify-between text-[10px] font-mono text-ink/40 uppercase tracking-wider">
                      <span>Sektor Kampus SMANESKA</span>
                      <span className="flex items-center gap-1.5 font-semibold">
                        <span className={`size-2 rounded-full ${
                          activeZone === 'zona_a' ? 'bg-forest' : activeZone === 'zona_b' ? 'bg-gold' : activeZone === 'zona_c' ? 'bg-turonggo' : 'bg-forest/80'
                        } animate-pulse`} />
                        Aktif &amp; Terverifikasi
                      </span>
                    </div>
                  </div>
                )
              })()}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── FASILITAS UTAMA ───────────────────────────────────── */}
      <section className="bg-canvas py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Sarana Belajar"
            title="Daftar Fasilitas SMANESKA"
            description="Kami menyediakan berbagai fasilitas representatif untuk menunjang kebutuhan belajar-mengajar, minat-bakat kesiswaan, dan layanan kesehatan sekolah."
          />

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORY_FILTERS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === value
                    ? 'bg-forest text-white shadow-md shadow-forest/15'
                    : 'bg-paper border border-ink/10 text-ink/60 hover:border-forest/30 hover:text-forest'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Grid Fasilitas */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredFacilities.map((fac, index) => {
              const IconComponent = fac.icon
              return (
                <ScrollReveal
                  key={fac.id}
                  animation="fade-in-up"
                  delay={(index % 3) * 100}
                  className="group flex flex-col justify-between rounded-2xl bg-paper border border-ink/8 p-6 hover:shadow-xl hover:shadow-forest/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    {/* Facility Cover Image with Corner Badge */}
                    <div className="w-full h-44 rounded-xl mb-6 bg-forest/5 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 border border-ink/6">
                      <img
                        src={fac.image}
                        alt={fac.name}
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute bottom-3 right-3 size-9 rounded-xl bg-paper/90 backdrop-blur-sm flex items-center justify-center shadow-sm text-forest border border-ink/10">
                        <IconComponent className="size-4.5 group-hover:rotate-6 transition-transform duration-300" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-display font-bold text-ink text-lg group-hover:text-forest transition-colors">
                        {fac.name}
                      </h3>
                      <Badge variant={fac.status === 'Tersedia' ? 'forest' : 'turonggo'} size="sm" className="shrink-0">
                        {fac.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-ink/65 leading-relaxed">
                      {fac.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-ink/6 flex items-center text-xs font-mono text-ink/40">
                    <span className="uppercase tracking-wider">
                      Kategori: {CATEGORY_FILTERS.find((f) => f.value === fac.category)?.label.replace('Fasilitas ', '').replace('Layanan & ', '')}
                    </span>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── GREEN EDUCATION SCHOOL ──────────────────────────────── */}
      <section className="bg-paper py-16 lg:py-24 border-y border-ink/6 overflow-hidden relative">
        {/* Dekorasi lingkaran background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-forest/3 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="gold" className="mb-4 inline-flex items-center gap-1">
              <Sparkles className="size-3.5" />
              Green Education School
            </Badge>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-4 tracking-tight">
              Sekolah Berwawasan Lingkungan & Asri
            </h2>
            <p className="text-ink/60 text-base sm:text-lg leading-relaxed">
              SMANESKA secara konsisten menerapkan konsep sekolah hijau. Lingkungan yang tertata, rindang, 
              dan nyaman dipercaya mampu meningkatkan fokus serta kesejahteraan psikologis seluruh siswa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {GREEN_FEATURES.map((item, idx) => {
              const GreenIcon = item.icon
              return (
                <div
                  key={idx}
                  className="bg-canvas border border-ink/6 rounded-2xl p-6 lg:p-8 flex flex-col items-start hover:border-forest/30 transition-all"
                >
                  <div className="size-12 rounded-xl bg-forest flex items-center justify-center text-white mb-6">
                    <GreenIcon className="size-6" />
                  </div>
                  <h3 className="font-display font-bold text-ink text-lg mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Quote Banner */}
          <div className="mt-16 p-8 lg:p-12 rounded-3xl bg-forest text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #c98a2b 0%, transparent 60%)' }}
            />
            <h3 className="font-display italic text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed relative z-10">
              "Lingkungan belajar yang tertata rapi, bersih, dan asri adalah kunci lahirnya karya-karya nyata yang mantap."
            </h3>
            <p className="font-mono text-xs text-white/50 uppercase tracking-widest mt-4 relative z-10">
              — Visi Sekolah Hijau SMANESKA
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
