import sgMail from '@sendgrid/mail'

// Set the API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
} else {
  console.warn('SENDGRID_API_KEY not found in environment variables')
}

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@aurarev.com'

interface EmailResult {
  success: boolean
  error?: string
}

export async function sendWelcomeEmail(to: string, name: string): Promise<EmailResult> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('Email sending disabled - missing SENDGRID_API_KEY')
    return { success: false, error: 'Email configuration missing' }
  }

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
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendVerificationEmail(to: string, name: string, verificationToken: string): Promise<EmailResult> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('Email sending disabled - missing SENDGRID_API_KEY')
    return { success: false, error: 'Email configuration missing' }
  }

  const verificationUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`

  const msg = {
    to,
    from: FROM_EMAIL,
    subject: 'Verify your AuraRev account',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Verify Your Email</h1>
        </div>

        <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333; margin-top: 0;">Hi ${name}!</h2>

          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            Thanks for signing up for AuraRev! Please verify your email address to complete your account setup.
          </p>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 30px 0; border-left: 4px solid #667eea;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Important:</strong> This verification link will expire in 24 hours for security reasons.
            </p>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <a href="${verificationUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Verify Email Address
            </a>
          </div>

          <p style="color: #999; font-size: 14px; line-height: 1.5;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationUrl}" style="color: #667eea; word-break: break-all;">${verificationUrl}</a>
          </p>

          <p style="color: #999; font-size: 14px; text-align: center; border-top: 1px solid #eee; padding-top: 20px; margin-top: 40px;">
            If you didn't create an account with AuraRev, you can safely ignore this email.
          </p>
        </div>
      </div>
    `
  }

  try {
    await sgMail.send(msg)
    console.log('Verification email sent to:', to)
    return { success: true }
  } catch (error) {
    console.error('Error sending verification email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendPasswordResetEmail(to: string, name: string, resetToken: string): Promise<EmailResult> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('Email sending disabled - missing SENDGRID_API_KEY')
    return { success: false, error: 'Email configuration missing' }
  }

  const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password/${resetToken}`

  const msg = {
    to,
    from: FROM_EMAIL,
    subject: 'Reset your AuraRev password',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Reset Your Password</h1>
        </div>

        <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333; margin-top: 0;">Hi ${name}!</h2>

          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            We received a request to reset the password for your AuraRev account. Click the button below to create a new password.
          </p>

          <div style="background: #fff3cd; padding: 20px; border-radius: 6px; margin: 30px 0; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              <strong>Security Notice:</strong> This reset link will expire in 1 hour for your security.
            </p>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <a href="${resetUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>

          <p style="color: #999; font-size: 14px; line-height: 1.5;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #667eea; word-break: break-all;">${resetUrl}</a>
          </p>

          <p style="color: #999; font-size: 14px; text-align: center; border-top: 1px solid #eee; padding-top: 20px; margin-top: 40px;">
            If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.
          </p>
        </div>
      </div>
    `
  }

  try {
    await sgMail.send(msg)
    console.log('Password reset email sent to:', to)
    return { success: true }
  } catch (error) {
    console.error('Error sending password reset email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}