'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

type FormState = 'idle' | 'sending' | 'success' | 'error'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Contact() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const c = tr.contact
  const f = c.form

  const [state, setState] = useState<FormState>('idle')
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  })

  const update = (field: keyof typeof values, value: string) =>
    setValues((v) => ({ ...v, [field]: value }))

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
      setValues({ name: '', email: '', company: '', projectType: '', message: '' })
    } catch {
      setState('error')
    }
  }

  const inputClass =
    'w-full bg-transparent border-b text-white placeholder-text-white py-3.5 focus:outline-none transition-colors duration-200'

  return (
    <section
      id="kontakt"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#0D0D0B' }}
    >
      {/* Grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.035,
          animation: 'grain 10s steps(10) infinite',
        }}
      />

      {/* Atmospheric orb */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[60vw] h-[60vw] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 80%, rgba(197,168,130,0.07) 0%, transparent 65%)',
        }}
      />

      {/* ── Top edge ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
      />

      <div ref={ref} className="container-main relative z-10">
        {/* ── Final CTA hero block ── */}
        <div className="pt-24 md:pt-40 pb-16 md:pb-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-end">
            {/* Left: headline */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="label-sm mb-5"
                style={{ color: 'rgba(197,168,130,0.65)', letterSpacing: '0.18em' }}
              >
                {c.eyebrow}
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12, duration: 0.9, ease }}
                className="heading-xl text-white mb-6"
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)', lineHeight: 1.06 }}
              >
                {c.headline.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? (
                      <span className="italic" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </motion.h2>
            </div>

            {/* Right: subline + booking */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="text-base md:text-lg leading-relaxed mb-8 max-w-md"
                style={{ color: 'rgba(255,255,255,0.38)' }}
              >
                {c.subline}
              </motion.p>

              {/* Booking card */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.38, duration: 0.7 }}
                className="p-6 border rounded-2xl"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <p
                  className="label-sm mb-3"
                  style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em' }}
                >
                  {c.booking.label}
                </p>
                <a
                  href="https://cal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-sm inline-flex items-center gap-2 text-white transition-colors duration-200 hover:text-accent"
                  style={{ letterSpacing: '0.14em' }}
                >
                  {c.booking.cta} ↗
                </a>
                <p
                  className="mt-3 text-xs"
                  style={{ color: 'rgba(255,255,255,0.22)' }}
                >
                  {c.booking.note}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Contact form ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease }}
          className="py-16 md:py-20"
        >
          {state === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start py-8"
            >
              <div
                className="w-12 h-12 border rounded flex items-center justify-center mb-6"
                style={{ borderColor: '#C5A882' }}
              >
                <span style={{ color: '#C5A882', fontSize: '1.2rem' }}>✓</span>
              </div>
              <p className="font-serif text-2xl md:text-3xl text-white mb-2">{f.success}</p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
            >
              {/* Name */}
              <div>
                <label
                  className="label-sm block mb-3"
                  style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em' }}
                >
                  {f.name}
                </label>
                <input
                  type="text"
                  required
                  value={values.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Vorname Nachname"
                  className={inputClass}
                  style={{
                    borderColor: 'rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '0.95rem',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(197,168,130,0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="label-sm block mb-3"
                  style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em' }}
                >
                  {f.email}
                </label>
                <input
                  type="email"
                  required
                  value={values.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="name@unternehmen.de"
                  className={inputClass}
                  style={{
                    borderColor: 'rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '0.95rem',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(197,168,130,0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>

              {/* Company */}
              <div>
                <label
                  className="label-sm block mb-3"
                  style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em' }}
                >
                  {f.company}
                </label>
                <input
                  type="text"
                  value={values.company}
                  onChange={(e) => update('company', e.target.value)}
                  placeholder="Ihr Unternehmen"
                  className={inputClass}
                  style={{
                    borderColor: 'rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '0.95rem',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(197,168,130,0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>

              {/* Project type */}
              <div>
                <label
                  className="label-sm block mb-3"
                  style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em' }}
                >
                  {f.project_type}
                </label>
                <select
                  required
                  value={values.projectType}
                  onChange={(e) => update('projectType', e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                  style={{
                    borderColor: 'rgba(255,255,255,0.12)',
                    color: values.projectType ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)',
                    fontSize: '0.95rem',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(197,168,130,0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                >
                  <option value="" disabled style={{ color: '#1A1A18' }}>
                    {f.project_placeholder}
                  </option>
                  {f.project_options.map((opt) => (
                    <option key={opt} value={opt} style={{ color: '#1A1A18' }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message — full width */}
              <div className="md:col-span-2">
                <label
                  className="label-sm block mb-3"
                  style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em' }}
                >
                  {f.message}
                </label>
                <textarea
                  required
                  rows={3}
                  value={values.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="z. B. Ich brauche eine neue Website für mein Beratungsunternehmen…"
                  className={`${inputClass} resize-none`}
                  style={{
                    borderColor: 'rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '0.95rem',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(197,168,130,0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>

              {/* Error */}
              {state === 'error' && (
                <p className="md:col-span-2 text-sm" style={{ color: '#e87070' }}>
                  {f.error}
                </p>
              )}

              {/* Submit */}
              <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="label-sm px-8 py-4 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#C5A882',
                    color: '#0D0D0B',
                    letterSpacing: '0.14em',
                  }}
                  onMouseEnter={(e) => {
                    if (state !== 'sending') e.currentTarget.style.backgroundColor = '#FFFFFF'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#C5A882'
                  }}
                >
                  {state === 'sending' ? f.sending : f.submit}
                </button>
                <span
                  className="text-xs"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                >
                  Antwort innerhalb von 24 Stunden
                </span>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* Bottom spacer / footer merge */}
      <div
        className="h-px"
        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
      />
    </section>
  )
}
