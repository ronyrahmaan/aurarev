'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertTriangle, Mail, ArrowRight, RefreshCw } from 'lucide-react'

interface VerificationState {
  status: 'loading' | 'success' | 'error' | 'expired' | 'already_verified'
  message: string
  email?: string
}

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [state, setState] = useState<VerificationState>({
    status: 'loading',
    message: 'Verifying your email address...'
  })

  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setState({
        status: 'error',
        message: 'No verification token provided'
      })
      return
    }

    verifyEmail(token)
  }, [token])

  const verifyEmail = async (token: string) => {
    try {
      // First, validate the token
      const validateResponse = await fetch(`/api/auth/verify-email?token=${token}`)

      if (!validateResponse.ok) {
        const errorData = await validateResponse.json()

        if (validateResponse.status === 400 && errorData.message.includes('expired')) {
          setState({
            status: 'expired',
            message: 'Your verification link has expired. Please request a new verification email.',
            email: errorData.email
          })
          return
        }

        setState({
          status: 'error',
          message: errorData.message || 'Invalid verification token'
        })
        return
      }

      const validateData = await validateResponse.json()

      // If token is valid, proceed with verification
      const verifyResponse = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
      })

      const data = await verifyResponse.json()

      if (verifyResponse.ok) {
        if (data.alreadyVerified) {
          setState({
            status: 'already_verified',
            message: 'Your email address is already verified',
            email: validateData.email
          })
        } else {
          setState({
            status: 'success',
            message: 'Email verified successfully! You can now sign in to your account.',
            email: validateData.email
          })
        }
      } else {
        setState({
          status: 'error',
          message: data.message || 'Failed to verify email'
        })
      }
    } catch (error) {
      console.error('Verification error:', error)
      setState({
        status: 'error',
        message: 'Something went wrong. Please try again.'
      })
    }
  }

  const handleResendVerification = async () => {
    if (!state.email) return

    try {
      setState(prev => ({ ...prev, status: 'loading', message: 'Sending new verification email...' }))

      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: state.email })
      })

      if (response.ok) {
        setState({
          status: 'success',
          message: 'New verification email sent. Please check your inbox.',
          email: state.email
        })
      } else {
        const data = await response.json()
        setState({
          status: 'error',
          message: data.message || 'Failed to send verification email',
          email: state.email
        })
      }
    } catch (error) {
      setState({
        status: 'error',
        message: 'Something went wrong. Please try again.',
        email: state.email
      })
    }
  }

  const renderIcon = () => {
    switch (state.status) {
      case 'loading':
        return <RefreshCw className="h-16 w-16 text-blue-400 animate-spin" />
      case 'success':
      case 'already_verified':
        return <CheckCircle className="h-16 w-16 text-green-400" />
      case 'error':
      case 'expired':
        return <AlertTriangle className="h-16 w-16 text-red-400" />
      default:
        return <Mail className="h-16 w-16 text-gray-400" />
    }
  }

  const renderActions = () => {
    switch (state.status) {
      case 'success':
        return (
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/login')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              Sign In to Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )

      case 'already_verified':
        return (
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/login')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              Go to Sign In
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )

      case 'expired':
        return (
          <div className="space-y-3">
            <Button
              onClick={handleResendVerification}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send New Verification Email
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/signup')}
              className="w-full bg-white/[0.02] border-white/8 text-white hover:bg-white/[0.05]"
            >
              Back to Sign Up
            </Button>
          </div>
        )

      case 'error':
        return (
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/signup')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              Back to Sign Up
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/login')}
              className="w-full bg-white/[0.02] border-white/8 text-white hover:bg-white/[0.05]"
            >
              Try to Sign In
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  const getCardColor = () => {
    switch (state.status) {
      case 'success':
      case 'already_verified':
        return 'border-green-500/20 bg-green-500/5'
      case 'error':
      case 'expired':
        return 'border-red-500/20 bg-red-500/5'
      default:
        return 'border-white/8 bg-white/[0.02]'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-6">
      <Card className={`max-w-md w-full ${getCardColor()}`}>
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-6">
            {renderIcon()}
          </div>
          <CardTitle className="text-white text-2xl">
            {state.status === 'loading' && 'Verifying Email'}
            {state.status === 'success' && 'Email Verified!'}
            {state.status === 'already_verified' && 'Already Verified'}
            {state.status === 'expired' && 'Link Expired'}
            {state.status === 'error' && 'Verification Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-400 leading-relaxed">
            {state.message}
          </p>

          {state.email && (
            <div className="p-3 bg-white/[0.05] rounded-lg border border-white/8">
              <p className="text-sm text-gray-300">
                Email: <span className="text-white font-medium">{state.email}</span>
              </p>
            </div>
          )}

          {renderActions()}

          <div className="pt-4 border-t border-white/8">
            <p className="text-xs text-gray-500">
              Need help?{' '}
              <a href="mailto:support@aurarev.com" className="text-blue-400 hover:text-blue-300">
                Contact Support
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <RefreshCw className="h-8 w-8 text-blue-400 animate-spin" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}