"use client"

import { WagmiConfig, wagmiConfig } from "@/lib/web3"

export function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}

