"use client"

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react"
import { WagmiConfig } from "wagmi"
import { arbitrum, mainnet } from "viem/chains"

const projectId = "YOUR_WALLETCONNECT_PROJECT_ID"

const metadata = {
  name: "CrowdCare",
  description: "Decentralized Community Support Platform",
  url: "https://crowdcare.app",
  icons: ["https://crowdcare.app/icon.png"],
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })

export { wagmiConfig, WagmiConfig }

