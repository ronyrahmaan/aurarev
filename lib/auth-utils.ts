import crypto from 'crypto'

export interface VerificationToken {
  id: string
  token: string
  email: string
  type: 'EMAIL_VERIFICATION' | 'PASSWORD_RESET'
  expiresAt: Date
  createdAt: Date
}

export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function generateVerificationToken(email: string, type: 'EMAIL_VERIFICATION' | 'PASSWORD_RESET' = 'EMAIL_VERIFICATION'): VerificationToken {
  const token = generateSecureToken()
  const now = new Date()

  // Email verification tokens expire in 24 hours
  // Password reset tokens expire in 1 hour
  const expirationHours = type === 'EMAIL_VERIFICATION' ? 24 : 1
  const expiresAt = new Date(now.getTime() + expirationHours * 60 * 60 * 1000)

  return {
    id: crypto.randomUUID(),
    token,
    email,
    type,
    expiresAt,
    createdAt: now
  }
}

export function isTokenExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function createPasswordStrengthScore(password: string): {
  score: number
  feedback: string[]
} {
  let score = 0
  const feedback: string[] = []

  if (password.length >= 8) score += 1
  else feedback.push('Use at least 8 characters')

  if (password.length >= 12) score += 1
  else if (password.length >= 8) feedback.push('Consider using 12+ characters for better security')

  if (/[A-Z]/.test(password)) score += 1
  else feedback.push('Include uppercase letters')

  if (/[a-z]/.test(password)) score += 1
  else feedback.push('Include lowercase letters')

  if (/\d/.test(password)) score += 1
  else feedback.push('Include numbers')

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1
  else feedback.push('Include special characters')

  // Bonus points for variety and length
  if (password.length >= 16) score += 1
  if (/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password) && password.length >= 12) {
    score += 1
  }

  return { score: Math.min(score, 5), feedback }
}

// Helper function to hash tokens for database storage
export async function hashToken(token: string): Promise<string> {
  const crypto = await import('crypto')
  return crypto.createHash('sha256').update(token).digest('hex')
}

// Helper function to compare tokens
export async function compareTokenHash(token: string, hashedToken: string): Promise<boolean> {
  const tokenHash = await hashToken(token)
  return tokenHash === hashedToken
}