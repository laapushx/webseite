'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function SocialProof() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="border-t border-border bg-bg">
      <div className="container-main">
        <div className="py-5 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-x-0 gap-y-2">
          {tr.social_proof.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.6 }}
              className="flex items-center"
            >
              <span className="text-xs text-muted tracking-wide">{item}</span>
              {i < tr.social_proof.items.length - 1 && (
                <span className="mx-4 md:mx-6 text-border select-none text-xs">·</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
