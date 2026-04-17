'use client'

import { useLanguage } from '@/context/LanguageContext'

const INSTAGRAM_URL = 'https://www.instagram.com/sunxbu' // ← echte URL hier eintragen

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Footer() {
  const { tr } = useLanguage()
  const f = tr.footer

  return (
    <footer className="bg-ink">
      <div className="container-main">

        {/* ── Top row: Brand ↔ CTA ── */}
        <div
          className="flex items-center justify-between"
          style={{ padding: '48px 0 40px' }}
        >
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ color: '#FFF6F2', fontSize: '1rem', fontWeight: 500, letterSpacing: '0.16em' }}>
              SUNXBÜ
            </span>
            <span style={{ color: 'rgba(255,246,242,0.82)', fontSize: '0.8125rem', letterSpacing: '0.01em' }}>
              {f.tagline}
            </span>
            <span style={{ color: 'rgba(255,246,242,0.82)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              {f.location}
            </span>
          </div>

          {/* Right */}
          <a
            href="#kontakt"
            style={{
              border: '1px solid rgba(255,246,242,0.35)',
              color: 'rgba(255,246,242,0.82)',
              padding: '10px 22px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              transition: 'all 280ms',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,246,242,0.38)'
              e.currentTarget.style.color = '#FFF6F2'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,246,242,0.35)'
              e.currentTarget.style.color = 'rgba(255,246,242,0.82)'
            }}
          >
            Projekt anfragen ↗
          </a>
        </div>

        {/* ── Bottom row ── */}
        <div
          className="flex items-center justify-between"
          style={{
            borderTop: '1px solid rgba(255,246,242,0.07)',
            padding: '18px 0',
          }}
        >
          {/* Left: Instagram + Made with love */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: 'rgba(255,246,242,0.82)', transition: 'color 200ms', display: 'flex' }}
              onMouseEnter={e => e.currentTarget.style.color = '#FFF6F2'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,246,242,0.82)'}
            >
              <InstagramIcon />
            </a>
            <span style={{ fontSize: '11px', color: 'rgba(255,246,242,0.82)', letterSpacing: '0.03em' }}>
              Made with love in Stuttgart · 2026
            </span>
          </div>

          {/* Right: Legal links */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {f.legal.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{ fontSize: '11px', color: 'rgba(255,246,242,0.82)', letterSpacing: '0.03em', transition: 'color 200ms' }}
                onMouseEnter={e => e.currentTarget.style.color = '#FFF6F2'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,246,242,0.82)'}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
