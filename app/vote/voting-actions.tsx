"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAccount } from "wagmi"
import { w3mConnectors, w3mProvider } from "@web3modal/ethereum"
import { useWeb3Modal } from "@web3modal/wagmi/react"

interface VotingActionsProps {
  requestId: number
}

export function VotingActions({ requestId }: VotingActionsProps) {
  const { address, isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async (vote: boolean) => {
    if (!isConnected) {
      await open()
      return
    }

    setIsVoting(true)
    try {
      // Here we would call the smart contract voting function
      console.log(`Voting ${vote ? "Yes" : "No"} on request ${requestId}`)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate transaction
    } catch (error) {
      console.error("Error voting:", error)
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <div className="flex gap-4">
      <Button variant="outline" className="flex-1" onClick={() => handleVote(false)} disabled={isVoting}>
        Vote No
      </Button>
      <Button className="flex-1" onClick={() => handleVote(true)} disabled={isVoting}>
        Vote Yes
      </Button>
    </div>
  )
}

