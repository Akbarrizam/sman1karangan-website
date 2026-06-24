import { useState } from 'react'
import {
  CheckCircle,
  Calendar,
  ExternalLink,
  FileText,
  ChevronDown,
  ChevronUp,
  Phone,
  Award,
  MapPin,
  Users,
  Briefcase,
  Download,
} from 'lucide-react'
import SectionHeader from '@/components/sections/SectionHeader'
import Badge from '@/components/common/Badge'
import SEO from '@/components/common/SEO'
import Button from '@/components/common/Button'
import ScrollReveal from '@/components/common/ScrollReveal'


interface Pathway {
  id: string
  name: string
  quota: string
  description: string
  icon: React.ComponentType<any>
  details: string[]
}

const ADMISSION_PATHWAYS: Pathway[] = [
  {
    id: 'zonasi',
    name: 'Jalur Zonasi',
    quota: '50%',
    description: 'Diperuntukkan bagi calon peserta didik baru yang berdomisili di dalam wilayah zonasi yang ditetapkan.',
    icon: MapPin,
    details: [
      'Domisili berdasarkan alamat Kartu Keluarga (KK) yang diterbitkan paling singkat 1 tahun sebelum tanggal pendaftaran.',
      'Kuota terbesar (minimal 50%) dari total pagu sekolah.',
      'Sistem seleksi berdasarkan jarak terdekat dari domisili ke sekolah via pemetaan GPS.',
    ],
  },
  {
    id: 'prestasi',
    name: 'Jalur Prestasi',
    quota: '30%',
    description: 'Bagi siswa berprestasi baik di bidang nilai akademik (Rapor) maupun prestasi hasil kejuaraan/perlombaan.',
    icon: Award,
    details: [
      'Prestasi Hasil Asesmen Akademik (gabungan rata-rata nilai rapor semester 1-5 dan nilai akreditasi sekolah asal).',
      'Prestasi Hasil Perlombaan/Kejuaraan baik akademik maupun non-akademik (olahraga, seni, keagamaan) tingkat kabupaten/provinsi/nasional.',
      'Piagam kejuaraan harus dilegalisir oleh dinas terkait.',
    ],
  },
  {
    id: 'afirmasi',
    name: 'Jalur Afirmasi',
    quota: '15%',
    description: 'Khusus bagi calon peserta didik dari keluarga tidak mampu dan anak penyandang disabilitas.',
    icon: Users,
    details: [
      'Dibuktikan dengan kepemilikan kartu program bantuan pemerintah (KIP, PKH, KKS, dll).',
      'Kuotanya meliputi 15% dari total daya tampung sekolah.',
      'Wajib menyertakan surat pernyataan pertanggungjawaban mutlak dari orang tua/wali.',
    ],
  },
  {
    id: 'perpindahan',
    name: 'Jalur Pindah Tugas',
    quota: '5%',
    description: 'Bagi calon peserta didik baru yang orang tua/walinya dipindahtugaskan atau anak guru/tenaga kependidikan.',
    icon: Briefcase,
    details: [
      'Dibuktikan dengan Surat Keputusan (SK) mutasi/perpindahan tugas dari instansi, lembaga, kantor, atau perusahaan yang mempekerjakan.',
      'Maksimal 5% dari total daya tampung sekolah.',
      'Juga mencakup kuota untuk anak kandung guru atau tenaga kependidikan SMAN 1 Karangan.',
    ],
  },
]

const GENERAL_REQUIREMENTS = [
  'Ijazah SMP/sederajat atau Surat Keterangan Lulus (SKL) asli.',
  'Kartu Keluarga (KK) asli yang diterbitkan minimal 1 (satu) tahun sebelum pendaftaran PPDB.',
  'Akta Kelahiran asli calon peserta didik baru.',
  'Cetak (Print-out) Profil NISN dari situs resmi Kementerian.',
  'Buku Rapor SMP/sederajat semester 1 s.d. 5 asli.',
  'Surat Pertanggungjawaban Mutlak (SPTJM) bermaterai Rp10.000 dari orang tua/wali.',
]

const SPECIFIC_REQUIREMENTS = [
  {
    pathway: 'Jalur Prestasi',
    items: [
      'Sertifikat atau piagam penghargaan kejuaraan asli (jika mendaftar lewat jalur prestasi lomba).',
      'Rapor SMP asli dan surat keterangan peringkat nilai rapor dari sekolah asal.',
    ],
  },
  {
    pathway: 'Jalur Afirmasi',
    items: [
      'Kartu Indonesia Pintar (KIP), Kartu Program Keluarga Harapan (PKH), atau Kartu Keluarga Sejahtera (KKS) asli.',
      'Surat keterangan disabilitas dari dokter/ahli (bagi calon peserta didik disabilitas).',
    ],
  },
  {
    pathway: 'Jalur Perpindahan Tugas',
    items: [
      'Surat Keputusan (SK) mutasi atau perpindahan tugas orang tua/wali asli.',
      'Surat keterangan penugasan guru/tenaga kependidikan (khusus anak guru/tenaga kependidikan).',
    ],
  },
]

interface PPDBStep {
  step: string
  date: string
  desc: string
}

interface PPDBStage {
  name: string
  quota: string
  timeline: PPDBStep[]
}

const PPDB_STAGES: Record<'tahap_1' | 'tahap_2' | 'tahap_3', PPDBStage> = {
  tahap_1: {
    name: 'Tahap 1: Afirmasi, Pindah Tugas & Prestasi Lomba',
    quota: 'Kuota: 25% (Afirmasi 15%, Pindah Tugas 5%, Prestasi Hasil Lomba 5%)',
    timeline: [
      { step: 'Pendaftaran Online', date: '15 - 16 Juni 2026 (01:00 - 23:59 WIB)', desc: 'Pengisian data diri dan pengunggahan berkas bukti (KIP/KKS/SK Mutasi/Piagam Lomba) di portal PPDB Jatim.' },
      { step: 'Verifikasi & Validasi', date: '16 - 18 Juni 2026 (s.d. pukul 16:00 WIB)', desc: 'Pemeriksaan berkas pendaftaran dan pencocokan keabsahan dokumen oleh panitia PPDB SMANESKA.' },
      { step: 'Pengumuman Kelulusan', date: '19 Juni 2026 (Pukul 08:00 WIB)', desc: 'Pengumuman resmi hasil seleksi tahap 1 secara online. Peserta yang lolos mencetak bukti penerimaan.' },
      { step: 'Daftar Ulang di Sekolah', date: '19 - 20 Juni 2026 (09:00 - 15:00 WIB)', desc: 'Penyerahan berkas fisik asli ke sekolah untuk registrasi ulang siswa baru tahap 1.' }
    ]
  },
  tahap_2: {
    name: 'Tahap 2: Prestasi Nilai Akademik Rapor',
    quota: 'Kuota: 25% (Berdasarkan gabungan rata-rata nilai rapor & akreditasi sekolah asal)',
    timeline: [
      { step: 'Pendaftaran Online', date: '22 - 23 Juni 2026 (01:00 - 23:59 WIB)', desc: 'Pendaftaran mandiri di portal PPDB Jatim menggunakan nilai rata-rata Rapor semester 1-5 SMP/Sederajat.' },
      { step: 'Proses Seleksi Otomatis', date: '23 - 24 Juni 2026 (Real-time)', desc: 'Sistem PPDB Jatim secara otomatis merangking nilai akumulatif rapor pendaftar sesuai kuota daya tampung.' },
      { step: 'Pengumuman Kelulusan', date: '25 Juni 2026 (Pukul 08:00 WIB)', desc: 'Pengumuman kelolosan pendaftar Tahap 2 secara daring di situs resmi Jatim.' },
      { step: 'Daftar Ulang di Sekolah', date: '25 - 26 Juni 2026 (09:00 - 15:00 WIB)', desc: 'Registrasi fisik dengan membawa rapor asli dan SKL ke panitia PPDB sekolah.' }
    ]
  },
  tahap_3: {
    name: 'Tahap 3: Jalur Zonasi SMA',
    quota: 'Kuota: 50% (Berdasarkan jarak domisili terdekat Kartu Keluarga ke sekolah)',
    timeline: [
      { step: 'Pendaftaran Online', date: '27 - 28 Juni 2026 (01:00 - 23:59 WIB)', desc: 'Pemilihan sekolah tujuan berdasarkan koordinat peta domisili Kartu Keluarga (KK).' },
      { step: 'Proses Seleksi Jarak', date: '28 - 29 Juni 2026 (Real-time)', desc: 'Sistem memetakan jarak domisili pendaftar ke sekolah tujuan. Jarak terdekat diprioritaskan.' },
      { step: 'Pengumuman Kelulusan', date: '30 Juni 2026 (Pukul 08:00 WIB)', desc: 'Pengumuman akhir hasil seleksi jalur Zonasi SMA secara online.' },
      { step: 'Daftar Ulang Akhir', date: '30 Juni - 1 Juli 2026 (09:00 - 15:00 WIB)', desc: 'Penyerahan berkas fisik kependudukan asli untuk validasi akhir sebelum penutupan PPDB.' }
    ]
  }
}


const FAQS = [
  {
    q: 'Apakah pendaftaran PPDB SMAN 1 Karangan dikenakan biaya?',
    a: 'Tidak. Seluruh proses pendaftaran PPDB online tingkat SMA Negeri di Jawa Timur, termasuk SMAN 1 Karangan, dilaksanakan secara gratis dan bebas pungutan biaya.',
  },
  {
    q: 'Bagaimana jika masa terbit Kartu Keluarga (KK) saya kurang dari 1 tahun?',
    a: 'Jika ada pergantian KK (misal karena penambahan anggota keluarga atau pindah alamat), KK baru dapat digunakan asalkan melampirkan fotokopi KK lama atau surat keterangan dari Dispendukcapil setempat yang menerangkan bahwa Anda telah berdomisili di alamat tersebut minimal 1 tahun.',
  },
  {
    q: 'Apakah program Double Track di SMANESKA berbayar?',
    a: 'Program Double Track merupakan program resmi dari Dinas Pendidikan Provinsi Jawa Timur bekerja sama dengan ITS untuk membekali keterampilan vokasional siswa SMA. Program ini diberikan secara gratis tanpa biaya tambahan bagi siswa yang terpilih.',
  },
  {
    q: 'Bisakah saya mendaftar melalui dua jalur PPDB sekaligus?',
    a: 'Pendaftaran PPDB Jatim biasanya dibagi menjadi beberapa tahap (Tahap 1 untuk Afirmasi, Prestasi Lomba, Pindah Tugas; Tahap 2 untuk Prestasi Nilai Akademik; Tahap 3 untuk Zonasi). Jika Anda tidak lolos di Tahap 1, Anda dapat mendaftar kembali di Tahap berikutnya menggunakan jalur yang berbeda.',
  },
  {
    q: 'Bagaimana cara mendapatkan PIN pendaftaran PPDB Jatim?',
    a: 'PIN pendaftaran diperoleh secara online melalui situs resmi PPDB Jatim (ppdb.jatimprov.go.id) pada masa sosialisasi dengan cara memasukkan data nilai rapor SMP dan dokumen kependudukan.',
  },
]

export default function Admission() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activePPDBTab, setActivePPDBTab] = useState<'tahap_1' | 'tahap_2' | 'tahap_3'>('tahap_1')

  const toggleFaq = (index: number) => {

    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <>
      <SEO
        title="PPDB 2026 / Penerimaan Siswa Baru"
        description="Informasi resmi mengenai Penerimaan Peserta Didik Baru (PPDB) SMAN 1 Karangan (SMANESKA) Trenggalek tahun ajaran 2026. Temukan jalur zonasi, prestasi, afirmasi, syarat berkas, dan jadwal pendaftaran."
        keywords="ppdb smaneska 2026, pendaftaran sman 1 karangan, ppdb jatim trenggalek, syarat masuk sma negeri, jalur zonasi smaneska"
      />
      {/* ─── PAGE HEADER ─────────────────────────────────────── */}
      <section className="relative bg-forest pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 80% 40%, #c98a2b 0%, transparent 55%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="gold" className="mb-4">Penerimaan Siswa Baru</Badge>
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4 leading-tight">
            PPDB SMANESKA 2026
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            Selamat datang calon pemimpin bangsa! Temukan informasi lengkap mengenai alur, jalur, 
            persyaratan, dan jadwal pendaftaran masuk SMAN 1 Karangan.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-canvas" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ─── JALUR PENDAFTARAN ─────────────────────────────────── */}
      <section className="bg-canvas py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Jalur Masuk"
            title="Pilihan Jalur PPDB"
            description="PPDB Jawa Timur menyediakan beberapa jalur alternatif pendaftaran sesuai kondisi dan keunggulan masing-masing siswa."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {ADMISSION_PATHWAYS.map((path, index) => {
              const PathIcon = path.icon
              return (
                <ScrollReveal
                  key={path.id}
                  animation="fade-in-up"
                  delay={index * 150}
                  className="bg-paper border border-ink/8 rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="size-12 rounded-xl bg-forest/8 flex items-center justify-center text-forest shrink-0">
                        <PathIcon className="size-6" />
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-2xl font-bold text-gold">{path.quota}</span>
                        <p className="font-mono text-[10px] text-ink/40 uppercase tracking-widest">Pagu Kuota</p>
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-ink text-xl mb-3">
                      {path.name}
                    </h3>
                    <p className="text-sm text-ink/65 leading-relaxed mb-6">
                      {path.description}
                    </p>

                    <div className="space-y-2.5">
                      <p className="font-mono text-[10px] text-ink/40 uppercase tracking-widest font-semibold">
                        Aturan & Ketentuan:
                      </p>
                      {path.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-ink/75 leading-relaxed">
                          <CheckCircle className="size-4 text-forest shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── PERSYARATAN DOKUMEN ───────────────────────────────── */}
      <section className="bg-paper py-16 lg:py-20 border-y border-ink/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Persyaratan Umum */}
            <ScrollReveal animation="fade-in-left" className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="size-6 text-forest" />
                <h2 className="font-display font-bold text-2xl text-ink tracking-tight">
                  Persyaratan Umum
                </h2>
              </div>
              <p className="text-ink/60 text-sm mb-6">
                Seluruh calon peserta didik baru wajib mempersiapkan berkas dokumen administrasi dasar 
                berikut untuk verifikasi data:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {GENERAL_REQUIREMENTS.map((req, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-canvas border border-ink/6 flex gap-3 items-start">
                    <span className="flex items-center justify-center size-6 rounded-full bg-forest text-white font-mono text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-ink/80 leading-relaxed font-medium">
                      {req}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Persyaratan Khusus */}
            <ScrollReveal animation="fade-in-right" className="p-6 lg:p-8 bg-canvas border border-ink/8 rounded-2xl">
              <h3 className="font-display font-bold text-lg text-ink mb-2">
                Persyaratan Khusus
              </h3>
              <p className="text-xs text-ink/50 mb-6 leading-relaxed">
                Berkas tambahan wajib sesuai jalur pendaftaran pilihan Anda:
              </p>

              <div className="space-y-6">
                {SPECIFIC_REQUIREMENTS.map((spec, idx) => (
                  <div key={idx} className="space-y-2">
                    <Badge variant={idx === 0 ? 'gold' : idx === 1 ? 'forest' : 'turonggo'} size="sm">
                      {spec.pathway}
                    </Badge>
                    <ul className="space-y-1.5 pl-1">
                      {spec.items.map((item, key) => (
                        <li key={key} className="text-xs text-ink/70 leading-relaxed flex items-start gap-2">
                          <span className="size-1 rounded-full bg-ink/40 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE JADWAL PPDB ───────────────────────────────── */}
      <section className="bg-canvas py-16 lg:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Agenda PPDB Jatim 2026"
            title="Alur Jadwal per Jalur Seleksi"
            align="center"
            description="PPDB Jawa Timur dibagi menjadi 3 Tahap pendaftaran utama. Silakan pilih tab di bawah untuk melihat alur dan jadwal dari masing-masing jalur seleksi."
          />

          {/* Tab Switcher Jalur PPDB */}
          <div className="flex justify-center mt-8 mb-10">
            <div className="inline-flex rounded-xl bg-paper p-1.5 border border-ink/6">
              {(['tahap_1', 'tahap_2', 'tahap_3'] as const).map((stageKey) => (
                <button
                  key={stageKey}
                  onClick={() => setActivePPDBTab(stageKey)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activePPDBTab === stageKey
                      ? 'bg-forest text-white shadow-sm'
                      : 'text-ink/65 hover:text-ink hover:bg-ink/4'
                  }`}
                >
                  {stageKey === 'tahap_1' ? 'Tahap 1: Afirmasi/Lomba' : stageKey === 'tahap_2' ? 'Tahap 2: Rapor' : 'Tahap 3: Zonasi'}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-10 p-5 rounded-2xl bg-paper border border-ink/8 shadow-sm animate-fade-in-up">
            <h3 className="font-display font-bold text-forest text-lg sm:text-xl mb-1.5">
              {PPDB_STAGES[activePPDBTab].name}
            </h3>
            <p className="text-xs text-gold font-mono uppercase tracking-wider font-semibold">
              {PPDB_STAGES[activePPDBTab].quota}
            </p>
          </div>

          {/* Timeline Steps */}
          <div className="relative pl-6 sm:pl-0 max-w-4xl mx-auto">
            {/* Garis vertikal di mobile & desktop */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-forest/15 -translate-x-1/2 hidden sm:block" />

             <div className="space-y-10 relative">
              {PPDB_STAGES[activePPDBTab].timeline.map((item, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <ScrollReveal
                    key={idx}
                    animation="fade-in-up"
                    delay={idx * 100}
                    className={`flex flex-col sm:flex-row items-center justify-between relative ${isEven ? 'sm:flex-row-reverse' : ''}`}
                  >
                    {/* Node lingkaran */}
                    <div className="absolute left-0 sm:left-1/2 top-1 sm:top-1/2 size-5 rounded-full border-4 border-canvas bg-forest -translate-x-[9px] sm:-translate-x-2.5 sm:-translate-y-2.5 z-10 shadow-sm" />

                    {/* Konten Box */}
                    <div className="w-full sm:w-[46%] pl-8 sm:pl-0">
                      <div className="bg-paper border border-ink/8 p-6 rounded-2xl hover:border-forest/20 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="size-4 text-gold" />
                          <span className="font-mono text-xs font-bold text-gold tracking-wide">
                            {item.date}
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-ink text-base mb-1.5">
                          {item.step}
                        </h4>
                        <p className="text-xs text-ink/65 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Spacer untuk desktop */}
                    <div className="w-[46%] hidden sm:block" />
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>


      {/* ─── PUSAT UNDUHAN ─────────────────────────────────────── */}
      <section id="unduhan" className="bg-paper py-16 lg:py-20 border-t border-ink/6 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Unduhan Dokumen"
            title="Pusat Unduhan Resmi"
            description="Unduh dokumen penting sekolah seperti brosur pendaftaran PPDB, kalender akademik tahunan, dan buku tata tertib siswa."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: 'Brosur PPDB 2026/2027',
                size: 'PDF · 2.4 MB',
                desc: 'Panduan jalur masuk PPDB SMANESKA, jadwal pendaftaran, kuota daya tampung, serta narahubung panitia.',
                file: '/documents/brosur-ppdb-2026.pdf',
              },
              {
                title: 'Kalender Akademik TP 2025/2026',
                size: 'PDF · 1.8 MB',
                desc: 'Agenda lengkap kegiatan belajar mengajar, ujian, penyerahan rapor, dan hari libur sekolah tahun pelajaran berjalan.',
                file: '/documents/kalender-akademik-2025.pdf',
              },
              {
                title: 'Buku Saku Tata Tertib Siswa',
                size: 'PDF · 1.2 MB',
                desc: 'Peraturan kedisiplinan siswa, tata krama, ketentuan seragam, serta poin pelanggaran dan penghargaan di SMANESKA.',
                file: '/documents/buku-saku-tata-tertib.pdf',
              },
            ].map((doc, idx) => (
              <ScrollReveal
                key={idx}
                animation="fade-in-up"
                delay={idx * 150}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-canvas border border-ink/8 hover:border-forest/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="size-12 rounded-xl bg-forest/8 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                      <FileText className="size-6" />
                    </div>
                    <Badge variant="gold" size="sm">
                      {doc.size}
                    </Badge>
                  </div>
                  <h3 className="font-display font-bold text-ink text-lg mb-2 group-hover:text-forest transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink/65 leading-relaxed mb-6">
                    {doc.desc}
                  </p>
                </div>

                <a href={doc.file} download className="block">
                  <Button variant="outline" size="sm" fullWidth className="group-hover:bg-forest group-hover:text-white group-hover:border-forest transition-colors duration-300">
                    <Download className="size-4 mr-2" />
                    Unduh Dokumen
                  </Button>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ACCORDION ─────────────────────────────────────── */}
      <section className="bg-canvas py-16 lg:py-20 border-t border-ink/6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="gold" className="mb-4">Tanya Jawab</Badge>
            <h2 className="font-display font-bold text-3xl text-ink tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-ink/60 text-sm mt-3">
              Temukan jawaban cepat atas kendala yang sering dihadapi calon pendaftar PPDB.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="border border-ink/8 rounded-2xl overflow-hidden bg-canvas/30"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm sm:text-base text-ink hover:text-forest transition-colors focus:outline-none"
                  >
                    <span className="pr-4">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="size-5 text-forest shrink-0" />
                    ) : (
                      <ChevronDown className="size-5 text-ink/40 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-ink/6 bg-paper/50">
                      <p className="text-xs sm:text-sm text-ink/65 leading-relaxed pt-4">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ────────────────────────────────────────── */}
      <section className="bg-forest py-16 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #c98a2b 0%, transparent 60%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4 leading-tight">
            Sudah Siap Bergabung Menjadi Bagian SMANESKA?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base mb-8 leading-relaxed">
            Daftarkan diri Anda sekarang juga melalui portal resmi PPDB Provinsi Jawa Timur. Hubungi panitia 
            PPDB sekolah kami jika memiliki kendala pendaftaran.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://ppdb.jatimprov.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold hover:bg-gold/90 text-white font-semibold text-sm transition-all shadow-md shadow-gold/20"
            >
              <ExternalLink className="size-4" />
              Portal PPDB Jatim
            </a>
            <a
              href="https://wa.me/6281234567890" // Nomor simulasi
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all"
            >
              <Phone className="size-4 text-gold" />
              Hubungi Panitia (WA)
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
