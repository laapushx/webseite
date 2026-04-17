'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function SocialProof() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const metrics = tr.social_proof.metrics

  return (
    <section
      ref={ref}
      style={{ backgroundColor: '#0D0D0B', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="container-main">
        <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.2, duration: 0.8, ease }}
              className="flex flex-col justify-center px-6 md:px-10 py-6 md:py-0"
              style={{
                borderRight: i < metrics.length - 1 ? '1px solid rgba(255,255,255,0.06)' : undefined,
              }}
            >
              <span
                className="heading-display block mb-2"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  color: 'var(--color-accent)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {m.value}
              </span>
              <span
                className="label-sm block"
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  whiteSpace: 'pre-line',
                  letterSpacing: '0.12em',
                  lineHeight: 1.5,
                }}
              >
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
