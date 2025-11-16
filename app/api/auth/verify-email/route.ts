import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { message: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Find user with the verification token
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerified: null, // Not yet verified
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Mark email as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null, // Clear the token
      }
    })

    return NextResponse.json({
      message: 'Email verified successfully!'
    }, { status: 200 })
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}