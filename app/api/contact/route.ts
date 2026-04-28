import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    // ── Option A: Formspree (easiest, free tier available) ──
    // 1. Sign up at formspree.io
    // 2. Create a form, get your endpoint ID
    // 3. Replace YOUR_FORM_ID below
    const res = await fetch('https://formspree.io/f/xdawvlwq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, _replyto: email, subject, message, phone }),
    })
    if (!res.ok) throw new Error('Formspree error')

    // ── Option B: Resend (transactional email, generous free tier) ──
    // 1. Sign up at resend.com, get API key
    // 2. npm install resend
    // 3. Uncomment and fill in:
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'contact@unitechlabs.io',
    //   to: 'info@unitechlabs.io',
    //   subject: `[Contact Form] ${subject}`,
    //   html: `<p><b>From:</b> ${name} &lt;${email}&gt;</p><p><b>Phone:</b> ${phone || 'N/A'}</p><p><b>Subject:</b> ${subject}</p><p><b>Message:</b><br/>${message}</p>`,
    // })

    // ── Current: log to console (replace with Option A or B above) ──
    console.log('Contact form submission:', { name, email, phone, subject, message })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
