'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Process() {
  const { tr } = useLanguage()
  const p = tr.process
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const fillWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v < 0.36) setActiveStep(0)
    else if (v < 0.68) setActiveStep(1)
    else setActiveStep(2)
  })

  const step = p.steps[activeStep]

  return (
    <section id="prozess" ref={containerRef} style={{ height: '180vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0,
        background: '#FFFFFF',
        display: 'flex', flexDirection: 'column',
        padding: '64px 0 72px',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px', width: '100%' }}>

          {/* Header */}
          <div style={{ marginBottom: '28px' }}>
            <p className="label-sm text-accent" style={{ marginBottom: '10px' }}>{p.eyebrow}</p>
            <h2 className="heading-xl text-ink" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              {p.headline.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="italic text-muted">{line}</span> : line}
                </span>
              ))}
            </h2>
          </div>

          {/* Track */}
          <div style={{ position: 'relative', marginBottom: '28px' }}>

            {/* Numbers */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              {p.steps.map((s, i) => (
                <span key={i} style={{
                  fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase',
                  color: activeStep === i ? 'var(--color-accent)' : 'var(--color-muted)',
                  fontWeight: activeStep === i ? 500 : 300,
                  transition: 'color 500ms ease',
                  flex: 1,
                  textAlign: i === 0 ? 'left' : i === 1 ? 'center' : 'right',
                }}>
                  {s.number}
                </span>
              ))}
            </div>

            {/* Line + fill + nodes */}
            <div style={{ position: 'relative', height: '4px', background: 'var(--color-border)', borderRadius: '100px' }}>
              <motion.div style={{
                position: 'absolute', left: 0, top: 0, height: '100%',
                width: fillWidth,
                background: 'var(--color-accent)',
                transformOrigin: 'left',
                borderRadius: '100px',
              }} />

              {(['0%', '50%', '100%'] as const).map((pos, i) => (
                <div key={i} style={{
                  position: 'absolute', top: '50%',
                  left: pos,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                }}>
                  <div style={{
                    width: activeStep === i ? 16 : 10,
                    height: activeStep === i ? 16 : 10,
                    borderRadius: '50%',
                    background: activeStep >= i ? 'var(--color-accent)' : '#FFFFFF',
                    border: `1px solid ${activeStep >= i ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    transition: 'all 500ms ease',
                    boxShadow: activeStep === i ? '0 0 0 4px rgba(122,46,58,0.15)' : 'none',
                  }} />
                </div>
              ))}
            </div>

            {/* Titles */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              {p.steps.map((s, i) => (
                <span key={i} style={{
                  flex: 1,
                  textAlign: i === 0 ? 'left' : i === 1 ? 'center' : 'right',
                  fontSize: '0.85rem', letterSpacing: '-0.01em',
                  color: activeStep === i ? 'var(--color-ink)' : 'var(--color-muted)',
                  fontWeight: activeStep === i ? 500 : 300,
                  transition: 'all 500ms ease',
                }}>
                  {s.title}
                </span>
              ))}
            </div>
          </div>

          {/* Active step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease }}
              style={{ maxWidth: '640px' }}
            >
              <p style={{
                fontSize: '0.95rem', lineHeight: 1.85,
                color: 'var(--color-muted)', marginBottom: activeStep === 2 ? '36px' : '0',
              }}>
                {step.description}
              </p>

              <AnimatePresence>
                {activeStep === 2 && (
                  <motion.a
                    href="#kontakt"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.5, ease }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '10px',
                      backgroundColor: '#16243A', color: '#FFF6F2',
                      padding: '15px 32px', borderRadius: '100px',
                      fontSize: '12px', fontWeight: 500,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      boxShadow: '0 6px 24px rgba(10,4,8,0.28)',
                    }}
                  >
                    Jetzt Projekt starten <span style={{ opacity: 0.55 }}>↗</span>
                  </motion.a>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}
