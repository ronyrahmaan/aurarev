import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get current user from JWT
    const payload = await getCurrentUser()
    
    if (!payload) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Get full user data from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        businessName: true,
        plan: true,
        emailVerified: true,
        createdAt: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error('Get current user error:', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}