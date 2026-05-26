import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'UnitechLabs Website <onboarding@resend.dev>',
        to:   [process.env.CONTACT_TO ?? 'info@unitechlabs.io'],
        reply_to: email,
        subject: `[Website Enquiry] ${subject}`,
        html: `
          <table style="font-family:sans-serif;max-width:600px;margin:0 auto;border-collapse:collapse;">
            <tr><td style="padding:32px 24px 16px;background:#C9A96E;">
              <h2 style="margin:0;color:#fff;font-size:20px;">New Enquiry — UnitechLabs</h2>
            </td></tr>
            <tr><td style="padding:24px;background:#fff;border:1px solid #eee;">
              <p style="margin:0 0 12px;"><strong>Name:</strong> ${name}</p>
              <p style="margin:0 0 12px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin:0 0 12px;"><strong>Subject:</strong> ${subject}</p>
              <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
              <p style="white-space:pre-wrap;margin:0;">${message}</p>
            </td></tr>
            <tr><td style="padding:16px 24px;background:#f9f9f9;font-size:12px;color:#999;border:1px solid #eee;border-top:none;">
              Sent from unitechlabs.io contact form
            </td></tr>
          </table>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      console.error('Resend error:', err)
      return NextResponse.json({ ok: false }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
