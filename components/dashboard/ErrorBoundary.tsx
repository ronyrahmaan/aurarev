'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // Call onError callback if provided
    this.props.onError?.(error, errorInfo)

    // In production, you might want to log to an error reporting service
    // Example: logErrorToService(error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}

// Default Error Fallback Component
interface ErrorFallbackProps {
  error?: Error
  resetError: () => void
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-red-500/20 max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          <CardTitle className="text-white">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-400 text-sm">
            We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
          </p>

          {isDevelopment && error && (
            <details className="text-left bg-black/30 rounded p-3 text-xs text-gray-300">
              <summary className="cursor-pointer text-red-400 mb-2">Error Details (Development)</summary>
              <pre className="whitespace-pre-wrap break-words">
                {error.message}
                {error.stack && `\n\nStack trace:\n${error.stack}`}
              </pre>
            </details>
          )}

          <div className="flex flex-col gap-2 pt-2">
            <Button
              onClick={resetError}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/dashboard'}
              className="bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Error ID: {Date.now().toString(36)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Component Error Fallback for smaller components
export function ComponentErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
      <div className="flex items-center gap-3">
        <Bug className="h-5 w-5 text-red-400 shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-400">Component Error</h3>
          <p className="text-xs text-gray-400 mt-1">
            This component encountered an error and couldn't render properly.
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={resetError}
          className="bg-white/[0.02] border-red-500/30 text-red-400 hover:bg-red-500/10"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
      {process.env.NODE_ENV === 'development' && error && (
        <details className="mt-3 text-xs text-gray-500">
          <summary className="cursor-pointer">Error Details</summary>
          <pre className="mt-2 p-2 bg-black/30 rounded text-xs overflow-auto">
            {error.message}
          </pre>
        </details>
      )}
    </div>
  )
}

// Hook for functional component error handling
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const handleError = React.useCallback((error: Error) => {
    setError(error)
  }, [])

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return { handleError, resetError }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<ErrorFallbackProps>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}