'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import CaseStudyOverlay from '@/components/CaseStudyOverlay'

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

function FeaturedCard({
  project,
  view_case,
  onOpen,
  inView,
}: {
  project: Project
  view_case: string
  onOpen: (p: Project) => void
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="group relative bg-surface-2 border border-border rounded-sm overflow-hidden cursor-pointer mb-5"
      onClick={() => onOpen(project)}
    >
      {/* Image placeholder */}
      <div className="w-full aspect-[16/7] bg-surface-2 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
        <div className="text-center z-10">
          <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mx-auto mb-3">
            <span className="text-muted text-2xl">◻</span>
          </div>
          <p className="label-sm text-muted">
            {project.title}
          </p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
      </div>

      {/* Info bar */}
      <div className="flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="label-sm text-muted">{project.number}</span>
          <span className="font-serif text-xl md:text-2xl text-ink">{project.title}</span>
          <span className="hidden sm:block label-sm text-muted">{project.category}</span>
        </div>
        <button className="label-sm text-muted hover:text-ink transition-colors flex items-center gap-1.5">
          {view_case} ↗
        </button>
      </div>
    </motion.div>
  )
}

function SmallCard({
  project,
  view_case,
  onOpen,
  inView,
  delay,
}: {
  project: Project
  view_case: string
  onOpen: (p: Project) => void
  inView: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="group bg-surface-2 border border-border rounded-sm overflow-hidden cursor-pointer hover:border-accent/40 transition-colors duration-300"
      onClick={() => onOpen(project)}
    >
      {/* Image placeholder */}
      <div className="w-full aspect-[4/3] bg-surface-2 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
        <div className="text-center z-10">
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mx-auto mb-2">
            <span className="text-muted">◻</span>
          </div>
          <p className="label-sm text-muted text-xs">{project.category}</p>
        </div>
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-300" />
      </div>

      {/* Info */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="label-sm text-accent block mb-1.5">{project.number}</span>
            <h3 className="font-serif text-lg md:text-xl text-ink group-hover:text-accent transition-colors duration-200">
              {project.title}
            </h3>
          </div>
          <span className="text-muted group-hover:text-ink transition-colors text-xl shrink-0 mt-1">↗</span>
        </div>
        <p className="text-muted text-xs md:text-sm leading-relaxed mt-2 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs label-sm text-muted border border-border px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Work() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const w = tr.work

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const featured = w.projects.find((p) => p.featured)
  const rest = w.projects.filter((p) => !p.featured)

  return (
    <>
      <section id="projekte" className="py-24 md:py-36 bg-surface">
        <div className="container-main">
          {/* Header */}
          <div ref={ref} className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="label-sm text-muted mb-4 italic"
              >
                {w.eyebrow}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="heading-xl text-ink"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
              >
                {w.headline.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? <span className="italic text-muted">{line}</span> : line}
                  </span>
                ))}
              </motion.h2>
            </div>
          </div>

          {/* Featured project */}
          {featured && (
            <FeaturedCard
              project={featured}
              view_case={w.view_case}
              onOpen={setSelectedProject}
              inView={inView}
            />
          )}

          {/* Smaller cards */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {rest.map((project, i) => (
                <SmallCard
                  key={project.id}
                  project={project}
                  view_case={w.view_case}
                  onOpen={setSelectedProject}
                  inView={inView}
                  delay={0.15 * (i + 1) + 0.2}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Case Study Overlay */}
      <CaseStudyOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        closeLabel={w.close}
        deliverablesLabel={w.deliverables_label}
      />
    </>
  )
}
