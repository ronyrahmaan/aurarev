import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendVerificationEmail } from '@/lib/email'
import { generateVerificationToken, validateEmail, hashToken } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email address is required' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // For security, don't reveal if the email exists or not
      return NextResponse.json({
        message: 'If an account with that email exists and is unverified, a verification email has been sent.',
      }, { status: 200 })
    }

    // Check if user is already verified
    if (user.emailVerifiedAt) {
      return NextResponse.json({
        message: 'This email address is already verified',
        alreadyVerified: true
      }, { status: 200 })
    }

    // Check for recent verification attempts (rate limiting)
    const recentToken = await prisma.authToken.findFirst({
      where: {
        email,
        type: 'EMAIL_VERIFICATION',
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    if (recentToken) {
      return NextResponse.json(
        { message: 'Please wait 5 minutes before requesting another verification email' },
        { status: 429 }
      )
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken(email, 'EMAIL_VERIFICATION')
    const hashedTokenValue = await hashToken(verificationToken.token)

    // Clean up old tokens for this email
    await prisma.authToken.deleteMany({
      where: {
        email,
        type: 'EMAIL_VERIFICATION'
      }
    })

    // Create new verification token
    await prisma.authToken.create({
      data: {
        token: verificationToken.token,
        hashedToken: hashedTokenValue,
        email,
        type: 'EMAIL_VERIFICATION',
        expiresAt: verificationToken.expiresAt,
        userId: user.id
      }
    })

    // Send verification email
    const emailResult = await sendVerificationEmail(email, user.fullName || user.name || 'User', verificationToken.token)

    if (!emailResult.success) {
      console.error('Failed to resend verification email:', emailResult.error)
      return NextResponse.json(
        { message: 'Failed to send verification email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Verification email sent successfully. Please check your inbox.',
    }, { status: 200 })

  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}