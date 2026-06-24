import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/constants/siteConfig'
import SectionHeader from '@/components/sections/SectionHeader'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'
import SEO from '@/components/common/SEO'
import ScrollReveal from '@/components/common/ScrollReveal'

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: 'Alamat',
    value: SITE_CONFIG.address.full,
    href: 'https://maps.google.com/?q=SMA+Negeri+1+Karangan+Trenggalek',
  },
  {
    icon: Phone,
    label: 'Telepon',
    value: SITE_CONFIG.contact.phone,
    href: `tel:${SITE_CONFIG.contact.phone}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: SITE_CONFIG.contact.email,
    href: `mailto:${SITE_CONFIG.contact.email}`,
  },
  {
    icon: Clock,
    label: 'Jam Operasional',
    value: 'Senin–Jumat, 07.00–15.00 WIB',
    href: null,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const validateField = (name: string, value: string) => {
    let error = ''
    if (name === 'name') {
      if (!value.trim()) {
        error = 'Nama lengkap wajib diisi.'
      } else if (value.trim().length < 3) {
        error = 'Nama harus minimal 3 karakter.'
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        error = 'Alamat email wajib diisi.'
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value.trim())) {
          error = 'Format alamat email tidak valid (contoh: nama@domain.com).'
        }
      }
    } else if (name === 'subject') {
      if (!value.trim()) {
        error = 'Subjek pesan wajib diisi.'
      } else if (value.trim().length < 5) {
        error = 'Subjek harus minimal 5 karakter.'
      }
    } else if (name === 'message') {
      if (!value.trim()) {
        error = 'Pesan wajib diisi.'
      } else if (value.trim().length < 10) {
        error = 'Pesan harus minimal 10 karakter.'
      }
    }
    return error
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    const fieldName = id.replace('contact-', '')
    setForm((f) => ({ ...f, [fieldName]: value }))
    if (touched[fieldName]) {
      const error = validateField(fieldName, value)
      setErrors((err) => ({ ...err, [fieldName]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    const fieldName = id.replace('contact-', '')
    setTouched((t) => ({ ...t, [fieldName]: true }))
    const error = validateField(fieldName, value)
    setErrors((err) => ({ ...err, [fieldName]: error }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key as keyof typeof form])
      if (error) {
        newErrors[key] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      const allTouched = Object.keys(form).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
      setTouched(allTouched)
      return
    }

    setLoading(true)
    setTimeout(() => {
      try {
        const stored = localStorage.getItem('smaneska_contact_messages')
        const messages = stored ? JSON.parse(stored) : []
        const newMessage = {
          ...form,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        }
        messages.push(newMessage)
        localStorage.setItem('smaneska_contact_messages', JSON.stringify(messages))
      } catch (err) {
        console.error('Failed to save message to localStorage', err)
      }
      setLoading(false)
      setSent(true)
    }, 1200)
  }


  return (
    <>
      <SEO
        title="Hubungi Kami"
        description="Hubungi SMA Negeri 1 Karangan (SMANESKA) Trenggalek. Temukan alamat pos, nomor telepon, alamat email, jam operasional sekolah, serta formulir pengiriman pesan."
        keywords="kontak smaneska, alamat sman 1 karangan, nomor telepon smaneska, email smaneska, peta sman 1 karangan"
      />
      {/* ─── PAGE HEADER ─────────────────────────────────────── */}
      <section className="relative bg-forest pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 80% 40%, #c98a2b 0%, transparent 55%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="gold" className="mb-4">Kontak</Badge>
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4 leading-tight">
            Hubungi Kami
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            Ada pertanyaan seputar PPDB, akademik, atau kerja sama? Kami siap membantu.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-canvas" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ─── KONTEN UTAMA ─────────────────────────────────────── */}
      <section className="bg-canvas py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Info Kontak */}
            <ScrollReveal animation="fade-in-left">
              <SectionHeader
                eyebrow="Informasi"
                title="Cara Menghubungi Kami"
                description="Anda dapat menghubungi SMANESKA melalui berbagai saluran komunikasi di bawah ini."
              />
              <div className="space-y-4 mb-10">
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4 p-5 rounded-xl bg-paper border border-ink/8 hover:border-forest/20 transition-colors">
                    <div className="size-10 rounded-lg bg-forest/8 flex items-center justify-center shrink-0">
                      <Icon className="size-5 text-forest" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-ink/40 uppercase tracking-wider mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer"
                          className="text-sm font-medium text-ink hover:text-forest transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-ink">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Peta embed placeholder */}
              <div className="rounded-2xl overflow-hidden border border-ink/8 bg-paper h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="size-10 text-forest/30 mx-auto mb-3" />
                  <p className="text-sm text-ink/40 mb-3">Peta lokasi SMANESKA</p>
                  <a
                    href="https://maps.google.com/?q=SMA+Negeri+1+Karangan+Trenggalek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-forest text-white text-sm font-medium hover:bg-forest/90 transition-colors"
                  >
                    <MapPin className="size-3.5" />
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Form Kontak */}
            <ScrollReveal animation="fade-in-right">
              <SectionHeader
                eyebrow="Pesan"
                title="Kirim Pesan"
                description="Isi formulir di bawah ini dan kami akan merespons dalam 1–2 hari kerja."
              />

              {sent ? (
                <div className="flex flex-col items-center text-center py-16 px-8 rounded-2xl bg-paper border border-ink/8">
                  <CheckCircle className="size-14 text-forest mb-4" />
                  <h3 className="font-display font-bold text-ink text-xl mb-2">Pesan Terkirim!</h3>
                  <p className="text-ink/60 text-sm mb-6">
                    Terima kasih telah menghubungi kami. Tim SMANESKA akan merespons pesan Anda
                    dalam 1–2 hari kerja.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false)
                      setForm({ name: '', email: '', subject: '', message: '' })
                      setErrors({})
                      setTouched({})
                    }}
                    className="text-sm text-forest hover:underline font-semibold"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form
                  id="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block font-mono text-xs text-ink/50 uppercase tracking-wider mb-1.5">
                        Nama Lengkap <span className="text-turonggo">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nama Anda"
                        className={`w-full px-4 py-3 rounded-xl border bg-paper text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 transition ${
                          errors.name && touched.name
                            ? 'border-turonggo focus:ring-turonggo/20 focus:border-turonggo'
                            : 'border-ink/15 focus:ring-forest/30 focus:border-forest/40'
                        }`}
                      />
                      {errors.name && touched.name && (
                        <p className="mt-1 text-xs text-turonggo font-medium">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block font-mono text-xs text-ink/50 uppercase tracking-wider mb-1.5">
                        Email <span className="text-turonggo">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="email@contoh.com"
                        className={`w-full px-4 py-3 rounded-xl border bg-paper text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 transition ${
                          errors.email && touched.email
                            ? 'border-turonggo focus:ring-turonggo/20 focus:border-turonggo'
                            : 'border-ink/15 focus:ring-forest/30 focus:border-forest/40'
                        }`}
                      />
                      {errors.email && touched.email && (
                        <p className="mt-1 text-xs text-turonggo font-medium">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block font-mono text-xs text-ink/50 uppercase tracking-wider mb-1.5">
                      Subjek <span className="text-turonggo">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Pertanyaan seputar PPDB / Akademik / lainnya"
                      className={`w-full px-4 py-3 rounded-xl border bg-paper text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 transition ${
                        errors.subject && touched.subject
                          ? 'border-turonggo focus:ring-turonggo/20 focus:border-turonggo'
                          : 'border-ink/15 focus:ring-forest/30 focus:border-forest/40'
                      }`}
                    />
                    {errors.subject && touched.subject && (
                      <p className="mt-1 text-xs text-turonggo font-medium">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block font-mono text-xs text-ink/50 uppercase tracking-wider mb-1.5">
                      Pesan <span className="text-turonggo">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tulis pesan Anda di sini…"
                      className={`w-full px-4 py-3 rounded-xl border bg-paper text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 transition resize-none ${
                        errors.message && touched.message
                          ? 'border-turonggo focus:ring-turonggo/20 focus:border-turonggo'
                          : 'border-ink/15 focus:ring-forest/30 focus:border-forest/40'
                      }`}
                    />
                    {errors.message && touched.message && (
                      <p className="mt-1 text-xs text-turonggo font-medium">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={loading}
                    className="cursor-pointer"
                  >
                    <Send className="size-4" />
                    {loading ? 'Mengirim…' : 'Kirim Pesan'}
                  </Button>

                  <p className="text-xs text-ink/40 text-center">
                    Data Anda aman dan tidak akan disebarluaskan kepada pihak ketiga.
                  </p>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
