/**
 * Select Google Business Location
 * POST /api/google/select-business
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

    const { businessId, businessName } = await request.json()

    if (!businessId || !businessName) {
      return NextResponse.json(
        { error: 'Business ID and name are required' },
        { status: 400 }
      )
    }

    const userId = session.userId

    // Update the Google account connection with selected business
    const updatedAccount = await prisma.connectedAccount.updateMany({
      where: {
        userId: userId,
        platform: 'google'
      },
      data: {
        businessId: businessId,
        businessName: businessName,
        updatedAt: new Date()
      }
    })

    if (updatedAccount.count === 0) {
      return NextResponse.json(
        { error: 'Google account connection not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Successfully selected business: ${businessName}`,
      businessId: businessId,
      businessName: businessName
    })

  } catch (error) {
    console.error('Google select business error:', error)
    return NextResponse.json(
      { error: 'Failed to select business location' },
      { status: 500 }
    )
  }
}