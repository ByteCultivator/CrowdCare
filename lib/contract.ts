import { createPublicClient, http, createWalletClient, custom, parseEther } from "viem"
import { mainnet } from "viem/chains"
import { abi } from "./abi"

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

export const getWalletClient = () => {
  if (!window.ethereum) throw new Error("No ethereum provider found")

  return createWalletClient({
    chain: mainnet,
    transport: custom(window.ethereum),
  })
}

export async function createRequest(amount: number, description: string) {
  const walletClient = getWalletClient()

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "createRequest",
    args: [parseEther(amount.toString()), description],
  })

  return hash
}

export async function donate(requestId: number, amount: number) {
  const walletClient = getWalletClient()

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "donate",
    args: [requestId],
    value: parseEther(amount.toString()),
  })

  return hash
}

export async function createDispute(requestId: number, description: string) {
  const walletClient = getWalletClient()

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "createDispute",
    args: [requestId, description],
  })

  return hash
}

export async function voteOnDispute(disputeId: number, support: boolean) {
  const walletClient = getWalletClient()

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "voteOnDispute",
    args: [disputeId, support],
  })

  return hash
}

export async function getRequest(requestId: number) {
  const data = await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "requests",
    args: [requestId],
  })

  return data
}

export async function getDispute(disputeId: number) {
  const data = await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "disputes",
    args: [disputeId],
  })

  return data
}

