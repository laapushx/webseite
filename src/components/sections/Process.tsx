'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Process() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const p = tr.process

  return (
    <section id="prozess" className="py-24 md:py-40 bg-bg overflow-hidden">
      <div className="container-main">
        {/* Header */}
        <div ref={ref} className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label-sm text-accent mb-4"
            >
              {p.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease }}
              className="heading-xl text-ink"
            >
              {p.headline.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="italic text-muted">{line}</span> : line}
                </span>
              ))}
            </motion.h2>
          </div>

          {/* Desktop: step count */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="label-sm text-muted hidden md:block"
          >
            {p.steps.length} Schritte
          </motion.span>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-border">
          {p.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.14 * i + 0.2, duration: 0.8, ease }}
              className="relative group border-b md:border-b-0 border-border"
              style={{
                borderRight: i < p.steps.length - 1 ? '1px solid var(--color-border)' : undefined,
              }}
            >
              <div className="pt-10 pb-12 md:pr-10 md:pl-0 px-0 overflow-hidden">
                {/* Large background number */}
                <div
                  className="relative mb-8 h-24 md:h-28 flex items-center"
                  style={{ paddingLeft: i > 0 ? '1rem' : 0 }}
                >
                  <span
                    className="font-sans absolute top-0 left-0 leading-none select-none pointer-events-none transition-all duration-500 opacity-20 group-hover:opacity-60 group-hover:-translate-y-1"
                    style={{
                      fontSize: 'clamp(5rem, 10vw, 8rem)',
                      color: 'var(--color-ink)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>

                  {/* Connector line — desktop only, between steps */}
                  {i < p.steps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ delay: 0.3 + 0.14 * i, duration: 1, ease }}
                      className="hidden md:block absolute right-0 top-10 w-[120%] h-px origin-left"
                      style={{ backgroundColor: 'rgba(122,46,58,0.18)', zIndex: 0 }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingLeft: i > 0 ? '1rem' : 0 }}>
                  <h3
                    className="h3 text-ink mb-3 transition-colors duration-300 group-hover:text-accent"
                  >
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 md:mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <a
            href="#kontakt"
            className="label-sm inline-flex items-center gap-3 bg-ink text-surface px-7 py-4 hover:bg-accent hover:text-ink transition-all duration-300"
          >
            Jetzt Projekt starten ↗
          </a>
          <span className="text-sm text-muted">
            Kostenloses Erstgespräch · Kein Verkaufsdruck
          </span>
        </motion.div>
      </div>
    </section>
  )
}
