'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function WhySunxbu() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const w = tr.why

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-14 md:py-24"
      style={{ backgroundColor: '#1F2937' }}
    >
      {/* Grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          animation: 'grain 10s steps(10) infinite',
        }}
      />

      {/* Subtle accent orb */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(122,46,58,0.06) 0%, transparent 70%)',
        }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 md:gap-24 items-start">

          {/* Left — manifesto */}
          <div className="lg:sticky lg:top-32">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="label-sm mb-6"
              style={{ color: 'rgba(122,46,58,0.7)', letterSpacing: '0.18em' }}
            >
              {w.eyebrow}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12, duration: 0.9, ease }}
              className="heading-xl text-white mb-8"
            >
              {w.headline.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="italic" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-base md:text-lg leading-relaxed mb-10 max-w-sm"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              {w.subline}
            </motion.p>

            {/* Manifesto statement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="border-l-2 pl-5 py-1"
              style={{ borderColor: 'rgba(122,46,58,0.35)' }}
            >
              <p
                className="font-sans italic text-xl md:text-2xl leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                &ldquo;Kein Template. Keine Kompromisse. Nur Ihre Marke.&rdquo;
              </p>
            </motion.div>
          </div>

          {/* Right — principles */}
          <div
            className="flex flex-col"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {w.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 * i + 0.25, duration: 0.7, ease }}
                className="py-8 group"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-start gap-6">
                  <span
                    className="label-sm mt-1 shrink-0 font-[600]"
                    style={{ color: 'var(--color-accent)', letterSpacing: '0.1em' }}
                  >
                    {item.number}
                  </span>
                  <div>
                    <h3
                      className="h3 text-white mb-2.5 transition-colors duration-300"
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm md:text-base leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.38)' }}
                    >
                      {item.description}
                    </p>
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
