'use client'

import { motion } from 'framer-motion'
import { MeshGradient } from '@paper-design/shaders-react'
import { useLanguage } from '@/context/LanguageContext'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const COLORS = ['#14060D', '#2A0D18', '#4A1628', '#6E1F35', '#A3364A', '#D97A5F']

const C = {
  base:    '#FFF6F2',
  italic:  'rgba(255,246,242,0.72)',
  sub:     'rgba(255,246,242,0.82)',
  label:   'rgba(255,246,242,0.55)',
  divider: 'rgba(255,246,242,0.14)',
}

export default function Hero() {
  const { tr } = useLanguage()
  const h = tr.hero
  const [mainLine, secondaryLine] = h.headline.split('\n')

  return (
    <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden pt-16 pb-12 md:pb-16">

      {/* ── Mesh gradient ── */}
      <MeshGradient
        colors={COLORS}
        speed={0.14}
        distortion={0.48}
        swirl={0.22}
        offsetX={0.04}
        grainMixer={0}
        grainOverlay={0}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* ── Grain texture ── */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.032 }}
      >
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      {/* ── Vignette — darkens edges, focuses center ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 78% 88% at 50% 44%, transparent 22%, rgba(8,2,5,0.72) 100%)',
        }}
      />

      {/* ── Radial glow — warm bloom behind content ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 52% 50% at 50% 42%, rgba(110,31,53,0.22) 0%, transparent 68%)',
        }}
      />

      {/* ── White veil ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-white/[0.015]"
      />

      {/* ── Top edge line ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.1, ease }}
        className="absolute top-0 left-0 right-0 h-px origin-left z-10"
        style={{ backgroundColor: C.divider }}
      />

      {/* ── Main content ── */}
      <div
        className="container-main relative z-10 py-32 md:py-0 text-center"
        style={{ color: C.base }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="flex items-center justify-center gap-4 mb-8 md:mb-10"
        >
          <span
            className="block w-6 h-px flex-shrink-0"
            style={{ backgroundColor: C.divider }}
          />
          <span
            style={{
              color: C.label,
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            {h.eyebrow}
          </span>
          <span
            className="block w-6 h-px flex-shrink-0"
            style={{ backgroundColor: C.divider }}
          />
        </motion.div>

        {/* ── Headline block ── */}
        <h1 className="leading-[0.98] text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-5xl mx-auto">

          {/* Main line */}
          <span className="overflow-hidden block">
            <motion.span
              className="block font-semibold"
              style={{ color: C.base, letterSpacing: '-0.02em' }}
              initial={{ y: '108%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.05, delay: 0.52, ease }}
            >
              {mainLine}
            </motion.span>
          </span>

          {/* Secondary line — pulled tight to main */}
          <span className="overflow-hidden block">
            <motion.span
              className="block font-medium italic leading-none -translate-y-1 opacity-85"
              style={{ color: C.italic, letterSpacing: '-0.02em', fontSize: '0.88em' }}
              initial={{ y: '108%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.05, delay: 0.66, ease }}
            >
              {secondaryLine}
            </motion.span>
          </span>

        </h1>

        {/* Subline — clearly separated, higher weight */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.88, ease }}
          className="mx-auto mt-5 md:mt-7 mb-8 md:mb-10 text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl font-normal"
          style={{ color: C.sub }}
        >
          <span className="block">Wir entwickeln Websites, die Vertrauen aufbauen, Anfragen generieren</span>
          <span className="block">und messbar verkaufen.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.06, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          {/* Primary */}
          <a
            href="#kontakt"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300"
            style={{
              backgroundColor: '#16243A',
              color: '#FFF6F2',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: '0 8px 32px rgba(10,4,8,0.45)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1E2F4A'
              e.currentTarget.style.transform = 'scale(1.03)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(10,4,8,0.55)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#16243A'
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,4,8,0.45)'
            }}
          >
            {h.cta_primary}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">↗</span>
          </a>

          {/* Secondary — stronger presence */}
          <a
            href="#projekte"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300"
            style={{
              border: '1px solid rgba(255,246,242,0.32)',
              color: 'rgba(255,246,242,0.88)',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,246,242,0.08)'
              e.currentTarget.style.borderColor = 'rgba(255,246,242,0.55)'
              e.currentTarget.style.color = '#FFF6F2'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(255,246,242,0.32)'
              e.currentTarget.style.color = 'rgba(255,246,242,0.88)'
            }}
          >
            {h.cta_secondary}
          </a>
        </motion.div>
      </div>

      {/* ── Bottom fade into next section ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(9,2,6,0.7) 100%)',
        }}
      />

      {/* ── Bottom edge line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-20"
        style={{ backgroundColor: C.divider }}
      />
    </section>
  )
}
