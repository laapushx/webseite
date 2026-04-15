'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LogoItem {
  id: string
  element: React.ReactNode
}

interface TrustedBySectionProps {
  logos?: LogoItem[]
  label?: string
}

// ── Wordmark helper for placeholder logos ─────────────────────────────────────

function WordMark({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="flex items-center gap-3 select-none" style={{ fontFamily: 'var(--font-sans)' }}>
      <span className="[&>svg]:w-6 [&>svg]:h-6">{icon}</span>
      <span style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '0.18em', whiteSpace: 'nowrap' }}>
        {name}
      </span>
    </div>
  )
}

// ── Client logos ──────────────────────────────────────────────────────────────

const DEFAULT_LOGOS: LogoItem[] = [
  {
    id: 'sunxca',
    element: (
      <Image
        src="/logos/sunxca.png"
        alt="SUNXCA Marketing"
        width={500}
        height={500}
        style={{
          height: '60px',
          width: 'auto',
          objectFit: 'contain',
        }}
      />
    ),
  },
  {
    id: 'ab-gebaeudereinigung',
    element: (
      <Image
        src="/logos/ab-gebaeudereinigung.png"
        alt="AB Gebäudereinigung"
        width={1420}
        height={1133}
        style={{
          height: '48px',
          width: 'auto',
          filter: 'brightness(0) invert(1)',
          objectFit: 'contain',
        }}
      />
    ),
  },
  {
    id: 'recruimaster',
    element: (
      <Image
        src="/logos/recruimaster.png"
        alt="RecruiMaster"
        width={972}
        height={919}
        style={{
          height: '56px',
          width: 'auto',
          filter: 'brightness(0) invert(1)',
          objectFit: 'contain',
        }}
      />
    ),
  },
  {
    id: 'vantara',
    element: (
      <WordMark name="VANTARA" icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L22 20H2L12 2Z" />
          <line x1="7" y1="14" x2="17" y2="14" />
        </svg>
      } />
    ),
  },
  {
    id: 'mariam',
    element: (
      <Image
        src="/logos/mariam.png"
        alt="mariam."
        width={1080}
        height={1080}
        style={{
          height: '56px',
          width: 'auto',
          filter: 'brightness(2)',
          objectFit: 'contain',
        }}
      />
    ),
  },
  {
    id: 'codehermoney',
    element: (
      <Image
        src="/logos/codehermoney.png"
        alt="codeHerMoney"
        width={800}
        height={800}
        style={{
          height: '76px',
          width: 'auto',
          filter: 'brightness(0) invert(1)',
          objectFit: 'contain',
        }}
      />
    ),
  },
]

// ── Logo mark — no card, just floating brand mark ─────────────────────────────

function LogoMark({ logo }: { logo: LogoItem }) {
  return (
    <motion.div
      whileHover={{ opacity: 0.75 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0 flex items-center justify-center cursor-default h-14 md:h-16 px-10 md:px-14"
      style={{ opacity: 0.42, color: '#EEE2D8' }}
    >
      {logo.element}
    </motion.div>
  )
}

// ── Single scroll track ───────────────────────────────────────────────────────

function ScrollTrack({ logos, duration }: { logos: LogoItem[]; duration: number }) {
  const doubled = [...logos, ...logos, ...logos, ...logos]
  return (
    <div className="flex overflow-hidden">
      <div
        className="flex items-center"
        style={{
          animation: `trusted-scroll ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((logo, i) => (
          <LogoMark key={`${logo.id}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TrustedBy({
  logos = DEFAULT_LOGOS,
}: TrustedBySectionProps) {
  return (
    <section
      className="relative overflow-hidden py-4 md:py-5"
      style={{
        background: 'linear-gradient(180deg, #150710 0%, #110610 60%, #0D050D 100%)',
      }}
    >
      <style>{`
        @keyframes trusted-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
      `}</style>

      {/* Logo strip with edge fade */}
      {/* Outer: mask fade — no overflow clip */}
      <div
        className="max-w-7xl mx-auto"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
        }}
      >
        {/* Inner: clips the scrolling track */}
        <div className="overflow-hidden">
          <ScrollTrack logos={logos} duration={60} />
        </div>
      </div>
    </section>
  )
}
