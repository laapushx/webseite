'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

type FormState = 'idle' | 'sending' | 'success' | 'error'

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
    'w-full bg-transparent border-b border-border text-ink placeholder:text-muted text-sm py-3 focus:outline-none focus:border-ink transition-colors duration-200'

  return (
    <section id="kontakt" className="py-24 md:py-36 bg-bg">
      <div className="container-main">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label-sm text-muted mb-4"
            >
              {c.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="heading-xl text-ink mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {c.headline.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="italic">{line}</span> : line}
                </span>
              ))}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-muted text-base leading-relaxed mb-12"
            >
              {c.subline}
            </motion.p>

            {/* Booking option */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="border border-border rounded-sm p-6"
            >
              <p className="label-sm text-muted mb-3">{c.booking.label}</p>
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="label-sm inline-flex items-center gap-2 text-ink hover:text-accent transition-colors duration-200"
              >
                {c.booking.cta} ↗
              </a>
              <p className="mt-3 text-xs text-muted">{c.booking.note}</p>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {state === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex items-center"
              >
                <div>
                  <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center mb-6">
                    <span className="text-accent text-xl">✓</span>
                  </div>
                  <p className="font-serif text-2xl text-ink mb-3">{f.success}</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Name */}
                <div>
                  <label className="label-sm text-muted block mb-2">{f.name}</label>
                  <input
                    type="text"
                    required
                    value={values.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={inputClass}
                    placeholder="Vorname Nachname"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="label-sm text-muted block mb-2">{f.email}</label>
                  <input
                    type="email"
                    required
                    value={values.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={inputClass}
                    placeholder="name@unternehmen.de"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="label-sm text-muted block mb-2">{f.company}</label>
                  <input
                    type="text"
                    value={values.company}
                    onChange={(e) => update('company', e.target.value)}
                    className={inputClass}
                    placeholder="Ihr Unternehmen"
                  />
                </div>

                {/* Project type */}
                <div>
                  <label className="label-sm text-muted block mb-2">{f.project_type}</label>
                  <select
                    required
                    value={values.projectType}
                    onChange={(e) => update('projectType', e.target.value)}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>{f.project_placeholder}</option>
                    {f.project_options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="label-sm text-muted block mb-2">{f.message}</label>
                  <textarea
                    required
                    rows={3}
                    value={values.message}
                    onChange={(e) => update('message', e.target.value)}
                    className={`${inputClass} resize-none`}
                    placeholder="z. B. Ich brauche eine neue Website für mein Beratungsunternehmen…"
                  />
                </div>

                {/* Error */}
                {state === 'error' && (
                  <p className="text-sm text-red-600">{f.error}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="label-sm self-start bg-ink text-surface px-8 py-4 rounded-full hover:bg-accent hover:text-ink transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state === 'sending' ? f.sending : f.submit}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
