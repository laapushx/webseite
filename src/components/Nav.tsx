'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-surface/95 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)]' : 'bg-transparent'
        }`}
      >
        <div className="container-main">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="font-serif text-xl md:text-2xl tracking-widest text-ink hover:text-accent transition-colors duration-200"
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
                    className="label-sm text-muted hover:text-ink transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-5">
              {/* DE | EN toggle */}
              <button
                onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
                className="flex items-center gap-1.5 label-sm"
                aria-label="Toggle language"
              >
                <span className={lang === 'de' ? 'text-ink' : 'text-muted hover:text-ink transition-colors'}>
                  DE
                </span>
                <span className="text-border select-none">|</span>
                <span className={lang === 'en' ? 'text-ink' : 'text-muted hover:text-ink transition-colors'}>
                  EN
                </span>
              </button>
              <a
                href="#kontakt"
                className="label-sm bg-ink text-surface px-5 py-2.5 rounded hover:bg-accent hover:text-ink transition-all duration-200"
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
                <span className={lang === 'de' ? 'text-ink' : 'text-muted'}>DE</span>
                <span className="text-border select-none">|</span>
                <span className={lang === 'en' ? 'text-ink' : 'text-muted'}>EN</span>
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-ink"
                aria-label="Menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-6 h-px bg-ink origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block w-6 h-px bg-ink"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-6 h-px bg-ink origin-center"
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
                    className="block font-serif text-4xl text-ink py-3 border-b border-border hover:text-accent transition-colors"
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
                className="label-sm flex w-full items-center justify-center bg-ink text-surface px-6 py-4 rounded hover:bg-accent hover:text-ink transition-all"
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
