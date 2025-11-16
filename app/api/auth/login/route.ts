import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { generateToken, setAuthCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        { message: 'Please verify your email before signing in' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    })

    // Set auth cookie
    await setAuthCookie(token)

    // Return success
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        businessName: user.businessName,
        plan: user.plan,
        emailVerified: user.emailVerified
      }
    }, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}