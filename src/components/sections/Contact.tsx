'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { MeshGradient } from '@paper-design/shaders-react'
import { useLanguage } from '@/context/LanguageContext'

const HERO_COLORS = ['#14060D', '#2A0D18', '#4A1628', '#6E1F35', '#A3364A', '#D97A5F']

type FormState = 'idle' | 'sending' | 'success' | 'error'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const TRUST = {
  de: [
    'Kostenlos & unverbindlich',
    'Antwort innerhalb von 24 Stunden',
    'Direkt mit uns — kein Sales-Team',
  ],
  en: [
    'Free & no obligation',
    'Response within 24 hours',
    'Directly with us — no sales team',
  ],
}

export default function Contact() {
  const { tr, lang } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const c = tr.contact
  const f = c.form

  const [state, setState] = useState<FormState>('idle')
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '' })
  const update = (field: keyof typeof values, value: string) =>
    setValues(v => ({ ...v, [field]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error()
      setState('success')
      setValues({ name: '', email: '', company: '', message: '' })
    } catch {
      setState('error')
    }
  }

  const trust = TRUST[lang]
  const isDE = lang === 'de'

  const focusField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--color-ink)'
  }
  const blurField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--color-border)'
  }

  return (
    <section
      id="kontakt"
      ref={ref}
      className="relative overflow-hidden"
    >
      {/* ── Mesh gradient — exact same as Hero ── */}
      <MeshGradient
        colors={HERO_COLORS}
        speed={0.14}
        distortion={0.48}
        swirl={0.22}
        offsetX={0.04}
        grainMixer={0}
        grainOverlay={0}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* ── Grain texture ── */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.032 }}
      >
        <filter id="contact-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#contact-grain)" />
      </svg>

      {/* ── Vignette ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 78% 88% at 50% 44%, transparent 22%, rgba(8,2,5,0.72) 100%)',
        }}
      />

      {/* ── Radial glow ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 52% 50% at 50% 42%, rgba(110,31,53,0.22) 0%, transparent 68%)',
        }}
      />

      <div className="container-main relative z-20">

        {/* ══════════════════════════════════════
            INTRO BLOCK — full width
        ══════════════════════════════════════ */}
        <div className="pt-12 md:pt-20 pb-10 md:pb-14 text-center">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="block w-6 h-px shrink-0" style={{ backgroundColor: 'rgba(255,246,242,0.14)' }} />
            <span style={{ color: 'rgba(255,246,242,0.55)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              {c.eyebrow}
            </span>
            <span className="block w-6 h-px shrink-0" style={{ backgroundColor: 'rgba(255,246,242,0.14)' }} />
          </motion.div>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.95, ease }}
            className="mx-auto"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              color: '#FFF6F2',
            }}
          >
            {isDE ? (
              <>
                <span className="block">Dein Projekt.</span>
                <span
                  className="block italic"
                  style={{ color: 'rgba(255,246,242,0.42)', fontWeight: 400, fontSize: '0.88em' }}
                >
                  Unser Anspruch.
                </span>
              </>
            ) : (
              <>
                <span className="block">Your project.</span>
                <span
                  className="block italic"
                  style={{ color: 'rgba(255,246,242,0.42)', fontWeight: 400, fontSize: '0.88em' }}
                >
                  Our commitment.
                </span>
              </>
            )}
          </motion.h2>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.32, duration: 0.8, ease }}
            className="mx-auto mt-5"
            style={{
              color: 'rgba(255,246,242,0.52)',
              fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
              lineHeight: 1.65,
              maxWidth: '46ch',
            }}
          >
            {isDE
              ? 'Jedes gute Projekt beginnt mit einem Gespräch. Erzähl uns von deiner Idee — wir freuen uns wirklich darauf.'
              : 'Every great project starts with a conversation. Tell us about your idea — we genuinely look forward to it.'}
          </motion.p>
        </div>

        {/* ══════════════════════════════════════
            2-COL GRID
        ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 pb-14 md:pb-20 items-start">

          {/* ── LEFT: Brand / CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9, ease }}
            className="relative"
          >
            {/* Decorative large "30'" behind content */}
            <div
              aria-hidden="true"
              className="absolute -top-6 -left-3 select-none pointer-events-none"
              style={{
                fontSize: 'clamp(5rem, 10vw, 9rem)',
                fontWeight: 700,
                lineHeight: 1,
                color: 'rgba(255,255,255,0.022)',
                letterSpacing: '-0.04em',
                fontStyle: 'italic',
              }}
            >
              30&prime;
            </div>

            <div className="relative z-10 pt-2">

              {/* Badge with pulsing dot */}
              <div
                className="inline-flex items-center gap-2.5 mb-9"
                style={{
                  border: '1px solid rgba(122,46,58,0.38)',
                  borderRadius: '999px',
                  padding: '5px 14px 5px 10px',
                }}
              >
                <span
                  className="shrink-0"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                    display: 'block',
                    boxShadow: '0 0 10px rgba(122,46,58,0.9)',
                  }}
                />
                <span style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  color: 'rgba(122,46,58,0.9)',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}>
                  {isDE ? 'Kostenloses Erstgespräch' : 'Free Initial Consultation'}
                </span>
              </div>

              {/* Sub-headline */}
              <div className="mb-7">
                <h3
                  style={{
                    color: '#FFF6F2',
                    fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)',
                    fontWeight: 600,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                  }}
                >
                  <span className="block">
                    {isDE ? '30 Minuten.' : '30 minutes.'}
                  </span>
                  <span
                    className="block italic"
                    style={{ color: 'rgba(255,246,242,0.4)', fontWeight: 400 }}
                  >
                    {isDE ? 'Ein ehrliches Gespräch.' : 'An honest conversation.'}
                  </span>
                </h3>
              </div>

              {/* Body */}
              <p
                className="mb-10 leading-relaxed"
                style={{
                  color: 'rgba(255,246,242,0.4)',
                  fontSize: '0.9375rem',
                  maxWidth: '36ch',
                }}
              >
                {isDE
                  ? 'Wir schauen gemeinsam, wo dein Business steht und was eine gute Website für dich leisten kann. Kein Pitch — danach weißt du genau, was der nächste Schritt ist.'
                  : 'We look together at where your business stands and what a great website can do for you. No pitch — afterwards you\'ll know exactly what the next step is.'}
              </p>

              {/* CTA button */}
              <motion.a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full mb-14"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#0D0D0B',
                  padding: '14px 28px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'background-color 300ms, color 300ms, transform 200ms',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.backgroundColor = 'var(--color-accent)'
                  el.style.color = '#FFFFFF'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.backgroundColor = '#FFFFFF'
                  el.style.color = '#0D0D0B'
                }}
              >
                {c.booking.cta}
                <span style={{ opacity: 0.55, fontSize: '0.9em' }}>↗</span>
              </motion.a>

              {/* Trust signals */}
              <ul className="flex flex-col gap-4">
                {trust.map((text, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.55 + i * 0.1, duration: 0.55, ease }}
                    className="flex items-center gap-3.5"
                  >
                    <span
                      className="shrink-0 flex items-center justify-center"
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: '1px solid rgba(122,46,58,0.4)',
                        fontSize: '0.55rem',
                        color: 'var(--color-accent)',
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ color: 'rgba(255,246,242,0.52)', fontSize: '0.875rem' }}>
                      {text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ── RIGHT: Form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.9, ease }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 24px 80px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.15)',
              }}
            >
              {state === 'success' ? (
                <div className="flex flex-col items-center justify-center py-20 px-10 text-center gap-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(122,46,58,0.08)' }}
                  >
                    <span style={{ color: 'var(--color-accent)', fontSize: '1.4rem' }}>✓</span>
                  </div>
                  <p
                    className="text-ink font-medium"
                    style={{ fontSize: '1rem', maxWidth: '28ch', lineHeight: 1.6 }}
                  >
                    {f.success}
                  </p>
                </div>
              ) : (
                <>
                  {/* Form header strip */}
                  <div
                    className="px-8 md:px-10 pt-8 pb-7"
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                  >
                    <p
                      className="text-ink"
                      style={{ fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 3 }}
                    >
                      {isDE ? 'Oder schreib uns direkt' : 'Or write to us directly'}
                    </p>
                    <p style={{ color: 'var(--color-muted)', fontSize: '0.8125rem', lineHeight: 1.5 }}>
                      {isDE
                        ? 'Kurz beschreiben reicht — wir antworten persönlich.'
                        : 'A brief description is enough — we\'ll reply personally.'}
                    </p>
                  </div>

                  {/* Form body */}
                  <form
                    onSubmit={handleSubmit}
                    className="px-8 md:px-10 py-8 flex flex-col gap-5"
                  >

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block mb-2"
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 500,
                            color: 'var(--color-ink)',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {isDE ? 'Dein Name' : 'Your name'}
                        </label>
                        <input
                          type="text"
                          required
                          value={values.name}
                          onChange={e => update('name', e.target.value)}
                          placeholder={isDE ? 'Vorname Nachname' : 'First Last'}
                          className="w-full rounded-lg focus:outline-none transition-colors duration-200"
                          style={{
                            padding: '11px 14px',
                            backgroundColor: 'var(--color-bg)',
                            border: '1.5px solid var(--color-border)',
                            color: 'var(--color-ink)',
                            fontSize: '0.875rem',
                            fontFamily: 'inherit',
                          }}
                          onFocus={focusField}
                          onBlur={blurField}
                        />
                      </div>
                      <div>
                        <label
                          className="block mb-2"
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 500,
                            color: 'var(--color-ink)',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {isDE ? 'Deine E-Mail' : 'Your email'}
                        </label>
                        <input
                          type="email"
                          required
                          value={values.email}
                          onChange={e => update('email', e.target.value)}
                          placeholder={isDE ? 'hallo@unternehmen.de' : 'hello@company.com'}
                          className="w-full rounded-lg focus:outline-none transition-colors duration-200"
                          style={{
                            padding: '11px 14px',
                            backgroundColor: 'var(--color-bg)',
                            border: '1.5px solid var(--color-border)',
                            color: 'var(--color-ink)',
                            fontSize: '0.875rem',
                            fontFamily: 'inherit',
                          }}
                          onFocus={focusField}
                          onBlur={blurField}
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 500,
                          color: 'var(--color-ink)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {isDE ? 'Unternehmen' : 'Company'}{' '}
                        <span style={{ textTransform: 'none', fontWeight: 400, color: 'var(--color-muted)' }}>
                          ({isDE ? 'optional' : 'optional'})
                        </span>
                      </label>
                      <input
                        type="text"
                        value={values.company}
                        onChange={e => update('company', e.target.value)}
                        placeholder={isDE ? 'Dein Unternehmen' : 'Your company'}
                        className="w-full rounded-lg focus:outline-none transition-colors duration-200"
                        style={{
                          padding: '11px 14px',
                          backgroundColor: 'var(--color-bg)',
                          border: '1.5px solid var(--color-border)',
                          color: 'var(--color-ink)',
                          fontSize: '0.875rem',
                          fontFamily: 'inherit',
                        }}
                        onFocus={focusField}
                        onBlur={blurField}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 500,
                          color: 'var(--color-ink)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {isDE ? 'Worum geht es?' : 'What can we help with?'}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={values.message}
                        onChange={e => update('message', e.target.value)}
                        placeholder={isDE
                          ? 'Was planst du, was brauchst du, wo stehst du gerade?'
                          : 'What are you planning, what do you need, where are you at?'}
                        className="w-full rounded-lg focus:outline-none resize-none transition-colors duration-200"
                        style={{
                          padding: '11px 14px',
                          backgroundColor: 'var(--color-bg)',
                          border: '1.5px solid var(--color-border)',
                          color: 'var(--color-ink)',
                          fontSize: '0.875rem',
                          fontFamily: 'inherit',
                          lineHeight: 1.6,
                        }}
                        onFocus={focusField}
                        onBlur={blurField}
                      />
                    </div>

                    {state === 'error' && (
                      <p style={{ color: '#e87070', fontSize: '0.8125rem' }}>{f.error}</p>
                    )}

                    {/* Submit row */}
                    <div className="flex items-center justify-between gap-4 pt-1">
                      <button
                        type="submit"
                        disabled={state === 'sending'}
                        className="rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: '#1C2B42',
                          color: '#FFFFFF',
                          padding: '13px 26px',
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          fontFamily: 'inherit',
                          transition: 'background-color 300ms',
                        }}
                        onMouseEnter={e => {
                          if (state !== 'sending')
                            e.currentTarget.style.backgroundColor = 'var(--color-accent)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = '#1C2B42'
                        }}
                      >
                        {state === 'sending' ? f.sending : f.submit}
                      </button>
                      <span style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>
                        {isDE ? '↩ Antwort in 24 Std.' : '↩ Reply within 24h'}
                      </span>
                    </div>

                  </form>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
