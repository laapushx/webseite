import { NextRequest, NextResponse } from 'next/server'

interface ContactPayload {
  name: string
  email: string
  company?: string
  projectType: string
  message: string
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json()

    const { name, email, company, projectType, message } = body

    if (!name || !email || !projectType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // --- Email integration ---
    // Recommended: Resend (https://resend.com) — works seamlessly with Next.js + Vercel
    //
    // 1. npm install resend
    // 2. Add RESEND_API_KEY to your .env.local
    // 3. Replace this block:
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'SUNXBÜ Website <noreply@yourdomain.com>',
    //   to: ['aysun@sunxbu.com', 'busra@sunxbu.com'],
    //   subject: `Neue Anfrage von ${name}`,
    //   html: `
    //     <h2>Neue Anfrage über sunxbu.com</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>E-Mail:</strong> ${email}</p>
    //     <p><strong>Unternehmen:</strong> ${company || '–'}</p>
    //     <p><strong>Paket:</strong> ${projectType}</p>
    //     <p><strong>Nachricht:</strong> ${message}</p>
    //   `,
    // })

    // Temporary: log to console (replace with email integration above)
    console.log('[Contact Form]', { name, email, company, projectType, message })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[Contact API]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
