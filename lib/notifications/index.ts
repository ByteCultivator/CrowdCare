import { createPublicClient, webSocket, parseAbiItem } from "viem"
import { mainnet } from "viem/chains"
import { EventEmitter } from "events"

const wsClient = createPublicClient({
  chain: mainnet,
  transport: webSocket(),
})

class NotificationManager extends EventEmitter {
  private static instance: NotificationManager
  private userAddress: string | null = null

  private constructor() {
    super()
    this.setupEventListeners()
  }

  static getInstance() {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager()
    }
    return NotificationManager.instance
  }

  setUserAddress(address: string) {
    this.userAddress = address
  }

  private setupEventListeners() {
    // Listen for donations
    wsClient.watchContractEvent({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      event: parseAbiItem("event DonationReceived(uint256 indexed requestId, address donor, uint256 amount)"),
      onLogs: (logs) => {
        logs.forEach((log) => {
          if (log.args.donor === this.userAddress) {
            this.emit("notification", {
              type: "donation",
              title: "Donation Confirmed",
              message: `Your donation of ${log.args.amount} has been confirmed`,
              timestamp: new Date().toISOString(),
            })
          }
        })
      },
    })

    // Listen for request updates
    wsClient.watchContractEvent({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      event: parseAbiItem("event RequestUpdated(uint256 indexed requestId, bool funded)"),
      onLogs: (logs) => {
        logs.forEach((log) => {
          this.emit("notification", {
            type: "request",
            title: "Request Updated",
            message: `Request #${log.args.requestId} has been ${log.args.funded ? "funded" : "updated"}`,
            timestamp: new Date().toISOString(),
          })
        })
      },
    })

    // Listen for votes
    wsClient.watchContractEvent({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      event: parseAbiItem("event VoteCast(uint256 indexed requestId, address voter, bool support)"),
      onLogs: (logs) => {
        logs.forEach((log) => {
          if (log.args.voter === this.userAddress) {
            this.emit("notification", {
              type: "vote",
              title: "Vote Recorded",
              message: `Your vote on Request #${log.args.requestId} has been recorded`,
              timestamp: new Date().toISOString(),
            })
          }
        })
      },
    })
  }
}

export const notificationManager = NotificationManager.getInstance()

