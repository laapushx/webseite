'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
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

const GRADIENTS = [
  'linear-gradient(135deg, #1F2937 0%, #252520 60%, #1F2937 100%)',
  'linear-gradient(135deg, #1E1E1C 0%, #2A2A24 60%, #1F2937 100%)',
  'linear-gradient(135deg, #252520 0%, #1F2937 50%, #1E2030 100%)',
  'linear-gradient(135deg, #1A1F2E 0%, #252520 60%, #1F2937 100%)',
]

const PROJECT_IMAGES: Record<string, string> = {
  '01': '/images/project-sunxca.png',
  '02': '/images/project-recruimaster.png',
  '03': '/images/project-moku.png',
  '04': '/images/project-scaling-collective.png',
  '05': '/images/project-abgebaeudereinigung.png',
  '06': '/images/project-codehermoney.png',
  '07': '/images/project-mariam.png',
}

// 280vh container → unstick at 180/280 = 0.643 → all animations end at 0.55 ✓
function ZoomIntro({ projects, eyebrow, headline }: {
  projects: Project[]
  eyebrow: string
  headline: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end start'],
  })

  const headlineScale   = useTransform(scrollYProgress, [0, 0.50], [1, 0.15])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.28, 0.44], [1, 1, 0])
  const mosaicOpacity   = useTransform(scrollYProgress, [0.42, 0.56], [0, 1])
  const mosaicScale     = useTransform(scrollYProgress, [0.42, 0.60], [1.12, 1])
  const scrollHint      = useTransform(scrollYProgress, [0, 0.10], [1, 0])

  const lines = headline.split('\n')

  return (
    <div ref={scrollRef} style={{ height: '280vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: 'var(--color-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Headline */}
        <motion.div
          style={{ scale: headlineScale, opacity: headlineOpacity, textAlign: 'center', position: 'relative', zIndex: 1 }}
        >
          <p className="label-sm text-accent mb-5" style={{ letterSpacing: '0.18em' }}>
            {eyebrow}
          </p>
          <h2
            className="text-ink"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.03em' }}
          >
            {lines.map((line, i) => (
              <span key={i} className="block">
                {i === 1
                  ? <span className="italic" style={{ color: 'var(--color-muted)' }}>{line}</span>
                  : line}
              </span>
            ))}
          </h2>
        </motion.div>

        {/* Project mosaic */}
        <motion.div
          style={{
            opacity: mosaicOpacity,
            scale: mosaicScale,
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            pointerEvents: 'none',
          }}
        >
        <div style={{
            width: '100%',
            maxWidth: '100%',
            aspectRatio: '16/9',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '6px',
            borderRadius: '16px',
            overflow: 'hidden',
        }}>
          {projects.slice(0, 6).map((project, i) => {
            const img = PROJECT_IMAGES[project.number]
            return (
              <div
                key={project.id}
                style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', background: '#F5F5F3' }}
              >
                {img ? (
                  <img
                    src={img}
                    alt={project.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top', background: '#F5F5F3' }}
                  />
                ) : (
                  <div
                    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', userSelect: 'none' }}
                  >
                    <span style={{ fontSize: 'clamp(6rem, 14vw, 14rem)', color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.04em', lineHeight: 1, fontWeight: 700 }}>
                      {project.number}
                    </span>
                  </div>
                )}
                <div
                  style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px', background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
                >
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(0.75rem, 1.5vw, 1rem)', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '2px' }}>
                    {project.title}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {project.category}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: scrollHint, position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 32, backgroundColor: 'rgba(0,0,0,0.18)', borderRadius: 1 }}
          />
        </motion.div>
      </div>
    </div>
  )
}


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

        {/* ── Scroll-driven zoom intro ── */}
        <ZoomIntro
          projects={w.projects}
          eyebrow={w.eyebrow}
          headline={w.headline}
        />

        {/* ── Project panels ── */}
        {/* <div className="border-t border-border">
          {w.projects.map((project, i) => (
            <ProjectPanel
              key={project.id}
              project={project}
              view_case={w.view_case}
              onOpen={setSelectedProject}
              index={i}
            />
          ))}
        </div> */}

      </section>

      {/* <CaseStudyOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        closeLabel={w.close}
        deliverablesLabel={w.deliverables_label}
      /> */}
    </>
  )
}
