import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LinearNavbar from "@/components/LinearNavbar";
import LinearFooter from "@/components/LinearFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuraRev - Automate Your Review Management",
  description: "AuraRev is a purpose-built tool for managing and monetizing reviews. Automatically collect reviews, generate AI trust blurbs, and display social proof that converts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <LinearNavbar />
        <main className="min-h-screen">
          {children}
        </main>
        <LinearFooter />
      </body>
    </html>
  );
}