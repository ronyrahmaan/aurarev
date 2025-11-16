import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LinearNavbar from "@/components/LinearNavbar";
import LinearFooter from "@/components/LinearFooter";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuraRev - Automate Your Google Review Management",
  description: "AuraRev automatically pulls your Google reviews, generates AI-powered marketing blurbs, and delivers weekly insights—all on autopilot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-[rgb(8,9,10)] text-white overflow-x-hidden`}>
        {/* Subtle gradient overlay for depth */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.02] via-transparent to-blue-500/[0.02]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_50%)]"></div>
        </div>

        {/* Decorative Border Frame - Visible on ALL pages */}
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

          {/* Bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

          {/* Left border */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute top-4 bottom-4 left-4 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>

          {/* Right border */}
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute top-4 bottom-4 right-4 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>

          {/* Corner decorations */}
          {/* Top-left corner */}
          <div className="absolute top-0 left-0 w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-px bg-blue-500/40"></div>
            <div className="absolute top-0 left-0 w-px h-full bg-blue-500/40"></div>
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-blue-500/30"></div>
          </div>

          {/* Top-right corner */}
          <div className="absolute top-0 right-0 w-16 h-16">
            <div className="absolute top-0 right-0 w-full h-px bg-blue-500/40"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-blue-500/40"></div>
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-blue-500/30"></div>
          </div>

          {/* Bottom-left corner */}
          <div className="absolute bottom-0 left-0 w-16 h-16">
            <div className="absolute bottom-0 left-0 w-full h-px bg-blue-500/40"></div>
            <div className="absolute bottom-0 left-0 w-px h-full bg-blue-500/40"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-blue-500/30"></div>
          </div>

          {/* Bottom-right corner */}
          <div className="absolute bottom-0 right-0 w-16 h-16">
            <div className="absolute bottom-0 right-0 w-full h-px bg-blue-500/40"></div>
            <div className="absolute bottom-0 right-0 w-px h-full bg-blue-500/40"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-blue-500/30"></div>
          </div>

          {/* Animated glow effect on corners */}
          <div className="absolute top-0 left-0 w-32 h-32 opacity-50">
            <div className="absolute inset-0 bg-blue-500/10 blur-xl animate-pulse"></div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-50">
            <div className="absolute inset-0 bg-blue-500/10 blur-xl animate-pulse animation-delay-200"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-32 h-32 opacity-50">
            <div className="absolute inset-0 bg-blue-500/10 blur-xl animate-pulse animation-delay-400"></div>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-50">
            <div className="absolute inset-0 bg-blue-500/10 blur-xl animate-pulse animation-delay-300"></div>
          </div>
        </div>

        {/* Main content wrapper with glass effect */}
        <div className="relative z-10">
          <AuthProvider>
            <LinearNavbar />
            <main className="min-h-screen">
              {/* Content wrapper with subtle box effect */}
              <div className="relative">
                {children}
              </div>
            </main>
            <LinearFooter />
          </AuthProvider>
        </div>

        {/* Noise texture overlay for that premium feel */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.015] z-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </body>
    </html>
  );
}
