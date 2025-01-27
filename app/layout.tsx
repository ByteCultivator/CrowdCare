import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Providers } from "@/components/providers"
import { Analytics } from "@/components/analytics"
import { ErrorBoundaryWrapper } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CrowdCare - Community-Driven Support Platform",
  description: "A decentralized platform for community financial support and donations",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <ErrorBoundaryWrapper>
          <Providers>
            <div className="flex min-h-full flex-col">
              <Navigation />
              <main className="flex-1">
                <div className="container mx-auto px-4 py-6">{children}</div>
              </main>
            </div>
          </Providers>
        </ErrorBoundaryWrapper>
        <Analytics />
      </body>
    </html>
  )
}

