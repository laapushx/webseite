# SUNXBÜ — Premium Webdesign

> Stuttgart × Dubai

Premium Webdesign-Website gebaut mit Next.js, TypeScript und Tailwind CSS.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animationen:** Framer Motion
- **Fonts:** Cormorant Garamond + Inter (Google Fonts via next/font)
- **Deployment:** Vercel (vorbereitet)

---

## Struktur

```
src/
├── app/
│   ├── api/contact/route.ts   # Contact form API endpoint
│   ├── globals.css            # Tailwind theme + global styles
│   ├── layout.tsx             # Root layout (fonts, metadata, SEO)
│   └── page.tsx               # Main page
├── components/
│   ├── Nav.tsx                # Sticky navigation + mobile menu
│   ├── CaseStudyOverlay.tsx   # Slide-in case study panel
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── SocialProof.tsx
│   │   ├── Services.tsx       # Premium package selection
│   │   ├── WhySunxbu.tsx
│   │   ├── Process.tsx
│   │   ├── Work.tsx           # Portfolio with case study overlay
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx        # Form + Cal.com booking
│   │   └── Footer.tsx
│   └── ui/
│       └── Button.tsx
├── context/
│   └── LanguageContext.tsx    # DE/EN language switcher
└── translations/
    └── index.ts               # All strings in DE + EN
```

---

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

---

## E-Mail Integration einrichten

Die Kontaktformular-API unter `src/app/api/contact/route.ts` ist vorbereitet. Empfehlung: **Resend** (kostenloser Tier verfügbar).

```bash
npm install resend
```

Erstelle `.env.local`:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxx
```

Dann im API-Route die kommentierten Zeilen aktivieren und E-Mail-Adressen eintragen.

---

## Terminbuchung (Cal.com)

Im `Contact.tsx` den Placeholder-Link durch deine Cal.com-URL ersetzen:

```tsx
href="https://cal.com/DEIN-USERNAME"
```

---

## Inhalte anpassen

Alle Texte, Pakete, Projekte und Referenzen befinden sich in:

```
src/translations/index.ts
```

Zwei Objekte: `de` (Deutsch) und `en` (Englisch). Einfach bearbeiten, keine Komponenten anfassen.

---

## Deployment auf Vercel

```bash
vercel
```

Oder direkt im Dashboard: [vercel.com/new](https://vercel.com/new) → Import Git Repository

---

## Platzhalter ersetzen

| Was | Wo |
|-----|-----|
| Logo | `Nav.tsx` — SUNXBÜ Text durch `<Image>` ersetzen |
| Projektbilder | `Work.tsx` + `CaseStudyOverlay.tsx` — Placeholder divs durch `<Image>` ersetzen |
| OG-Bild | `public/og-image.jpg` hinzufügen (1200×630px) |
| Cal.com URL | `Contact.tsx` — Link aktualisieren |
| E-Mail | `src/app/api/contact/route.ts` — Integration aktivieren |

---

*SUNXBÜ · Aysun Caliskan & Büsra Alili · Stuttgart × Dubai*
