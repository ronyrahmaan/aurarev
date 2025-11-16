'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  fullName: string | null
  businessName: string | null
  plan: string
  emailVerified: Date | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  signup: (data: { fullName: string; businessName: string; email: string; password: string }) => Promise<{ success: boolean; error?: string; requiresEmailVerification?: boolean }>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      console.log('AuthProvider: Fetching user...')
      const response = await fetch('/api/auth/me')
      console.log('AuthProvider: /api/auth/me response status:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('AuthProvider: User data received:', data.user)
        setUser(data.user)
      } else {
        console.log('AuthProvider: No authenticated user, setting user to null')
        setUser(null)
        // Clear any old client-side auth data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          localStorage.removeItem('auth-token')
          sessionStorage.clear()
        }
      }
    } catch (error) {
      console.error('AuthProvider: Error fetching user:', error)
      setUser(null)
      // Clear any old client-side auth data on error
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('auth-token')
        sessionStorage.clear()
      }
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthProvider: Starting login request for email:', email)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      console.log('AuthProvider: Response status:', response.status)
      const data = await response.json()
      console.log('AuthProvider: Response data:', data)

      if (response.ok) {
        setUser(data.user)
        console.log('AuthProvider: Login successful, user set:', data.user)
        return { success: true }
      } else {
        console.log('AuthProvider: Login failed:', data.message)
        return { success: false, error: data.message }
      }
    } catch (error) {
      console.error('AuthProvider: Login error:', error)
      return { success: false, error: 'Something went wrong' }
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const signup = async (data: { fullName: string; businessName: string; email: string; password: string }) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        return { success: true, requiresEmailVerification: result.requiresEmailVerification }
      } else {
        return { success: false, error: result.message }
      }
    } catch (error) {
      return { success: false, error: 'Something went wrong' }
    }
  }

  const refreshUser = async () => {
    await fetchUser()
  }

  useEffect(() => {
    // Clear any potential cached data from old auth system
    if (typeof window !== 'undefined') {
      console.log('AuthProvider: Clearing old client-side auth data')
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('auth-token')
      // Clear any NextAuth related data
      localStorage.removeItem('nextauth.message')
      localStorage.removeItem('__next-auth.session-token')
      localStorage.removeItem('__Secure-next-auth.session-token')
      sessionStorage.clear()
    }
    fetchUser()
  }, [])

  const value = {
    user,
    loading,
    login,
    logout,
    signup,
    refreshUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}