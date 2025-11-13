import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LinearNavbar from "@/components/LinearNavbar";
import LinearFooter from "@/components/LinearFooter";

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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.02] via-transparent to-purple-600/[0.02]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_50%)]"></div>
        </div>

        {/* Main content wrapper with glass effect */}
        <div className="relative z-10">
          <LinearNavbar />
          <main className="min-h-screen">
            {/* Content wrapper with subtle box effect */}
            <div className="relative">
              {children}
            </div>
          </main>
          <LinearFooter />
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
