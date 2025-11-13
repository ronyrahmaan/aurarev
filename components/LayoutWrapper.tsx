'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Auth pages and dashboard shouldn't have marketing navbar/footer
  const isAuthPage = pathname.startsWith('/login') ||
                     pathname.startsWith('/signup') ||
                     pathname.startsWith('/forgot-password')
  const isDashboard = pathname.startsWith('/dashboard')

  if (isAuthPage) {
    return <>{children}</>
  }

  if (isDashboard) {
    // Dashboard will have its own layout
    return <>{children}</>
  }

  // Marketing pages get navbar and footer
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  )
}