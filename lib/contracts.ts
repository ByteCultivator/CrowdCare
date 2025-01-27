import { createPublicClient, http, createWalletClient, custom } from "viem"
import { mainnet } from "viem/chains"
import { abi } from "./abi"

const contractAddress = "0x..." // Contract address would go here

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

export async function createFundRequest(amount: number, description: string, duration: number) {
  const walletClient = getWalletClient()

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "createRequest",
    args: [amount, description, duration],
  })

  return hash
}

export async function vote(requestId: number, support: boolean) {
  const walletClient = getWalletClient()

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "vote",
    args: [requestId, support],
  })

  return hash
}

export async function donate(amount: number) {
  const walletClient = getWalletClient()

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "donate",
    args: [],
    value: BigInt(amount),
  })

  return hash
}

