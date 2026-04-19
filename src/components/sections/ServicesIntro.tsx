'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MeshGradient } from '@paper-design/shaders-react'

const COLORS = ['#14060D', '#2A0D18', '#4A1628', '#6E1F35', '#A3364A', '#D97A5F']
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function ServicesIntro() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })

  return (
    <section ref={ref} className="relative overflow-hidden py-16 md:py-20">
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

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 88% at 50% 50%, transparent 25%, rgba(8,2,5,0.55) 100%)',
        }}
      />

      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.03 }}
      >
        <filter id="si-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#si-grain)" />
      </svg>

      <div className="container-main relative z-10 flex flex-col items-center text-center gap-6">

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.75, ease }}
          className="text-4xl md:text-5xl font-semibold"
          style={{ letterSpacing: '-0.02em', lineHeight: 1.1, color: '#FFF6F2' }}
        >
          Du willst mit uns{' '}
          <span
            className="italic"
            style={{ fontWeight: 500, fontSize: '0.88em', color: 'rgba(255,246,242,0.72)' }}
          >
            arbeiten?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.65, delay: 0.15, ease }}
          style={{ color: 'rgba(255,246,242,0.48)', fontSize: '1rem', letterSpacing: '0.01em' }}
        >
          Dann starten wir direkt.
        </motion.p>

        <motion.a
          href="#leistungen"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.6, delay: 0.28, ease }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(255,246,242,0.72)',
            border: '1px solid rgba(255,246,242,0.22)',
            padding: '10px 24px', borderRadius: '100px',
            transition: 'all 300ms ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = '#FFF6F2'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,246,242,0.5)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(255,246,242,0.72)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,246,242,0.22)'
          }}
        >
          Projektfragebogen starten →
        </motion.a>

      </div>
    </section>
  )
}
