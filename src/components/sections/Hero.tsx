'use client'

import { motion } from 'framer-motion'
import { MeshGradient } from '@paper-design/shaders-react'
import { useLanguage } from '@/context/LanguageContext'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const COLORS = ['#A8CFCC', '#DBBFA8', '#C4D9A0']

export default function Hero() {
  const { tr } = useLanguage()
  const h = tr.hero

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* ── Animated mesh gradient background ── */}
      <MeshGradient
        colors={COLORS}
        speed={1.2}
        distortion={0.35}
        swirl={0.12}
        offsetX={0.01}
        grainMixer={0}
        grainOverlay={0}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* ── White veil — softens shader ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-white/15"
      />

      {/* ── Top edge line ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.1, ease }}
        className="absolute top-0 left-0 right-0 h-px origin-left z-10"
        style={{ backgroundColor: 'rgba(31,41,55,0.08)' }}
      />

      {/* ── Main content ── */}
      <div className="container-main relative z-10 py-32 md:py-0 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="flex items-center justify-center gap-4 mb-10 md:mb-14"
        >
          <span
            className="block w-8 h-px flex-shrink-0"
            style={{ backgroundColor: 'rgba(31,41,55,0.25)' }}
          />
          <span
            className="label-sm tracking-[0.22em]"
            style={{ color: 'rgba(31,41,55,0.7)', fontWeight: 500 }}
          >
            {h.eyebrow}
          </span>
          <span
            className="block w-8 h-px flex-shrink-0"
            style={{ backgroundColor: 'rgba(31,41,55,0.25)' }}
          />
        </motion.div>

        {/* Headline */}
        <h1
          className="heading-display mb-10 md:mb-14"
          style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 6.5rem)',
            lineHeight: 1.03,
            color: '#1F2937',
          }}
        >
          {h.headline.split('\n').map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                style={
                  i === 1
                    ? { color: 'rgba(31,41,55,0.38)', fontSize: '0.68em', fontStyle: 'italic', fontWeight: 300 }
                    : {}
                }
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: 0.55 + i * 0.13, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
          className="text-lg md:text-xl mx-auto mb-12"
          style={{ color: 'rgba(31,41,55,0.52)', maxWidth: '52rem', lineHeight: 1.5 }}
        >
          {h.subline.split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          {/* Primary — dark pill */}
          <a
            href="#kontakt"
            className="group label-sm inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 font-medium"
            style={{ backgroundColor: '#1F2937', color: '#F5F2EE' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333330'
              e.currentTarget.style.transform = 'scale(1.03)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1F2937'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {h.cta_primary}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">↗</span>
          </a>

          {/* Secondary — ghost pill */}
          <a
            href="#projekte"
            className="label-sm inline-flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300"
            style={{
              backgroundColor: 'rgba(31,41,55,0.07)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(31,41,55,0.14)',
              color: 'rgba(31,41,55,0.65)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(31,41,55,0.12)'
              e.currentTarget.style.color = 'rgba(31,41,55,0.9)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(31,41,55,0.07)'
              e.currentTarget.style.color = 'rgba(31,41,55,0.65)'
            }}
          >
            {h.cta_secondary}
          </a>
        </motion.div>
      </div>

      {/* ── Scroll cue (bottom-center) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
          className="w-px h-10 origin-top"
          style={{ background: 'linear-gradient(to bottom, rgba(31,41,55,0.3), transparent)' }}
        />
      </motion.div>

      {/* ── Bottom edge line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ backgroundColor: 'rgba(31,41,55,0.07)' }}
      />
    </section>
  )
}
