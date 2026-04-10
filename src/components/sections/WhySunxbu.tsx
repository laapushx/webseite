'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function WhySunxbu() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const w = tr.why

  return (
    <section className="py-24 md:py-36 bg-surface-2 overflow-hidden">
      <div className="container-main">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-32">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label-sm text-muted mb-4"
            >
              {w.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="heading-xl text-ink mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {w.headline.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="italic">{line}</span> : line}
                </span>
              ))}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-muted text-base md:text-lg leading-relaxed"
            >
              {w.subline}
            </motion.p>
          </div>

          {/* Right — items */}
          <div className="flex flex-col divide-y divide-border">
            {w.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 * i + 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="py-8 group"
              >
                <div className="flex items-start gap-6">
                  <span className="label-sm text-accent mt-1 shrink-0">{item.number}</span>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-ink mb-2 group-hover:text-accent transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-muted text-sm md:text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
