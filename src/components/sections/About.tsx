'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

// ─── Constants ────────────────────────────────────────────────────────────────

const ease      = [0.16, 1, 0.3, 1]      as [number, number, number, number]
const hoverEase = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const RADIUS = '1rem'

// ─── Portrait placeholder ─────────────────────────────────────────────────────

function Portrait({
  initial,
  gradient,
  highlightOrigin,
  name,
  role,
}: {
  initial:         string
  gradient:        string
  highlightOrigin: string
  name:            string
  role:            string
}) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: '3 / 4',
        borderRadius: RADIUS,
        // Shadow lives here so it rotates naturally with the frame
        boxShadow: '0 24px 64px rgba(31,41,55,0.16), 0 6px 20px rgba(31,41,55,0.08)',
      }}
    >
      {/* ── Background gradient ── */}
      <div className="absolute inset-0" style={{ background: gradient }} />

      {/* ── Directional highlight ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at ${highlightOrigin}, rgba(255,255,255,0.07) 0%, transparent 62%)`,
        }}
      />

      {/* ── Grain ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.05,
        }}
      />

      {/* ── Ghost initial — atmospheric only ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
      >
        <span
          className="font-sans italic"
          style={{
            fontSize:   'clamp(7rem, 18vw, 14rem)',
            color:      'rgba(197,168,130,0.07)',
            lineHeight: 1,
          }}
        >
          {initial}
        </span>
      </div>

      {/*
        ── Real portrait ──
        When photos are ready, uncomment and adjust the path:

        <img
          src={`/images/founders/${initial.toLowerCase()}.jpg`}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      */}

      {/* ── Name overlay — bottom of frame ── */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        {/* Fade-to-dark veil */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height:     '45%',
            background: 'linear-gradient(to top, rgba(14,14,12,0.72) 0%, transparent 100%)',
          }}
        />
        {/* Text */}
        <div className="relative px-5 pb-5 pt-0">
          <p
            className="font-sans text-white"
            style={{ fontSize: '1.05rem', lineHeight: 1.2, opacity: 0.92 }}
          >
            {name}
          </p>
          <p
            className="label-sm"
            style={{
              fontSize:      '0.62rem',
              letterSpacing: '0.14em',
              color:         'rgba(255,255,255,0.42)',
              marginTop:     '4px',
            }}
          >
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
      className="py-28 md:py-44 overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-start gap-16 lg:gap-20 xl:gap-28">

          {/* ══════════════════════════════════════════════════════════════════
              LEFT — editorial text (unchanged)
          ══════════════════════════════════════════════════════════════════ */}
          <div
            ref={leftRef}
            className="lg:w-[44%] xl:w-[42%] shrink-0 lg:sticky lg:top-28"
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={leftView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              className="label-sm text-muted mb-8 md:mb-10"
              style={{ letterSpacing: '0.2em' }}
            >
              {a.eyebrow}
            </motion.p>

            {/* Headline */}
            <div className="overflow-hidden mb-8 md:mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={leftView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08, duration: 0.9, ease }}
                className="heading-display text-ink"
                style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', lineHeight: 1.05 }}
              >
                {a.headline.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {i === 1
                      ? <em className="not-italic" style={{ color: 'var(--color-muted)' }}>{line}</em>
                      : line}
                  </span>
                ))}
              </motion.h2>
            </div>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={leftView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.75, ease }}
              className="text-muted leading-relaxed mb-12 md:mb-14"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)' }}
            >
              {a.subline}
            </motion.p>

            {/* Rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={leftView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.28, duration: 0.8, ease }}
              className="origin-left mb-10 md:mb-12"
              style={{ height: '1px', backgroundColor: 'var(--color-border)' }}
            />

            {/* Founder lines */}
            <div className="flex flex-col gap-8 mb-12 md:mb-14">
              {[busra, aysun].map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: -14 }}
                  animate={leftView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.12, duration: 0.7, ease }}
                >
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span
                      className="shrink-0 block"
                      style={{ width: '16px', height: '1px', backgroundColor: '#C5A882', marginBottom: '2px' }}
                    />
                    <p
                      className="font-sans text-ink"
                      style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', lineHeight: 1.2 }}
                    >
                      {f.name}
                    </p>
                  </div>
                  <p
                    className="text-muted leading-relaxed"
                    style={{ fontSize: '0.875rem', paddingLeft: '28px' }}
                  >
                    {f.line}
                  </p>
                  <p
                    className="label-sm"
                    style={{
                      fontSize: '0.65rem', letterSpacing: '0.16em',
                      color: 'rgba(138,138,122,0.6)', paddingLeft: '28px', marginTop: '6px',
                    }}
                  >
                    {f.role}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={leftView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.62, duration: 0.8, ease }}
              className="origin-left mb-8 md:mb-9"
              style={{ height: '1px', backgroundColor: 'var(--color-border)' }}
            />

            {/* Closing */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={leftView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.72, duration: 0.8, ease }}
              className="font-sans italic text-ink"
              style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', lineHeight: 1.45 }}
            >
              &ldquo;{a.closing}&rdquo;
            </motion.p>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT — rotated + offset portrait composition
          ══════════════════════════════════════════════════════════════════ */}
          <div ref={rightRef} className="lg:flex-1">

            {/* ── MOBILE — stacked with slight overlap + rotation ── */}
            <div className="lg:hidden relative">
              {/* Büsra */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={rightView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease }}
                whileHover={{
                  scale: 1.03,
                  rotate: -0.6,
                  transition: { duration: 0.45, ease: hoverEase },
                }}
                style={{ rotate: -2, originX: '50%', originY: '50%', zIndex: 10, position: 'relative' }}
                className="w-[76%]"
              >
                <Portrait
                  initial={busra.initial}
                  gradient="linear-gradient(158deg, #181816 0%, #252521 52%, #1a1a18 100%)"
                  highlightOrigin="28% 22%"
                  name={busra.name}
                  role={busra.role}
                />
              </motion.div>

              {/* Aysun — offset right + overlapping */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={rightView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.28, ease }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0.6,
                  transition: { duration: 0.45, ease: hoverEase },
                }}
                style={{
                  rotate: 2, originX: '50%', originY: '50%',
                  zIndex: 20, position: 'relative',
                  marginTop: '-18%', marginLeft: 'auto',
                }}
                className="w-[76%]"
              >
                <Portrait
                  initial={aysun.initial}
                  gradient="linear-gradient(158deg, #1c1c1a 0%, #2a2a26 52%, #1a1a18 100%)"
                  highlightOrigin="72% 28%"
                  name={aysun.name}
                  role={aysun.role}
                />
              </motion.div>
            </div>

            {/* ── DESKTOP — absolute offset + rotated composition ──
                Geometry (right col ≈ 520–600px wide):
                  Both images: 57% wide → ~300–340px
                  Aspect 3:4  → ~400–453px tall
                  Büsra: top 0, left 0
                  Aysun: bottom 0, right 0 (container padded to show full image)
                  Horizontal overlap ≈ 14% of col width → intentional layering
                  Container min-height: 620px
            ─────────────────────────────────────────────────────────────── */}
            <div
              className="hidden lg:block relative"
              style={{ minHeight: '620px' }}
            >

              {/* Büsra — top-left, rotated -2° */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={rightView ? { opacity: 1, y: 0, rotate: -2 } : { opacity: 0, y: 40, rotate: -2 }}
                transition={{ duration: 1.0, delay: 0.1, ease }}
                whileHover={{
                  scale: 1.03,
                  rotate: -0.6,
                  transition: { duration: 0.5, ease: hoverEase },
                }}
                style={{
                  position:       'absolute',
                  top:            0,
                  left:           0,
                  width:          '57%',
                  zIndex:         10,
                  originX:        '50%',
                  originY:        '50%',
                  cursor:         'default',
                }}
              >
                <Portrait
                  initial={busra.initial}
                  gradient="linear-gradient(158deg, #181816 0%, #252521 52%, #1a1a18 100%)"
                  highlightOrigin="28% 22%"
                  name={busra.name}
                  role={busra.role}
                />
              </motion.div>

              {/* Aysun — bottom-right, rotated +2°, in front */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={rightView ? { opacity: 1, y: 0, rotate: 2 } : { opacity: 0, y: 40, rotate: 2 }}
                transition={{ duration: 1.0, delay: 0.3, ease }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0.6,
                  transition: { duration: 0.5, ease: hoverEase },
                }}
                style={{
                  position:       'absolute',
                  bottom:         0,
                  right:          0,
                  width:          '57%',
                  zIndex:         20,
                  originX:        '50%',
                  originY:        '50%',
                  cursor:         'default',
                }}
              >
                <Portrait
                  initial={aysun.initial}
                  gradient="linear-gradient(158deg, #1c1c1a 0%, #2a2a26 52%, #1a1a18 100%)"
                  highlightOrigin="72% 28%"
                  name={aysun.name}
                  role={aysun.role}
                />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
