/**
 * Konfigurasi global website SMAN 1 Karangan (SMANESKA)
 * Ubah nilai di sini jika ada perubahan data resmi sekolah.
 */

export const SITE_CONFIG = {
  name: 'SMAN 1 Karangan',
  shortName: 'SMANESKA',
  fullName: 'SMA Negeri 1 Karangan',
  tagline: 'Makarya Ngesti Kuncaraning Siwi',
  motto: 'SMANESKA Maju Terus, Mantap Berkarya Nyata',
  description:
    'Website resmi SMA Negeri 1 Karangan (SMANESKA), Kabupaten Trenggalek. Beriman, Berprestasi, Berkarakter, dan Berbudaya.',
  founded: 1991,
  accreditation: 'A',
  npsn: '20517987',

  address: {
    street: 'Jl. Raya Karangan',
    village: 'Karangan',
    district: 'Karangan',
    city: 'Kabupaten Trenggalek',
    province: 'Jawa Timur',
    postalCode: '66353',
    full: 'Jl. Raya Karangan, Kec. Karangan, Kabupaten Trenggalek, Jawa Timur 66353',
  },

  contact: {
    phone: '(0355) 791234',
    email: 'info@sman1karangan.sch.id',
    website: 'https://sman1karangan.sch.id',
  },

  socialMedia: {
    facebook: 'https://facebook.com/sman1karangan',
    instagram: 'https://instagram.com/osis_smaneska',
    twitter: 'https://twitter.com/smaneska',
    youtube: '',
  },

  curriculum: 'Kurikulum Merdeka',
  specialization: 'Bahasa & Budaya',

  vision:
    'Beriman, Bertaqwa, Berprestasi, Berkarakter, dan Berbudaya Lingkungan yang Nyaman dan Tertata.',

  mission: [
    'Membentuk pribadi beriman dan bertaqwa kepada Tuhan Yang Maha Esa serta berbudi luhur.',
    'Menumbuhkan prestasi akademik dan non-akademik yang kompetitif di tingkat regional maupun nasional.',
    'Mengembangkan karakter siswa yang disiplin, mandiri, dan berwawasan kebangsaan.',
    'Menumbuhkan kecintaan pada seni dan budaya bangsa, khususnya budaya lokal Trenggalek.',
    'Mewujudkan lingkungan sekolah yang hijau, nyaman, bersih, dan tertata (Green Education School).',
    'Menyelenggarakan Program Double Track untuk membekali siswa dengan keterampilan vokasional.',
    'Menumbuhkan kepedulian sosial dan lingkungan dalam komunitas sekolah.',
  ],

  stats: {
    students: 920,
    teachers: 51,
    staff: 24,
    extracurriculars: 15,
    achievements: 200,
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.9!2d111.7!3d-8.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSMA+Negeri+1+Karangan!5e0!3m2!1sen!2sid!4v1000000000000',
} as const
