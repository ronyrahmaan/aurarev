import sgMail from '@sendgrid/mail'

// Set the API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@aurarev.com'

export interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  const msg = {
    to,
    from: FROM_EMAIL,
    subject,
    html,
  }

  try {
    await sgMail.send(msg)
    console.log('Email sent to:', to)
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

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
    return { success: true }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { success: false, error }
  }
}

export function generateVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000'}/verify-email?token=${token}`

  return {
    to: email,
    subject: 'Verify your AuraRev account',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">AuraRev</h1>
        </div>

        <h2 style="color: #374151; margin-bottom: 20px;">Verify Your Email Address</h2>

        <p style="color: #6b7280; line-height: 1.6; margin-bottom: 25px;">
          Welcome to AuraRev! Please click the button below to verify your email address and activate your account.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}"
             style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
            Verify Email Address
          </a>
        </div>

        <p style="color: #9ca3af; font-size: 14px; line-height: 1.5; margin-top: 30px;">
          If you didn't create an account with AuraRev, you can safely ignore this email.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          © ${new Date().getFullYear()} AuraRev. All rights reserved.
        </p>
      </div>
    `,
  }
}

export function generatePasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000'}/reset-password?token=${token}`

  return {
    to: email,
    subject: 'Reset your AuraRev password',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">AuraRev</h1>
        </div>

        <h2 style="color: #374151; margin-bottom: 20px;">Reset Your Password</h2>

        <p style="color: #6b7280; line-height: 1.6; margin-bottom: 25px;">
          You requested to reset your password. Click the button below to set a new password.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}"
             style="background-color: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
            Reset Password
          </a>
        </div>

        <p style="color: #dc2626; font-size: 14px; line-height: 1.5; margin-top: 20px; padding: 15px; background-color: #fef2f2; border-radius: 6px;">
          This link will expire in 1 hour for security reasons.
        </p>

        <p style="color: #9ca3af; font-size: 14px; line-height: 1.5; margin-top: 30px;">
          If you didn't request this password reset, you can safely ignore this email.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          © ${new Date().getFullYear()} AuraRev. All rights reserved.
        </p>
      </div>
    `,
  }
}