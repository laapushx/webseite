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

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]


function ProjectPanel({
  project,
  view_case,
  onOpen,
  index,
}: {
  project: Project
  view_case: string
  onOpen: (p: Project) => void
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease }}
      className="group relative grid grid-cols-1 md:grid-cols-2 border-b border-border cursor-pointer overflow-hidden"
      style={{ minHeight: '480px' }}
      onClick={() => onOpen(project)}
    >
      {/* Image panel */}
      <div
        className={`relative overflow-hidden ${isEven ? 'md:order-2' : 'md:order-1'}`}
        style={{ minHeight: '340px' }}
      >
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{
            background: isEven
              ? 'linear-gradient(135deg, #1F2937 0%, #252520 60%, #1F2937 100%)'
              : 'linear-gradient(135deg, #1E1E1C 0%, #2A2A24 60%, #1F2937 100%)',
          }}
        />

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-sans leading-none"
            style={{
              fontSize: 'clamp(8rem, 18vw, 18rem)',
              color: 'rgba(255,255,255,0.028)',
              letterSpacing: '-0.04em',
            }}
          >
            {project.number}
          </span>
        </div>

        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className={`absolute top-0 bottom-0 w-px origin-top ${isEven ? 'left-0' : 'right-0'}`}
          style={{ backgroundColor: 'rgba(122,46,58,0.25)' }}
        />

        <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
          <span className="label-sm" style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.14em' }}>
            {project.category}
          </span>
          <span className="label-sm" style={{ color: 'rgba(255,255,255,0.18)', letterSpacing: '0.12em' }}>
            {project.year}
          </span>
        </div>

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: 'rgba(122,46,58,0.04)' }}
        />
      </div>

      {/* Content panel */}
      <div
        className={`relative flex flex-col justify-between p-9 md:p-12 lg:p-16 bg-surface ${
          isEven ? 'md:order-1' : 'md:order-2'
        }`}
      >
        <div>
          <motion.span
            initial={{ opacity: 0, x: isEven ? -16 : 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="label-sm text-accent block mb-5"
          >
            {project.number}
          </motion.span>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="h3 text-ink mb-4 transition-colors duration-300 group-hover:text-accent"
          >
            {project.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38, ease }}
            className="text-muted text-sm md:text-base leading-relaxed mb-8 max-w-sm"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.48, ease }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="label-sm border rounded px-3 py-1.5 text-muted border-border"
                style={{ fontSize: '0.65rem' }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease }}
          className="group/btn self-start flex items-center gap-3 label-sm text-ink transition-colors duration-200 hover:text-accent"
        >
          <span>{view_case}</span>
          <span
            className="w-7 h-7 border border-current rounded-full flex items-center justify-center transition-all duration-200 group-hover/btn:bg-accent group-hover/btn:border-accent group-hover/btn:text-ink"
            style={{ fontSize: '0.8rem' }}
          >
            ↗
          </span>
        </motion.button>
      </div>
    </motion.article>
  )
}

export default function Work() {
  const { tr } = useLanguage()
  const w = tr.work
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <section id="projekte" className="bg-surface">

        {/* ── Project panels ── */}
        <div className="border-t border-border">
          {w.projects.map((project, i) => (
            <ProjectPanel
              key={project.id}
              project={project}
              view_case={w.view_case}
              onOpen={setSelectedProject}
              index={i}
            />
          ))}
        </div>

      </section>

      <CaseStudyOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        closeLabel={w.close}
        deliverablesLabel={w.deliverables_label}
      />
    </>
  )
}
