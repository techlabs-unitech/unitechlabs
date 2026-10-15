import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// ── SMTP transport ──
// Configure these in your environment (.env.local / hosting provider):
//   SMTP_HOST      e.g. smtp.zoho.in, smtp.office365.com, smtp.gmail.com
//   SMTP_PORT      465 (SSL) or 587 (STARTTLS)
//   SMTP_SECURE    "true" for port 465, "false" for 587
//   SMTP_USER      mailbox username (usually the full email address)
//   SMTP_PASS      mailbox password / app password
//   CONTACT_TO     inbox that receives enquiries (defaults to contact@unitechlabs.io)
//   CONTACT_FROM   "From" address enquiries are sent from (defaults to SMTP_USER)
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

const CONTACT_TO   = process.env.CONTACT_TO ?? 'contact@unitechlabs.io'
const CONTACT_FROM = process.env.CONTACT_FROM ?? process.env.SMTP_USER ?? CONTACT_TO

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    const transporter = getTransporter()

    // 1) Notify UnitechLabs of the new enquiry
    await transporter.sendMail({
      from: `"UnitechLabs Website" <${CONTACT_FROM}>`,
      to: CONTACT_TO,
      replyTo: email,
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
    })

    // 2) Auto-reply confirmation back to the person who submitted the form
    await transporter.sendMail({
      from: `"UnitechLabs" <${CONTACT_FROM}>`,
      to: email,
      replyTo: CONTACT_TO,
      subject: `We've received your message — UnitechLabs`,
      html: `
        <table style="font-family:sans-serif;max-width:600px;margin:0 auto;border-collapse:collapse;">
          <tr><td style="padding:32px 24px 16px;background:#C9A96E;">
            <h2 style="margin:0;color:#fff;font-size:20px;">Thanks for reaching out, ${name}!</h2>
          </td></tr>
          <tr><td style="padding:24px;background:#fff;border:1px solid #eee;">
            <p style="margin:0 0 12px;">We've received your enquiry and one of our team members will get back to you within one business day.</p>
            <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
            <p style="margin:0 0 8px;"><strong>Your message:</strong></p>
            <p style="margin:0 0 12px;"><strong>Subject:</strong> ${subject}</p>
            <p style="white-space:pre-wrap;margin:0;color:#555;">${message}</p>
          </td></tr>
          <tr><td style="padding:16px 24px;background:#f9f9f9;font-size:12px;color:#999;border:1px solid #eee;border-top:none;">
            UnitechLabs · contact@unitechlabs.io · +91 9591066613
          </td></tr>
        </table>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
