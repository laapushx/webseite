'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function Process() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const p = tr.process

  return (
    <section id="prozess" className="py-24 md:py-36 bg-bg">
      <div className="container-main">
        {/* Header */}
        <div ref={ref} className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label-sm text-muted mb-4"
          >
            {p.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="heading-xl text-ink"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
          >
            {p.headline.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="italic text-muted">{line}</span> : line}
              </span>
            ))}
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {p.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative"
            >
              {/* Connector line — desktop */}
              {i < p.steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.3 + 0.15 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className="hidden md:block absolute top-5 left-full w-full h-px bg-accent/30 origin-left z-0"
                  style={{ width: 'calc(100% - 2rem)' }}
                />
              )}

              <div className="md:pr-12 pb-10 md:pb-0 border-b md:border-b-0 border-border last:border-0">
                {/* Number with dot */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-10 rounded-full border border-accent flex items-center justify-center font-serif text-sm text-accent">
                    {step.number}
                  </span>
                  {i < p.steps.length - 1 && (
                    <div className="md:hidden flex-1 h-px bg-border" />
                  )}
                </div>

                <h3 className="font-serif text-xl md:text-2xl text-ink mb-3">{step.title}</h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
