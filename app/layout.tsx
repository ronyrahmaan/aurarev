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
      <body className={`${inter.className} antialiased bg-background text-white`}>
        <LinearNavbar />
        <main className="min-h-screen">
          {children}
        </main>
        <LinearFooter />
      </body>
    </html>
  );
}
