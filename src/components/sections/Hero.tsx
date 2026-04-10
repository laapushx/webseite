'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

export default function Hero() {
  const { tr } = useLanguage()
  const h = tr.hero

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-bg overflow-hidden pt-20">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-ink) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Accent line top right */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="absolute top-0 right-0 w-1/3 h-px bg-accent origin-right"
      />

      <div className="container-main relative z-10">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.p
            {...fadeUp(0.1)}
            className="label-sm text-muted mb-8 md:mb-12"
          >
            {h.eyebrow}
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.25)}
            className="heading-display text-ink mb-8 md:mb-10"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)' }}
          >
            {h.headline.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <span className="italic text-muted">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h1>

          {/* Subline */}
          <motion.p
            {...fadeUp(0.4)}
            className="text-muted text-lg md:text-xl leading-relaxed max-w-2xl mb-12 md:mb-14"
          >
            {h.subline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.55)}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a
              href="#kontakt"
              className="label-sm inline-flex items-center gap-2 bg-ink text-surface px-8 py-4 rounded-full hover:bg-accent hover:text-ink transition-all duration-300"
            >
              {h.cta_primary}
              <span className="text-base leading-none">↗</span>
            </a>
            <a
              href="#leistungen"
              className="label-sm inline-flex items-center gap-2 text-ink hover:text-accent transition-colors duration-200"
            >
              {h.cta_secondary}
              <span className="text-base leading-none">↓</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-border origin-left"
      />
    </section>
  )
}
