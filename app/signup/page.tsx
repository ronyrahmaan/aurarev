'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authenticateUser } from '@/lib/auth-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Loader2, Mail, CheckCircle } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (password.match(/[a-z]/)) score++
    if (password.match(/[A-Z]/)) score++
    if (password.match(/[0-9]/)) score++
    if (password.match(/[^a-zA-Z0-9]/)) score++
    return score
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthColors = ['bg-red-500', 'bg-red-400', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500']
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          businessName: formData.businessName,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle specific error cases
        if (data.errors && Array.isArray(data.errors)) {
          setError(`Password requirements not met:\n${data.errors.join('\n')}`)
        } else {
          setError(data.message || 'Signup failed')
        }
        return
      }

      // Success! Show verification message
      setSuccess(true)
      setSuccessMessage(data.message || 'Account created! Please check your email to verify your account.')

      // Clear the form
      setFormData({
        fullName: '',
        businessName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08090a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl bg-linear-to-b from-white/6 to-white/2 border-2 border-white/15 backdrop-blur-sm p-8 ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
      <Card className="w-full border-0 bg-transparent shadow-none">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Create your account</CardTitle>
          <CardDescription className="text-gray-400">
            Start your 14-day free trial. No credit card required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center space-y-6">
              <div className="mx-auto h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">Check your email!</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {successMessage}
                </p>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-400 shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-blue-400">What's next?</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Click the verification link in your email, then return to sign in to your account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push('/login')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  Go to Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSuccess(false)
                    setSuccessMessage('')
                  }}
                  className="w-full bg-white/[0.02] border-white/8 text-white hover:bg-white/[0.05]"
                >
                  Create Another Account
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-gray-300">Business Name</Label>
              <Input
                id="businessName"
                type="text"
                placeholder="Acme Inc."
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={loading}
              />
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          level <= passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${
                    passwordStrength <= 2 ? 'text-red-400' :
                    passwordStrength <= 3 ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : 'Enter a password'}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-400">Already have an account? </span>
            <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium">
              Sign in
            </Link>
          </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  )
}