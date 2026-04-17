'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

// ─── Constants ────────────────────────────────────────────────────────────────

const ease      = [0.16, 1, 0.3, 1]      as [number, number, number, number]
const hoverEase = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const RADIUS = '1rem'

const C = {
  ink:      '#1C1C1C',
  muted:    '#6F6763',
  faint:    'rgba(111,103,99,0.48)',
  burgundy: '#7A2E3A',
  burRule:  'rgba(122,46,58,0.30)',
  blue:     '#1C2B42',
  bg:       '#FAF9F7',
}

// ─── Portrait ─────────────────────────────────────────────────────────────────

function Portrait({
  initial,
  gradient,
  highlightOrigin,
  name,
  role,
  photo,
}: {
  initial:         string
  gradient:        string
  highlightOrigin: string
  name:            string
  role:            string
  photo?:          string
}) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: '3 / 4',
        borderRadius: RADIUS,
        boxShadow: '0 28px 60px rgba(20,6,13,0.26), 0 6px 20px rgba(20,6,13,0.14)',
      }}
    >
      {photo ? (
        <>
          <img
            src={photo}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(74,22,40,0.08)' }}
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0" style={{ background: gradient }} />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at ${highlightOrigin}, rgba(122,46,58,0.06) 0%, transparent 58%)`,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              opacity: 0.05,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
          >
            <span
              className="font-sans italic"
              style={{ fontSize: 'clamp(7rem, 18vw, 14rem)', color: 'rgba(122,46,58,0.08)', lineHeight: 1 }}
            >
              {initial}
            </span>
          </div>
        </>
      )}

      {/* Name overlay */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: '50%',
            background: 'linear-gradient(to top, rgba(12,5,8,0.88) 0%, rgba(12,5,8,0.3) 60%, transparent 100%)',
          }}
        />
        <div className="relative px-5 pb-5">
          <p className="text-base font-medium" style={{ color: '#FFF6F2', opacity: 0.96 }}>
            {name}
          </p>
          <p className="text-sm font-normal mt-0.5" style={{ color: 'rgba(255,246,242,0.45)' }}>
            {role}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function About() {
  const { tr } = useLanguage()
  const a = tr.about

  const leftRef  = useRef<HTMLDivElement>(null)
  const leftView = useInView(leftRef, { once: true, margin: '-80px' })

  const rightRef  = useRef<HTMLDivElement>(null)
  const rightView = useInView(rightRef, { once: true, margin: '-60px' })

  const [busra, aysun] = a.founders

  return (
    <section
      id="about"
      className="py-12 md:py-16 overflow-hidden"
      style={{ backgroundColor: C.bg }}
    >
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-start gap-16 lg:gap-20 xl:gap-28">

          {/* ── LEFT ── */}
          <div ref={leftRef} className="lg:w-[58%] xl:w-[55%] shrink-0 lg:sticky lg:top-28">

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={leftView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              className="label-sm text-accent mb-3"
            >
              {a.eyebrow}
            </motion.p>

            {/* Headline */}
            <div className="mb-8 md:mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={leftView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08, duration: 0.9, ease }}
                className="text-3xl md:text-4xl font-semibold leading-[1.05] tracking-[-0.01em]"
              >
                {a.headline.split('\n').map((line, i) => (
                  <span
                    key={i}
                    className={`block whitespace-nowrap${i === 1 ? ' mt-2' : ''}`}
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {line}
                  </span>
                ))}
              </motion.h2>
            </div>

            {/* Story paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={leftView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.75, ease }}
              className="text-lg leading-relaxed mb-6 text-muted"
            >
              {a.story}
            </motion.p>

            {/* Positioning paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={leftView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.75, ease }}
              className="text-lg leading-relaxed mb-12 md:mb-16 text-muted"
            >
              {a.positioning}
            </motion.p>

            {/* Names — minimal */}
            <div className="flex flex-col gap-4">
              {[busra, aysun].map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={leftView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.38 + i * 0.1, duration: 0.6, ease }}
                >
                  <p
                    className="text-base font-medium transition-colors duration-200 mb-1.5"
                    style={{ color: C.ink }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.blue)}
                    onMouseLeave={e => (e.currentTarget.style.color = C.ink)}
                  >
                    {f.name}
                  </p>
                  <p className="text-sm font-normal" style={{ color: C.faint, letterSpacing: '0.01em' }}>
                    {f.role}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>

          {/* ── RIGHT — portrait composition ── */}
          <div ref={rightRef} className="lg:flex-1">

            {/* Mobile */}
            <div className="lg:hidden relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={rightView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease }}
                whileHover={{ scale: 1.03, rotate: -0.6, transition: { duration: 0.45, ease: hoverEase } }}
                style={{ rotate: -2, originX: '50%', originY: '50%', zIndex: 10, position: 'relative' }}
                className="w-[76%]"
              >
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Portrait
                    initial={busra.initial}
                    gradient="linear-gradient(155deg, #120A0D 0%, #1E0E15 50%, #150B10 100%)"
                    highlightOrigin="28% 22%"
                    name={busra.name}
                    role={busra.role}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={rightView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.28, ease }}
                whileHover={{ scale: 1.03, rotate: 0.6, transition: { duration: 0.45, ease: hoverEase } }}
                style={{
                  rotate: 2, originX: '50%', originY: '50%',
                  zIndex: 20, position: 'relative',
                  marginTop: '-18%', marginLeft: 'auto',
                }}
                className="w-[76%]"
              >
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
                >
                  <Portrait
                    initial={aysun.initial}
                    gradient="linear-gradient(155deg, #160C10 0%, #221018 50%, #180D12 100%)"
                    highlightOrigin="72% 28%"
                    name={aysun.name}
                    role={aysun.role}
                    photo="/images/aysun.jpg"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Desktop — layered editorial stack */}
            <div className="hidden lg:block relative" style={{ minHeight: '540px' }}>

              {/* Büsra — back card, top-left */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={rightView ? { opacity: 1, y: 0, rotate: -1.5 } : { opacity: 0, y: 40, rotate: -1.5 }}
                transition={{ duration: 1.0, delay: 0.1, ease }}
                whileHover={{ scale: 1.02, rotate: -0.5, transition: { duration: 0.5, ease: hoverEase } }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '60%',
                  zIndex: 10,
                  originX: '50%',
                  originY: '50%',
                  cursor: 'default',
                }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Portrait
                    initial={busra.initial}
                    gradient="linear-gradient(155deg, #120A0D 0%, #1E0E15 50%, #150B10 100%)"
                    highlightOrigin="28% 22%"
                    name={busra.name}
                    role={busra.role}
                  />
                </motion.div>
              </motion.div>

              {/* Aysun — front card, overlapping bottom-right */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={rightView ? { opacity: 1, y: 0, rotate: 1.5 } : { opacity: 0, y: 40, rotate: 1.5 }}
                transition={{ duration: 1.0, delay: 0.3, ease }}
                whileHover={{ scale: 1.02, rotate: 0.5, transition: { duration: 0.5, ease: hoverEase } }}
                style={{
                  position: 'absolute',
                  top: '155px',
                  left: '155px',
                  width: '60%',
                  zIndex: 20,
                  originX: '50%',
                  originY: '50%',
                  cursor: 'default',
                }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
                >
                  <Portrait
                    initial={aysun.initial}
                    gradient="linear-gradient(155deg, #160C10 0%, #221018 50%, #180D12 100%)"
                    highlightOrigin="72% 28%"
                    name={aysun.name}
                    role={aysun.role}
                    photo="/images/aysun.jpg"
                  />
                </motion.div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
