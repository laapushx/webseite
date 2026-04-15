'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Hero() {
  const { tr } = useLanguage()
  const h = tr.hero
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: '#0D0D0B' }}
    >
      {/* ── Atmospheric gradient orbs ── */}
      <motion.div
        style={{ y: orbY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-[-5%] right-[-5%] w-[65vw] h-[65vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 60% 40%, rgba(197,168,130,0.09) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute bottom-[5%] left-[-15%] w-[50vw] h-[50vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(197,168,130,0.05) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* ── Film grain overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.045,
          animation: 'grain 9s steps(10) infinite',
        }}
      />

      {/* ── Top edge line ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.1, ease }}
        className="absolute top-0 left-0 right-0 h-px origin-left z-10"
        style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
      />

      {/* ── Main content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-main relative z-10 pb-20 md:pb-28 pt-40 md:pt-48"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="flex items-center gap-4 mb-10 md:mb-14"
        >
          <span
            className="block w-8 h-px flex-shrink-0"
            style={{ backgroundColor: '#C5A882' }}
          />
          <span
            className="label-sm tracking-[0.22em]"
            style={{ color: 'rgba(197,168,130,0.75)' }}
          >
            {h.eyebrow}
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          className="heading-display text-white mb-10 md:mb-14"
          style={{ fontSize: 'clamp(2.8rem, 7.5vw, 8rem)', lineHeight: 1.03 }}
        >
          {h.headline.split('\n').map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                style={
                  i === 1
                    ? { color: 'rgba(255,255,255,0.38)', fontSize: '0.68em', fontStyle: 'italic', fontWeight: 300 }
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

        {/* Subline + CTAs */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16 lg:gap-24">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="text-base md:text-lg leading-relaxed max-w-[22rem]"
            style={{ color: 'rgba(255,255,255,0.42)' }}
          >
            {h.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          >
            <a
              href="#kontakt"
              className="group label-sm inline-flex items-center gap-3 px-7 py-4 transition-all duration-300"
              style={{
                backgroundColor: '#C5A882',
                color: '#0D0D0B',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#C5A882'
              }}
            >
              {h.cta_primary}
              <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
                ↗
              </span>
            </a>

            <a
              href="#projekte"
              className="label-sm inline-flex items-center gap-2 transition-colors duration-200 pb-px"
              style={{
                color: 'rgba(255,255,255,0.38)',
                borderBottom: '1px solid rgba(255,255,255,0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.38)'
                e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)'
              }}
            >
              {h.cta_secondary}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll cue (bottom-right) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 right-8 md:right-14 flex flex-col items-center gap-3 z-10"
      >
        <span
          className="label-sm"
          style={{
            writingMode: 'vertical-rl',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.18)',
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
          className="w-px h-10 origin-top"
          style={{
            background: 'linear-gradient(to bottom, rgba(197,168,130,0.7), transparent)',
          }}
        />
      </motion.div>

      {/* ── Bottom edge line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
      />
    </section>
  )
}
