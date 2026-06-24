export interface Teacher {
  id: string
  name: string
  nip?: string
  subject: string
  position?: string // jabatan struktural (mis. Kepala Sekolah, Waka Kurikulum)
  education: string // pendidikan terakhir
  photo?: string
  email?: string
}

export interface Staff {
  id: string
  name: string
  nip?: string
  role: string
  photo?: string
}
