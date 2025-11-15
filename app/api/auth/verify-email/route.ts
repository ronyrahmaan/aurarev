import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { compareTokenHash, isTokenExpired } from '@/lib/auth-utils'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { message: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Find the verification token in the database
    const authToken = await prisma.authToken.findFirst({
      where: {
        token,
        type: 'EMAIL_VERIFICATION',
        isValid: true
      },
      include: {
        User: true
      }
    })

    if (!authToken) {
      return NextResponse.json(
        { message: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (isTokenExpired(authToken.expiresAt)) {
      // Invalidate the expired token
      await prisma.authToken.update({
        where: { id: authToken.id },
        data: { isValid: false }
      })

      return NextResponse.json(
        { message: 'Verification token has expired. Please request a new verification email.' },
        { status: 400 }
      )
    }

    // Check if token has already been used
    if (authToken.usedAt) {
      return NextResponse.json(
        { message: 'Verification token has already been used' },
        { status: 400 }
      )
    }

    // Find the user associated with this token
    const user = await prisma.user.findUnique({
      where: { email: authToken.email }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user is already verified
    if (user.emailVerifiedAt) {
      // Mark token as used even though user was already verified
      await prisma.authToken.update({
        where: { id: authToken.id },
        data: {
          usedAt: new Date(),
          isValid: false
        }
      })

      return NextResponse.json({
        message: 'Email address is already verified',
        alreadyVerified: true
      }, { status: 200 })
    }

    // Verify the user's email
    const now = new Date()

    await prisma.$transaction(async (tx) => {
      // Update user verification status
      await tx.user.update({
        where: { id: user.id },
        data: {
          emailVerifiedAt: now,
          isActive: true
        }
      })

      // Mark the token as used
      await tx.authToken.update({
        where: { id: authToken.id },
        data: {
          usedAt: now,
          isValid: false
        }
      })

      // Clean up any other verification tokens for this user
      await tx.authToken.updateMany({
        where: {
          email: authToken.email,
          type: 'EMAIL_VERIFICATION',
          id: { not: authToken.id }
        },
        data: { isValid: false }
      })
    })

    // Send welcome email after successful verification
    try {
      await sendWelcomeEmail(user.email, user.fullName || user.name || 'User')
    } catch (emailError) {
      console.error('Failed to send welcome email after verification:', emailError)
      // Don't fail the verification if welcome email fails
    }

    return NextResponse.json({
      message: 'Email verified successfully! You can now sign in to your account.',
      verified: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        businessName: user.businessName,
        isActive: true
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { message: 'Something went wrong during verification' },
      { status: 500 }
    )
  }
}

// GET endpoint for URL-based verification (when clicking email link)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { message: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Find the verification token in the database
    const authToken = await prisma.authToken.findFirst({
      where: {
        token,
        type: 'EMAIL_VERIFICATION',
        isValid: true
      }
    })

    if (!authToken) {
      return NextResponse.json(
        { message: 'Invalid verification token' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (isTokenExpired(authToken.expiresAt)) {
      await prisma.authToken.update({
        where: { id: authToken.id },
        data: { isValid: false }
      })

      return NextResponse.json(
        { message: 'Verification token has expired' },
        { status: 400 }
      )
    }

    // Check if token has already been used
    if (authToken.usedAt) {
      return NextResponse.json(
        { message: 'Verification token has already been used' },
        { status: 400 }
      )
    }

    // Return token validation success (frontend will handle the verification)
    return NextResponse.json({
      message: 'Token is valid',
      valid: true,
      email: authToken.email
    }, { status: 200 })

  } catch (error) {
    console.error('Token validation error:', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}