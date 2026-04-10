'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { t, Language, Translations } from '@/translations'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  tr: Translations
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('de')

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
