/**
 * Disconnect Google OAuth connection
 * POST /api/google/disconnect
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getSession } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user from session
    const session = await getSession(request)

    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = session.userId

    // Remove the Google account connection
    const deletedAccount = await prisma.connectedAccount.deleteMany({
      where: {
        userId: userId,
        platform: 'google'
      }
    })

    if (deletedAccount.count === 0) {
      return NextResponse.json(
        { error: 'No Google connection found to disconnect' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Google Business Profile disconnected successfully'
    })

  } catch (error) {
    console.error('Google disconnect error:', error)
    return NextResponse.json(
      { error: 'Failed to disconnect Google account' },
      { status: 500 }
    )
  }
}