'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MeshGradient } from '@paper-design/shaders-react'

const COLORS = ['#14060D', '#2A0D18', '#4A1628', '#6E1F35', '#A3364A', '#D97A5F']

// Hero color tokens — exact match
const HERO_BASE   = '#FFF6F2'                    // "Websites," — strong main
const HERO_ITALIC = 'rgba(255,246,242,0.72)'     // "die Eindruck hinterlassen" — soft secondary

const STATIC = 'Websites, '
const TYPED  = 'die Eindruck hinterlassen.'

export default function Statement() {
  const ref    = useRef<HTMLElement>(null)
  // once: false → replays every time the section enters viewport
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Hero-identical background — static */}
      <MeshGradient
        colors={COLORS}
        speed={0}
        distortion={0.48}
        swirl={0.22}
        offsetX={0.04}
        grainMixer={0}
        grainOverlay={0}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 88% at 50% 50%, transparent 25%, rgba(8,2,5,0.55) 100%)',
        }}
      />

      {/* Grain */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.03 }}
      >
        <filter id="stmt-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#stmt-grain)" />
      </svg>

      {/* Content */}
      <div className="container-main relative z-10 flex justify-center">
        <h2
          className="text-4xl md:text-5xl font-semibold whitespace-nowrap"
          style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          {/* "Websites, " — appears immediately, hero base color */}
          <span style={{ color: HERO_BASE }}>{STATIC}</span>

          {/* "die Eindruck hinterlassen." — hero italic style, types in char by char */}
          <span
            className="italic"
            style={{
              fontWeight: 500,
              fontSize: '0.88em',
              color: HERO_ITALIC,
            }}
          >
            {TYPED.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.06,
                  delay: inView ? 0.3 + i * 0.045 : 0,
                  ease: 'easeOut',
                }}
                style={{ display: 'inline' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </h2>
      </div>
    </section>
  )
}
