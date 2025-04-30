import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { SmoothScroll } from "@/components/smooth-scroll"
import Header from "@/components/header"
import NextAuthSessionProvider from "@/components/providers/session-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "T's Portfolio",
  description: "徳永智桜のポートフォリオサイト",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <AuthProvider>
              <SmoothScroll />
              <div className="portfolio-container">
                <Header />
                <main>{children}</main>
              </div>
            </AuthProvider>
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
