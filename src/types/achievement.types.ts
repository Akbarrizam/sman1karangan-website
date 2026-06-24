export interface Achievement {
  id: string
  title: string
  description: string
  level: AchievementLevel
  category: AchievementCategory
  year: number
  rank?: string // mis. "Juara 1", "Finalis", "Medali Emas"
  organizer?: string // penyelenggara lomba/kompetisi
  participants?: string[] // nama siswa yang meraih
  photo?: string
}

export type AchievementLevel =
  | 'sekolah'
  | 'kabupaten'
  | 'provinsi'
  | 'nasional'
  | 'internasional'

export type AchievementCategory =
  | 'akademik'
  | 'seni-budaya'
  | 'olahraga'
  | 'pramuka'
  | 'karya-ilmiah'
  | 'lainnya'

export const ACHIEVEMENT_LEVEL_LABELS: Record<AchievementLevel, string> = {
  sekolah: 'Tingkat Sekolah',
  kabupaten: 'Tingkat Kabupaten',
  provinsi: 'Tingkat Provinsi',
  nasional: 'Tingkat Nasional',
  internasional: 'Tingkat Internasional',
}

export const ACHIEVEMENT_CATEGORY_LABELS: Record<AchievementCategory, string> = {
  akademik: 'Akademik',
  'seni-budaya': 'Seni & Budaya',
  olahraga: 'Olahraga',
  pramuka: 'Kepramukaan',
  'karya-ilmiah': 'Karya Ilmiah',
  lainnya: 'Lainnya',
}
