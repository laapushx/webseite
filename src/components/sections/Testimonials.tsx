'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

// ─── Timing ───────────────────────────────────────────────────────────────────

const ROTATE_MS          = 3400   // switch every 3.4 s
const TRANSITION_S       = 0.72   // card motion duration
const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

// ─── Stack depth configs ──────────────────────────────────────────────────────
//
//  Cards stack downward (y+) and scale down — clearly showing the deck behind.
//  Shadow intensity drops with depth so the front card "lifts" visually.

type Slot = 'front' | 'mid' | 'back' | 'hidden'

const SLOTS: Record<Slot, {
  scale:     number
  y:         number
  opacity:   number
  zIndex:    number
  shadow:    string
}> = {
  front: {
    scale:   1,
    y:       0,
    opacity: 1,
    zIndex:  30,
    shadow:  '0 32px 80px rgba(0,0,0,0.38), 0 8px 24px rgba(0,0,0,0.22)',
  },
  mid: {
    scale:   0.928,
    y:       26,
    opacity: 0.56,
    zIndex:  20,
    shadow:  '0 16px 40px rgba(0,0,0,0.22)',
  },
  back: {
    scale:   0.856,
    y:       48,
    opacity: 0.24,
    zIndex:  10,
    shadow:  '0 8px 20px rgba(0,0,0,0.14)',
  },
  hidden: {
    scale:   0.82,
    y:       58,
    opacity: 0,
    zIndex:  0,
    shadow:  '0 0px 0px rgba(0,0,0,0)',
  },
}

function getSlot(index: number, active: number, total: number): Slot {
  const diff = (index - active + total) % total
  if (diff === 0) return 'front'
  if (diff === 1) return 'mid'
  if (diff === 2) return 'back'
  return 'hidden'
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface TestimonialItem {
  quote:   string
  name:    string
  role:    string
  initial: string
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({ item, slot }: { item: TestimonialItem; slot: Slot }) {
  const cfg    = SLOTS[slot]
  const isFront = slot === 'front'

  return (
    <motion.article
      aria-hidden={!isFront}
      animate={{
        scale:     cfg.scale,
        y:         cfg.y,
        opacity:   cfg.opacity,
        boxShadow: cfg.shadow,
      }}
      transition={{ duration: TRANSITION_S, ease }}
      style={{
        position:      'absolute',
        inset:         '0 0 auto',
        zIndex:        cfg.zIndex,
        pointerEvents: isFront ? 'auto' : 'none',
        transformOrigin: 'top center',
        // Warm white — more luxurious than pure #fff
        backgroundColor: '#FDFCF9',
      }}
      className="rounded-2xl"
    >
      <div className="px-8 py-9 md:px-10 md:py-10 lg:px-11 lg:py-11">

        {/* Decorative quote glyph */}
        <div
          aria-hidden="true"
          className="font-sans select-none leading-none mb-7"
          style={{
            fontSize:  '5.5rem',
            lineHeight: 0.8,
            color:     'rgba(197,168,130,0.18)',
            fontStyle: 'italic',
            marginLeft: '-4px',
          }}
        >
          &ldquo;
        </div>

        {/* Quote */}
        <blockquote
          className="font-sans italic text-ink mb-9"
          style={{
            fontSize:   'clamp(1.1rem, 1.9vw, 1.4rem)',
            lineHeight: 1.7,
            color:      '#1F2937',
          }}
        >
          {item.quote}
        </blockquote>

        {/* Rule */}
        <div
          className="mb-7"
          style={{ height: '1px', backgroundColor: 'rgba(31,41,55,0.1)' }}
        />

        {/* Attribution */}
        <div className="flex items-center gap-4">
          {/* Avatar — square, editorial */}
          <div
            className="shrink-0 flex items-center justify-center rounded"
            style={{
              width:           '34px',
              height:          '34px',
              backgroundColor: '#1F2937',
            }}
          >
            <span
              className="font-sans italic text-white"
              style={{ fontSize: '1rem', lineHeight: 1 }}
            >
              {item.initial}
            </span>
          </div>

          {/* Name / role */}
          <div>
            <p
              className="font-sans text-ink leading-tight"
              style={{ fontSize: '0.92rem', fontWeight: 500 }}
            >
              {item.name}
            </p>
            <p
              className="text-muted"
              style={{
                fontSize:      '0.68rem',
                letterSpacing: '0.08em',
                marginTop:     '3px',
                color:         'rgba(138,138,122,0.85)',
              }}
            >
              {item.role}
            </p>
          </div>
        </div>

      </div>
    </motion.article>
  )
}

// ─── Ghost (height anchor) ────────────────────────────────────────────────────
// Invisible clone of the longest card — keeps the stack container at the right
// height without JavaScript measurement. Must match Card's padding exactly.

function GhostCard({ items }: { items: TestimonialItem[] }) {
  const longest = items.reduce((a, b) => (a.quote.length >= b.quote.length ? a : b))

  return (
    <div
      aria-hidden="true"
      className="invisible pointer-events-none select-none"
      style={{ position: 'relative', zIndex: 0, backgroundColor: '#FDFCF9', borderRadius: '1rem' }}
    >
      <div className="px-8 py-9 md:px-10 md:py-10 lg:px-11 lg:py-11">
        {/* Quote glyph space */}
        <div style={{ height: '4.4rem', marginBottom: '1.75rem' }} />
        {/* Quote — longest to set max height */}
        <p
          className="font-sans italic"
          style={{ fontSize: 'clamp(1.1rem, 1.9vw, 1.4rem)', lineHeight: 1.7, marginBottom: '2.25rem' }}
        >
          {longest.quote}
        </p>
        {/* Rule */}
        <div style={{ height: '1px', marginBottom: '1.75rem' }} />
        {/* Attribution */}
        <div style={{ height: '34px' }} />
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Testimonials() {
  const { tr }   = useLanguage()
  const t        = tr.testimonials
  const items    = t.items
  const total    = items.length

  const [active,   setActive]   = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  // ── Auto-rotation ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total)
    }, ROTATE_MS)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [total, isPaused])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-40"
      style={{ backgroundColor: '#1F2937' }}
    >

      {/* ── Grain ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity:   0.04,
          animation: 'grain 10s steps(10) infinite',
        }}
      />

      {/* ── Subtle champagne orb — top-right corner ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top:        '-30%',
          right:      '-15%',
          width:      '70vw',
          height:     '70vw',
          maxWidth:   '800px',
          maxHeight:  '800px',
          background: 'radial-gradient(circle, rgba(197,168,130,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="container-main relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-14 lg:gap-16 xl:gap-24">

          {/* ── LEFT — editorial intro block ──────────────────────────────── */}
          <div className="lg:w-[38%] xl:w-[36%] shrink-0 lg:sticky lg:top-32">

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              className="label-sm mb-7"
              style={{ color: 'rgba(197,168,130,0.65)', letterSpacing: '0.2em' }}
            >
              {t.eyebrow}
            </motion.p>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08, duration: 0.85, ease }}
              className="heading-display text-white mb-7"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.06 }}
            >
              {t.headline.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1
                    ? <span className="italic" style={{ color: 'rgba(255,255,255,0.36)' }}>{line}</span>
                    : line}
                </span>
              ))}
            </motion.h2>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.75, ease }}
              className="leading-relaxed mb-10 md:mb-12"
              style={{
                fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
                color:    'rgba(255,255,255,0.38)',
                maxWidth: '26rem',
              }}
            >
              {t.subline ?? 'Nicht unsere Worte — die unserer Kunden.'}
            </motion.p>

            {/* Thin rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.9, ease }}
              className="origin-left mb-8"
              style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}
            />

            {/* Progress bar — resets on active change */}
            <div
              className="relative overflow-hidden mb-4"
              style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              <motion.div
                key={active}
                className="absolute inset-y-0 left-0 origin-left"
                style={{ right: 0, backgroundColor: '#C5A882' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isPaused ? 0 : 1 }}
                transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
              />
            </div>

            {/* Counter */}
            <div className="flex items-center justify-between">
              <span
                className="label-sm"
                style={{
                  fontSize:      '0.6rem',
                  letterSpacing: '0.22em',
                  color:         'rgba(255,255,255,0.25)',
                }}
              >
                {String(active + 1).padStart(2, '0')}&nbsp;&nbsp;/&nbsp;&nbsp;{String(total).padStart(2, '0')}
              </span>

              {/* Optional: small CTA */}
              <motion.a
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                href="#kontakt"
                className="label-sm transition-colors duration-200"
                style={{
                  fontSize:      '0.62rem',
                  letterSpacing: '0.16em',
                  color:         'rgba(197,168,130,0.45)',
                  borderBottom:  '1px solid rgba(197,168,130,0.2)',
                  paddingBottom: '1px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'rgba(197,168,130,0.85)'
                  e.currentTarget.style.borderBottomColor = 'rgba(197,168,130,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(197,168,130,0.45)'
                  e.currentTarget.style.borderBottomColor = 'rgba(197,168,130,0.2)'
                }}
              >
                PROJEKT ANFRAGEN →
              </motion.a>
            </div>

          </div>

          {/* ── RIGHT — rotating card stack ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 1.0, ease }}
            className="lg:flex-1"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/*
              Stack container:
              - Ghost card holds the height (via normal flow)
              - All real cards sit absolutely on top, y-animated for depth
              - paddingBottom gives room for the back card to peek
            */}
            <div
              className="relative"
              style={{ paddingBottom: `${SLOTS.back.y + 14}px` }}
            >
              {/* Real cards — absolutely positioned, z-ordered by slot */}
              {items.map((item, i) => (
                <Card
                  key={i}
                  item={item}
                  slot={getSlot(i, active, total)}
                />
              ))}

              {/* Ghost — in flow, invisible, sets container height */}
              <GhostCard items={items} />
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
