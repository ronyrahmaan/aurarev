'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number // in milliseconds, 0 for persistent
  action?: {
    label: string
    onClick: () => void
  }
  dismissible?: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => string
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification: Notification = {
      id,
      dismissible: true,
      duration: 5000,
      ...notification,
    }

    setNotifications(prev => [newNotification, ...prev])

    // Auto-remove after duration
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id))
      }, newNotification.duration)
    }

    return id
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll
    }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Toast notification component
function Toast({ notification, onRemove }: { notification: Notification; onRemove: () => void }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Trigger enter animation
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleRemove = useCallback(() => {
    setIsExiting(true)
    setTimeout(onRemove, 200) // Wait for exit animation
  }, [onRemove])

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  }

  const colors = {
    success: 'border-green-500/30 bg-green-500/10 text-green-400',
    error: 'border-red-500/30 bg-red-500/10 text-red-400',
    warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
    info: 'border-blue-500/30 bg-blue-500/10 text-blue-400'
  }

  const Icon = icons[notification.type]

  return (
    <div
      className={cn(
        'transform transition-all duration-200 ease-out',
        isVisible && !isExiting
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0',
        'max-w-sm w-full border rounded-lg shadow-lg backdrop-blur-sm',
        colors[notification.type]
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Icon className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-medium">{notification.title}</h4>
            {notification.message && (
              <p className="text-sm opacity-90">{notification.message}</p>
            )}
            {notification.action && (
              <Button
                size="sm"
                variant="outline"
                onClick={notification.action.onClick}
                className="mt-2 h-7 text-xs bg-white/[0.05] border-white/[0.2] hover:bg-white/[0.1]"
              >
                {notification.action.label}
              </Button>
            )}
          </div>
          {notification.dismissible && (
            <Button
              size="icon"
              variant="ghost"
              onClick={handleRemove}
              className="h-6 w-6 opacity-70 hover:opacity-100 text-current hover:bg-white/[0.1]"
              aria-label="Close notification"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Container for all notifications
function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications()

  if (notifications.length === 0) return null

  return (
    <div
      className="fixed top-4 right-4 z-[100] space-y-2 pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      <div className="pointer-events-auto space-y-2">
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            notification={notification}
            onRemove={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  )
}

// Convenience hooks
export function useToast() {
  const { addNotification } = useNotifications()

  return {
    success: useCallback((title: string, message?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'success', title, message, ...options }), [addNotification]),

    error: useCallback((title: string, message?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'error', title, message, duration: 8000, ...options }), [addNotification]),

    warning: useCallback((title: string, message?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'warning', title, message, duration: 6000, ...options }), [addNotification]),

    info: useCallback((title: string, message?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'info', title, message, ...options }), [addNotification]),

    custom: useCallback((notification: Omit<Notification, 'id'>) =>
      addNotification(notification), [addNotification])
  }
}

// Banner notification for important system-wide messages
export function NotificationBanner({
  type = 'info',
  title,
  message,
  action,
  onDismiss,
  className
}: {
  type?: Notification['type']
  title: string
  message?: string
  action?: Notification['action']
  onDismiss?: () => void
  className?: string
}) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  }

  const colors = {
    success: 'border-green-500/30 bg-green-500/10',
    error: 'border-red-500/30 bg-red-500/10',
    warning: 'border-yellow-500/30 bg-yellow-500/10',
    info: 'border-blue-500/30 bg-blue-500/10'
  }

  const textColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400'
  }

  const Icon = icons[type]

  return (
    <div
      className={cn(
        'border rounded-lg p-4 backdrop-blur-sm',
        colors[type],
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', textColors[type])} />
        <div className="flex-1">
          <h4 className={cn('text-sm font-medium', textColors[type])}>{title}</h4>
          {message && (
            <p className={cn('text-sm mt-1 opacity-90', textColors[type])}>{message}</p>
          )}
          {action && (
            <Button
              size="sm"
              variant="outline"
              onClick={action.onClick}
              className={cn(
                'mt-3 h-8 text-xs bg-white/[0.05] border-white/[0.2] hover:bg-white/[0.1]',
                textColors[type]
              )}
            >
              {action.label}
            </Button>
          )}
        </div>
        {onDismiss && (
          <Button
            size="icon"
            variant="ghost"
            onClick={onDismiss}
            className={cn(
              'h-6 w-6 opacity-70 hover:opacity-100 hover:bg-white/[0.1]',
              textColors[type]
            )}
            aria-label="Dismiss notification"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  )
}