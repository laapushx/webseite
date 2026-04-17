'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

function FAQItem({
  question,
  answer,
  index,
  inView,
}: {
  question: string
  answer: string
  index: number
  inView: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.07 * index, duration: 0.6, ease }}
      className="border-b border-border"
      style={{ backgroundColor: open ? 'rgba(122,46,58,0.03)' : 'transparent', transition: 'background-color 0.3s ease' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
        aria-expanded={open}
      >
        <span
          className="font-sans text-lg md:text-xl text-ink leading-snug transition-colors duration-250 group-hover:text-accent"
          style={{ lineHeight: 1.3 }}
        >
          {question}
        </span>

        <span
          className="mt-1 shrink-0 w-6 h-6 border border-border rounded-full flex items-center justify-center transition-all duration-220 group-hover:border-accent"
          style={{ fontSize: '1rem', lineHeight: 1 }}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.22 }}
            className="block text-muted group-hover:text-accent transition-colors"
          >
            +
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease }}
            className="overflow-hidden"
          >
            <p className="text-muted text-sm md:text-base leading-relaxed pb-7 max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const f = tr.faq

  return (
    <section className="py-24 md:py-40 bg-bg">
      <div className="container-main">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 md:gap-20">
          {/* Left header — sticky */}
          <div className="lg:sticky lg:top-32 self-start">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label-sm text-accent mb-4"
            >
              {f.eyebrow}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease }}
              className="heading-xl text-ink mb-8"
            >
              {f.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-muted text-sm md:text-base leading-relaxed mb-8"
            >
              Haben Sie weitere Fragen? Wir antworten immer persönlich.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <a
                href="#kontakt"
                className="label-sm inline-flex items-center gap-2 text-ink border-b border-ink pb-0.5 hover:text-accent hover:border-accent transition-colors duration-200"
                style={{ fontSize: '0.7rem', letterSpacing: '0.14em' }}
              >
                KONTAKT AUFNEHMEN →
              </a>
            </motion.div>
          </div>

          {/* Right — accordion */}
          <div className="border-t border-border">
            {f.items.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                index={i}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
