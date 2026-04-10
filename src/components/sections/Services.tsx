'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

interface PackageRowProps {
  pkg: {
    number: string
    name: string
    priceRange: string
    description: string
    features: string[]
    isAdvanced: boolean
  }
  cta_label: string
  details_label: string
  details_close: string
  index: number
  inView: boolean
}

function PackageRow({ pkg, cta_label, details_label, details_close, index, inView }: PackageRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 * index, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="border-b border-border group"
    >
      {/* Main row */}
      <div
        className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-7 md:py-8 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {/* Number */}
        <span className="label-sm text-muted w-8 shrink-0">{pkg.number}</span>

        {/* Name + description */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-1">
            <h3 className="font-serif text-2xl md:text-3xl text-ink group-hover:text-accent transition-colors duration-200">
              {pkg.name}
            </h3>
            {pkg.isAdvanced && (
              <span className="label-sm text-accent border border-accent px-2.5 py-1 rounded-full w-fit">
                Advanced
              </span>
            )}
          </div>
          <p className="text-muted text-sm md:text-base leading-relaxed">{pkg.description}</p>
        </div>

        {/* Price + actions */}
        <div className="flex items-center gap-5 md:gap-8 shrink-0">
          <span className="font-serif text-xl md:text-2xl text-accent">{pkg.priceRange}</span>
          <div className="flex items-center gap-3">
            <a
              href="#kontakt"
              onClick={(e) => e.stopPropagation()}
              className="label-sm text-surface bg-ink px-5 py-2.5 rounded-full hover:bg-accent hover:text-ink transition-all duration-200"
            >
              {cta_label}
            </a>
            <button
              aria-label={open ? details_close : details_label}
              className="w-8 h-8 flex items-center justify-center text-muted hover:text-ink transition-colors"
            >
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="block text-lg leading-none"
              >
                +
              </motion.span>
            </button>
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
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <ul className="pb-7 pl-0 md:pl-16 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pkg.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                  <span className="mt-1 w-1 h-1 rounded-full bg-accent shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
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
    <section id="leistungen" className="py-24 md:py-36 bg-bg">
      <div className="container-main">
        {/* Header */}
        <div ref={ref} className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label-sm text-muted mb-4"
            >
              {s.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
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
        </div>

        {/* Packages */}
        <div className="border-t border-border">
          {s.packages.map((pkg, i) => (
            <PackageRow
              key={pkg.number}
              pkg={pkg}
              cta_label={s.cta_label}
              details_label={s.details_label}
              details_close={s.details_close}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 text-sm text-muted"
        >
          Nicht sicher, welches Paket passt?{' '}
          <a href="#kontakt" className="text-ink underline underline-offset-4 hover:text-accent transition-colors">
            Kostenloses Erstgespräch vereinbaren →
          </a>
        </motion.p>
      </div>
    </section>
  )
}
