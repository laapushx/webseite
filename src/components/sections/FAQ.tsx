'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

interface FAQItemProps {
  question: string
  answer: string
  index: number
  inView: boolean
}

function FAQItem({ question, answer, index, inView }: FAQItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.08 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="border-b border-border"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="font-serif text-lg md:text-xl text-ink group-hover:text-accent transition-colors duration-200 leading-snug">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-1 text-xl text-muted group-hover:text-ink transition-colors shrink-0 leading-none"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p className="text-muted text-sm md:text-base leading-relaxed pb-6">{answer}</p>
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
    <section className="py-24 md:py-36 bg-surface-2">
      <div className="container-main">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* Left header */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label-sm text-muted mb-4"
            >
              {f.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="heading-xl text-ink mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {f.headline}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <a
                href="#kontakt"
                className="label-sm text-ink underline underline-offset-4 hover:text-accent transition-colors"
              >
                Weitere Fragen? Kontakt aufnehmen →
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
