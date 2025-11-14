/**
 * Check Google connection status
 * GET /api/google/status?userId=123
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get user's Google account connection
    const googleAccount = await prisma.connectedAccount.findUnique({
      where: {
        userId_platform: {
          userId: userId,
          platform: 'google'
        }
      },
      select: {
        id: true,
        isActive: true,
        businessName: true,
        connectedAt: true,
        expiresAt: true
      }
    })

    if (!googleAccount) {
      return NextResponse.json({
        connected: false,
        message: 'Google account not connected'
      })
    }

    // Check if token is expired
    const isExpired = googleAccount.expiresAt && googleAccount.expiresAt < new Date()

    return NextResponse.json({
      connected: true,
      isActive: googleAccount.isActive,
      isExpired: isExpired,
      businessName: googleAccount.businessName,
      connectedAt: googleAccount.connectedAt,
      expiresAt: googleAccount.expiresAt
    })

  } catch (error) {
    console.error('Google status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check Google connection status' },
      { status: 500 }
    )
  }
}