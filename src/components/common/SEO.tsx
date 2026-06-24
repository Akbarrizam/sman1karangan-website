import { useEffect } from 'react'

interface SEOProps {
  title: string
  description?: string
  keywords?: string
  schema?: Record<string, any>
}

/**
 * Komponen untuk mengatur metadata dokumen secara dinamis (SEO).
 * Mengubah judul halaman, meta deskripsi, dan meta kata kunci saat mount/update.
 */
export default function SEO({ title, description, keywords, schema }: SEOProps) {
  const fullTitle = `${title} | SMAN 1 Karangan (SMANESKA)`

  useEffect(() => {
    // 1. Update Judul Halaman
    document.title = fullTitle

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (description) {
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', description)
    }

    // 3. Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (keywords) {
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', keywords)
    }

    // 4. Inject JSON-LD Schema
    let scriptTag: HTMLScriptElement | null = null
    if (schema) {
      scriptTag = document.createElement('script')
      scriptTag.type = 'application/ld+json'
      scriptTag.textContent = JSON.stringify(schema)
      document.head.appendChild(scriptTag)
    }

    return () => {
      if (scriptTag && document.head.contains(scriptTag)) {
        document.head.removeChild(scriptTag)
      }
    }
  }, [fullTitle, description, keywords, schema])

  return null
}
