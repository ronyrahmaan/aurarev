import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { sendVerificationEmail } from '@/lib/email'
import { generateVerificationToken, validateEmail, validatePassword, hashToken } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    const { fullName, businessName, email, password } = await request.json()

    // Validate input
    if (!fullName || !businessName || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
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

    // Validate password strength
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { message: 'Password requirements not met', errors: passwordValidation.errors },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      if (existingUser.emailVerifiedAt) {
        return NextResponse.json(
          { message: 'Email already registered and verified' },
          { status: 400 }
        )
      } else {
        // User exists but not verified - resend verification
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
            userId: existingUser.id
          }
        })

        // Send verification email
        const emailResult = await sendVerificationEmail(email, fullName, verificationToken.token)

        if (emailResult.success) {
          return NextResponse.json({
            message: 'Verification email sent. Please check your email to verify your account.',
            requiresVerification: true
          }, { status: 200 })
        } else {
          return NextResponse.json(
            { message: 'Failed to send verification email. Please try again.' },
            { status: 500 }
          )
        }
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user (inactive until email is verified)
    const user = await prisma.user.create({
      data: {
        fullName,
        businessName,
        email,
        passwordHash: hashedPassword,
        plan: 'free',
        isActive: false // User is inactive until email verification
      }
    })

    // Generate verification token
    const verificationToken = generateVerificationToken(email, 'EMAIL_VERIFICATION')
    const hashedTokenValue = await hashToken(verificationToken.token)

    // Store verification token in database
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
    const emailResult = await sendVerificationEmail(email, fullName, verificationToken.token)

    if (!emailResult.success) {
      // If email fails, we still created the user but log the error
      console.error('Failed to send verification email:', emailResult.error)

      // Could optionally delete the user and token here if email is critical
      // For now, we'll allow the signup to succeed but notify about email issue
      return NextResponse.json({
        message: 'Account created but verification email could not be sent. Please contact support.',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          businessName: user.businessName,
          requiresVerification: true
        }
      }, { status: 201 })
    }

    // Return success
    return NextResponse.json({
      message: 'Account created successfully! Please check your email to verify your account before signing in.',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        businessName: user.businessName,
        requiresVerification: true
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}