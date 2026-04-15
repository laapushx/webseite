'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: string
  number: string
  title: string
  category: string
  year: string
  description: string
  tags: string[]
  deliverables: string[]
  featured?: boolean
}

interface CaseStudyOverlayProps {
  project: Project | null
  onClose: () => void
  closeLabel: string
  deliverablesLabel: string
}

export default function CaseStudyOverlay({
  project,
  onClose,
  closeLabel,
  deliverablesLabel,
}: CaseStudyOverlayProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-2xl bg-surface overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 label-sm text-muted hover:text-ink transition-colors flex items-center gap-2"
            >
              {closeLabel} ✕
            </button>

            <div className="p-8 md:p-14 pt-20 md:pt-20">
              {/* Project number + category */}
              <div className="flex items-center gap-3 mb-8">
                <span className="label-sm text-accent">{project.number}</span>
                <span className="w-px h-4 bg-border" />
                <span className="label-sm text-muted">{project.category}</span>
                <span className="w-px h-4 bg-border" />
                <span className="label-sm text-muted">{project.year}</span>
              </div>

              {/* Title */}
              <h2 className="heading-xl text-ink mb-6" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-muted text-base md:text-lg leading-relaxed mb-10">
                {project.description}
              </p>

              {/* Image placeholder */}
              <div className="w-full aspect-video bg-surface-2 border border-border rounded-2xl mb-10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mx-auto mb-3">
                    <span className="text-muted text-xl">◻</span>
                  </div>
                  <p className="label-sm text-muted">Projektvorschau</p>
                </div>
              </div>

              {/* Second image placeholder */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[0, 1].map((i) => (
                  <div key={i} className="aspect-square bg-surface-2 border border-border rounded-2xl flex items-center justify-center">
                    <span className="label-sm text-muted">Bild {i + 1}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {project.tags.map((tag) => (
                  <span key={tag} className="label-sm text-ink border border-border px-3 py-1.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Deliverables */}
              <div>
                <p className="label-sm text-muted mb-4">{deliverablesLabel}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-sm text-ink">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-8 border-t border-border">
                <a
                  href="#kontakt"
                  onClick={onClose}
                  className="label-sm inline-flex items-center gap-2 bg-ink text-surface px-7 py-3.5 rounded-full hover:bg-accent hover:text-ink transition-all duration-200"
                >
                  Ähnliches Projekt anfragen ↗
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
