import sgMail from '@sendgrid/mail'

// Set the API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@aurarev.com'

export async function sendWelcomeEmail(to: string, name: string) {
  const msg = {
    to,
    from: FROM_EMAIL,
    subject: 'Welcome to AuraRev! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1f2937; text-align: center;">Welcome to AuraRev! 🎉</h1>
        <p>Hi ${name},</p>
        <p>Thank you for joining AuraRev! We're excited to help you manage and monetize your reviews.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
            Get Started
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          Best regards,<br>
          The AuraRev Team
        </p>
      </div>
    `
  }

  try {
    await sgMail.send(msg)
    console.log('Welcome email sent to:', to)
  } catch (error) {
    console.error('Error sending welcome email:', error)
    throw error
  }
}