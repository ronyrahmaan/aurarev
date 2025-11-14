import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...')

    const prisma = new PrismaClient()

    // Test basic connection
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Database connection successful:', result)

    // Test user table
    const userCount = await prisma.user.count()
    console.log('User count:', userCount)

    await prisma.$disconnect()

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount: userCount,
      testQuery: result
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack
      },
      { status: 500 }
    )
  }
}