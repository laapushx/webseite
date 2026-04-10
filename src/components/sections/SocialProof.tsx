'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function SocialProof() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="border-y border-border bg-surface-2">
      <div className="container-main">
        <div className="py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          {tr.social_proof.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex items-center gap-4 md:gap-0"
            >
              <span className="label-sm text-ink text-center md:text-left">{item}</span>
              {i < tr.social_proof.items.length - 1 && (
                <span className="hidden md:block w-px h-4 bg-border mx-8 md:mx-12" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
