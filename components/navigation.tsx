"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import { useAccount } from "wagmi"
import { Notifications } from "./notifications"

export function Navigation() {
  const pathname = usePathname()
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              CrowdCare
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                href="/donate"
                className={`${pathname === "/donate" ? "text-primary" : "text-muted-foreground"} hover:text-primary transition-colors`}
              >
                Donate
              </Link>
              <Link
                href="/requests"
                className={`${pathname === "/requests" ? "text-primary" : "text-muted-foreground"} hover:text-primary transition-colors`}
              >
                Fund Requests
              </Link>
              <Link
                href="/vote"
                className={`${pathname === "/vote" ? "text-primary" : "text-muted-foreground"} hover:text-primary transition-colors`}
              >
                Vote
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Notifications />
            <Button variant="outline" className="flex items-center gap-2" onClick={() => open()}>
              <Wallet className="h-4 w-4" />
              {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Connect Wallet"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

