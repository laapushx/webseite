'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

// Colors when nav is transparent (over hero)
const light = {
  logo:      '#FFF6F2',
  link:      'rgba(255,246,242,0.88)',
  linkHover: '#FFFFFF',
  langActive:'#FFFFFF',
  langInactive: 'rgba(255,246,242,0.55)',
  sep:       'rgba(255,246,242,0.35)',
}

// Colors when nav is scrolled (over light bg)
const dark = {
  logo:      '#1C2B42',
  link:      'rgba(28,43,66,0.80)',
  linkHover: '#1C2B42',
  langActive:'#1C2B42',
  langInactive: 'rgba(28,43,66,0.45)',
  sep:       'rgba(28,43,66,0.28)',
}

const N = {
  ctaBg:    '#1C2B42',
  ctaText:  '#FFF6F2',
  ctaHover: '#243652',
  ctaShadow:'0 10px 30px rgba(0,0,0,0.25)',
}

export default function Nav() {
  const { lang, setLang, tr } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const C = scrolled ? dark : light

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-surface/75 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_0_0_var(--color-border)]' : 'bg-transparent'
        }`}
      >
        <div className="container-main">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="font-sans text-xl md:text-2xl tracking-widest transition-colors duration-300"
              style={{ color: C.logo }}
              onMouseEnter={(e) => e.currentTarget.style.color = C.linkHover}
              onMouseLeave={(e) => e.currentTarget.style.color = C.logo}
              onClick={closeMenu}
            >
              SUNXBÜ
            </a>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-8">
              {tr.nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors duration-200"
                    style={{ color: C.link, fontWeight: 500, fontSize: '13px', letterSpacing: '0.06em' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = C.linkHover}
                    onMouseLeave={(e) => e.currentTarget.style.color = C.link}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-5">
              {/* DE | EN toggle */}
              <div className="flex items-center gap-0.5" style={{ fontSize: '13px', fontWeight: 500 }}>
                <button
                  onClick={() => setLang('de')}
                  aria-label="Deutsch"
                  className="transition-all duration-200 px-2 py-1 rounded"
                  style={{
                    color: lang === 'de' ? C.langActive : C.langInactive,
                    cursor: 'pointer',
                    fontWeight: lang === 'de' ? 600 : 500,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = C.linkHover}
                  onMouseLeave={(e) => e.currentTarget.style.color = lang === 'de' ? C.langActive : C.langInactive}
                >
                  DE
                </button>
                <span style={{ color: C.sep }} className="select-none">·</span>
                <button
                  onClick={() => setLang('en')}
                  aria-label="English"
                  className="transition-all duration-200 px-2 py-1 rounded"
                  style={{
                    color: lang === 'en' ? C.langActive : C.langInactive,
                    cursor: 'pointer',
                    fontWeight: lang === 'en' ? 600 : 500,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = C.linkHover}
                  onMouseLeave={(e) => e.currentTarget.style.color = lang === 'en' ? C.langActive : C.langInactive}
                >
                  EN
                </button>
              </div>

              {/* CTA */}
              <a
                href="#kontakt"
                className="label-sm px-7 py-3.5 rounded-full transition-all duration-200"
                style={{ backgroundColor: N.ctaBg, color: N.ctaText, boxShadow: N.ctaShadow }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = N.ctaHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = N.ctaBg}
              >
                {tr.nav.cta}
              </a>
            </div>

            {/* Mobile right */}
            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
                className="flex items-center gap-1 label-sm"
              >
                <span style={{ color: lang === 'de' ? C.langActive : C.link }}>DE</span>
                <span style={{ color: C.sep }} className="select-none">|</span>
                <span style={{ color: lang === 'en' ? C.langActive : C.link }}>EN</span>
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                aria-label="Menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-6 h-px origin-center"
                  style={{ backgroundColor: C.logo }}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block w-6 h-px"
                  style={{ backgroundColor: C.logo }}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-6 h-px origin-center"
                  style={{ backgroundColor: C.logo }}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed inset-0 z-40 bg-surface flex flex-col pt-24 px-8 pb-10"
          >
            <ul className="flex flex-col gap-2 flex-1">
              {tr.nav.links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block font-sans text-4xl py-3 border-b border-border hover:text-accent transition-colors"
                    style={{ color: '#1C2B42' }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <a
                href="#kontakt"
                onClick={closeMenu}
                className="label-sm flex w-full items-center justify-center px-7 py-3.5 rounded-full transition-all"
                style={{ backgroundColor: N.ctaBg, color: N.ctaText }}
              >
                {tr.nav.cta}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
