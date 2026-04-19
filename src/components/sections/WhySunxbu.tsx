'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
const ACCENT = 'rgba(163,54,74,1)'

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <polyline points="2 7 5.5 10.5 11 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <line x1="2" y1="2" x2="9" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9" y1="2" x2="2" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

// Separate variant factories — one per direction
const makeItemVariants = (xDir: number) => ({
  hidden: { opacity: 0, x: xDir },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.42 + i * 0.1, duration: 0.55, ease },
  }),
})

const prosVariants = makeItemVariants(-18)
const consVariants = makeItemVariants(18)

export default function WhySunxbu() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })
  const w = tr.why

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: '#131920' }}
    >
      {/* Grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.035,
        }}
      />

      <div className="container-main relative z-10">

        {/* ── Header ── */}
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label-sm mb-5"
            style={{ color: 'rgba(163,54,74,0.75)', letterSpacing: '0.18em' }}
          >
            {w.eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              color: '#FFFFFF',
              marginBottom: '0.875rem',
            }}
          >
            {w.headline.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1
                  ? <span className="italic" style={{ color: 'rgba(255,255,255,0.28)' }}>{line}</span>
                  : line}
              </span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.22, duration: 0.65 }}
            style={{ color: 'rgba(255,246,242,0.55)', fontSize: '1rem', maxWidth: '34ch' }}
          >
            {w.subline}
          </motion.p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

          {/* ── Card 1: Pros ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.28, duration: 0.8, ease }}
            whileHover={{
              scale: 1.016,
              boxShadow: '0 16px 56px rgba(0,0,0,0.35)',
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }}
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '20px',
              padding: '36px 40px 40px',
              transformOrigin: 'center',
            }}
          >
            <p
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: 1.2,
                marginBottom: '28px',
                color: '#FFFFFF',
              }}
            >
              Was du <span style={{ color: ACCENT }}>bekommst</span>
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {w.pros.map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={prosVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
                >
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'rgba(255,246,242,0.7)',
                    }}
                  >
                    <CheckIcon />
                  </span>
                  <span style={{ color: 'rgba(255,246,242,0.82)', fontSize: '0.9375rem', lineHeight: 1.45 }}>
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Card 2: Cons ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.36, duration: 0.8, ease }}
            whileHover={{
              backgroundColor: 'rgba(0,0,0,0.28)',
              transition: { duration: 0.35 },
            }}
            style={{
              backgroundColor: 'rgba(0,0,0,0.22)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '20px',
              padding: '36px 40px 40px',
            }}
          >
            <p
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: 1.2,
                marginBottom: '28px',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              Was du <span style={{ color: ACCENT }}>nicht</span> bekommst
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {w.cons.map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={consVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
                >
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: ACCENT,
                    }}
                  >
                    <CrossIcon />
                  </span>
                  <span style={{ color: 'rgba(255,246,242,0.42)', fontSize: '0.9375rem', lineHeight: 1.45 }}>
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
