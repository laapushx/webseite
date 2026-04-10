'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { tr } = useLanguage()
  const f = tr.footer

  return (
    <footer className="bg-ink text-surface">
      <div className="container-main">
        {/* Top */}
        <div className="py-14 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 border-b border-surface/10">
          {/* Brand */}
          <div>
            <a href="#" className="font-serif text-2xl tracking-widest text-surface hover:text-accent transition-colors">
              SUNXBÜ
            </a>
            <p className="mt-3 text-sm text-surface/50 leading-relaxed">{f.tagline}</p>
            <p className="mt-2 text-xs text-surface/30 label-sm">{f.location}</p>
          </div>

          {/* Nav links */}
          <div>
            <p className="label-sm text-surface/40 mb-4">Navigation</p>
            <ul className="flex flex-col gap-2">
              {f.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-surface/60 hover:text-surface transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="label-sm text-surface/40 mb-4">Kontakt</p>
            <a
              href="#kontakt"
              className="label-sm inline-flex items-center gap-2 border border-surface/20 text-surface/80 px-5 py-2.5 rounded-full hover:border-accent hover:text-accent transition-all duration-200"
            >
              Projekt anfragen ↗
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface/30">{f.copyright}</p>
          <div className="flex items-center gap-5">
            {f.legal.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-surface/30 hover:text-surface/60 transition-colors"
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
