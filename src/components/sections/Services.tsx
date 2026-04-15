'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

interface Pkg {
  number: string
  name: string
  priceRange: string
  description: string
  features: string[]
  isAdvanced: boolean
}

function PackageRow({
  pkg,
  cta_label,
  index,
  inView,
}: {
  pkg: Pkg
  cta_label: string
  index: number
  inView: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.09 * index, duration: 0.7, ease }}
      className="border-b border-border group"
    >
      {/* Row header */}
      <div
        className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-8 md:py-10 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {/* Number */}
        <span className="label-sm text-muted w-8 shrink-0 hidden md:block" style={{ letterSpacing: '0.1em' }}>
          {pkg.number}
        </span>

        {/* Name + desc */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
            <h3
              className="font-sans text-2xl md:text-3xl text-ink transition-colors duration-300 group-hover:text-accent"
              style={{ lineHeight: 1.15 }}
            >
              {pkg.name}
            </h3>
            {pkg.isAdvanced && (
              <span
                className="label-sm border rounded px-2.5 py-1 w-fit"
                style={{
                  color: '#C5A882',
                  borderColor: 'rgba(197,168,130,0.4)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                }}
              >
                ADVANCED
              </span>
            )}
          </div>
          <p className="text-muted text-sm md:text-base leading-relaxed max-w-lg">
            {pkg.description}
          </p>
        </div>

        {/* Price + actions */}
        <div className="flex items-center gap-5 md:gap-8 shrink-0">
          <span
            className="font-sans text-xl md:text-2xl"
            style={{ color: '#C5A882', letterSpacing: '-0.01em' }}
          >
            {pkg.priceRange}
          </span>

          <div className="flex items-center gap-3">
            <a
              href="#kontakt"
              onClick={(e) => e.stopPropagation()}
              className="label-sm bg-ink text-surface px-7 py-3.5 rounded-full hover:bg-accent hover:text-ink transition-all duration-250 hidden sm:inline-block"
              style={{ fontSize: '0.68rem', letterSpacing: '0.12em' }}
            >
              {cta_label}
            </a>

            <motion.button
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.22 }}
              className="w-8 h-8 border border-border rounded-full flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-all duration-200"
              aria-label={open ? 'Schließen' : 'Details'}
            >
              <span className="text-base leading-none block">+</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Expandable features */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease }}
            className="overflow-hidden"
          >
            <div className="pb-8 md:pb-10 md:pl-16">
              {/* Features grid */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-8 mb-6">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted">
                    <span
                      className="mt-[0.35rem] w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: '#C5A882' }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <a
                href="#kontakt"
                className="sm:hidden label-sm inline-flex items-center gap-2 bg-ink text-surface px-7 py-3.5 rounded-full hover:bg-accent hover:text-ink transition-all duration-200"
                style={{ fontSize: '0.68rem' }}
              >
                {cta_label} ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Services() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const s = tr.services

  return (
    <section id="leistungen" className="py-24 md:py-40 bg-surface">
      <div className="container-main">
        {/* Header */}
        <div ref={ref} className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label-sm text-muted mb-4"
          >
            {s.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            className="heading-xl text-ink"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
          >
            {s.headline.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="italic text-muted">{line}</span> : line}
              </span>
            ))}
          </motion.h2>
        </div>

        {/* Packages */}
        <div className="border-t border-border">
          {s.packages.map((pkg, i) => (
            <PackageRow
              key={pkg.number}
              pkg={pkg}
              cta_label={s.cta_label}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-10 text-sm text-muted"
        >
          Nicht sicher, welches Paket passt?{' '}
          <a
            href="#kontakt"
            className="text-ink underline underline-offset-4 hover:text-accent transition-colors duration-200"
          >
            Kostenloses Erstgespräch vereinbaren →
          </a>
        </motion.p>
      </div>
    </section>
  )
}
