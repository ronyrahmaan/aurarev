'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Star } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function SignupPage() {
  const router = useRouter()
  const { user, signup, loading } = useAuth()
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = await signup(formData)

    if (result.success) {
      router.push('/dashboard') // Auto-login after signup
    } else {
      setError(result.error || 'Signup failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08090a] py-12 px-4">
      <div className="w-full max-w-md bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.15] backdrop-blur-sm p-8 rounded-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Create account</h1>
          <p className="text-gray-400 mt-2">Get started with AuraRev</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="businessName" className="text-gray-300">Business Name</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded p-3">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Already have an account? </span>
          <Link href="/login" className="text-blue-400 hover:text-blue-300">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}