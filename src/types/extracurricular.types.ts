export interface Extracurricular {
  id: string
  name: string
  description: string
  category: 'seni-budaya' | 'olahraga' | 'akademik' | 'organisasi' | 'keagamaan'
  schedule: string // mis. "Setiap Jumat, 14.00–16.00"
  coach?: string
  photo?: string
  memberCount?: number
}

export interface GalleryItem {
  id: string
  title: string
  description?: string
  type: 'photo' | 'video'
  src: string
  thumbnail?: string
  category: string
  takenAt: string // ISO 8601
}
