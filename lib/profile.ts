import { uploadToIPFS, getFromIPFS } from "./storage"
import { createPublicClient, http } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

export interface UserProfile {
  name: string
  bio: string
  avatar: string
  website?: string
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

export async function saveProfile(address: string, profile: UserProfile) {
  try {
    // Upload profile data to IPFS
    const cid = await uploadToIPFS(profile)

    // Update profile CID in the smart contract
    // This would require a contract interaction
    const tx = await updateProfileCID(address, cid)

    return tx
  } catch (error) {
    console.error("Error saving profile:", error)
    throw error
  }
}

export async function getProfile(address: string): Promise<UserProfile | null> {
  try {
    // Get profile CID from the smart contract
    const profileCID = await client.readContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: [
        {
          name: "getProfileCID",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "user", type: "address" }],
          outputs: [{ name: "cid", type: "string" }],
        },
      ],
      functionName: "getProfileCID",
      args: [address],
    })

    if (!profileCID) return null

    // Fetch profile data from IPFS
    const profile = await getFromIPFS(profileCID as string)
    return profile
  } catch (error) {
    console.error("Error getting profile:", error)
    return null
  }
}

async function updateProfileCID(address: string, cid: string) {
  // This would be implemented using your preferred web3 library
  // to interact with the smart contract
  // Example implementation would go here
  return null
}

