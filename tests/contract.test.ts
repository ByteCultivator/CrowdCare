import { describe, it, expect, beforeEach, vi } from "vitest"
import { createRequest, donate, createDispute, voteOnDispute } from "@/lib/contract"
import { parseEther } from "viem"

// Mock wallet client
const mockWalletClient = {
  writeContract: vi.fn(),
}

vi.mock("viem", () => ({
  createWalletClient: vi.fn(() => mockWalletClient),
  parseEther: vi.fn((value) => BigInt(value * 1e18)),
}))

describe("Contract Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("creates a fund request", async () => {
    const amount = 100
    const description = "Test request"
    const expectedHash = "0x123"

    mockWalletClient.writeContract.mockResolvedValueOnce(expectedHash)

    const hash = await createRequest(amount, description)

    expect(mockWalletClient.writeContract).toHaveBeenCalledWith({
      address: expect.any(String),
      abi: expect.any(Array),
      functionName: "createRequest",
      args: [parseEther(amount.toString()), description],
    })
    expect(hash).toBe(expectedHash)
  })

  it("makes a donation", async () => {
    const requestId = 1
    const amount = 5
    const expectedHash = "0x456"

    mockWalletClient.writeContract.mockResolvedValueOnce(expectedHash)

    const hash = await donate(requestId, amount)

    expect(mockWalletClient.writeContract).toHaveBeenCalledWith({
      address: expect.any(String),
      abi: expect.any(Array),
      functionName: "donate",
      args: [requestId],
      value: parseEther(amount.toString()),
    })
    expect(hash).toBe(expectedHash)
  })

  it("creates a dispute", async () => {
    const requestId = 1
    const description = "Test dispute"
    const expectedHash = "0x789"

    mockWalletClient.writeContract.mockResolvedValueOnce(expectedHash)

    const hash = await createDispute(requestId, description)

    expect(mockWalletClient.writeContract).toHaveBeenCalledWith({
      address: expect.any(String),
      abi: expect.any(Array),
      functionName: "createDispute",
      args: [requestId, description],
    })
    expect(hash).toBe(expectedHash)
  })

  it("votes on a dispute", async () => {
    const disputeId = 1
    const support = true
    const expectedHash = "0xabc"

    mockWalletClient.writeContract.mockResolvedValueOnce(expectedHash)

    const hash = await voteOnDispute(disputeId, support)

    expect(mockWalletClient.writeContract).toHaveBeenCalledWith({
      address: expect.any(String),
      abi: expect.any(Array),
      functionName: "voteOnDispute",
      args: [disputeId, support],
    })
    expect(hash).toBe(expectedHash)
  })
})

