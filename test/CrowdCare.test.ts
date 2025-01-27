import { expect } from "chai"
import { ethers } from "hardhat"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { CrowdCare } from "../typechain-types"

describe("CrowdCare", () => {
  async function deployFixture() {
    const [owner, user1, user2] = await ethers.getSigners()
    const CrowdCare = await ethers.getContractFactory("CrowdCare")
    const crowdCare = await CrowdCare.deploy()
    return { crowdCare, owner, user1, user2 }
  }

  describe("Request Creation", () => {
    it("Should create a new request", async () => {
      const { crowdCare, user1 } = await loadFixture(deployFixture)
      const amount = ethers.parseEther("50")
      const description = "Test Request"

      await expect(crowdCare.connect(user1).createRequest(amount, description))
        .to.emit(crowdCare, "RequestCreated")
        .withArgs(0, user1.address, amount)

      const request = await crowdCare.requests(0)
      expect(request.creator).to.equal(user1.address)
      expect(request.amount).to.equal(amount)
      expect(request.description).to.equal(description)
      expect(request.isActive).to.be.true
    })

    it("Should not create request with amount below minimum", async () => {
      const { crowdCare, user1 } = await loadFixture(deployFixture)
      const amount = ethers.parseEther("49")
      const description = "Test Request"

      await expect(crowdCare.connect(user1).createRequest(amount, description)).to.be.revertedWith("Amount too low")
    })
  })

  describe("Donations", () => {
    it("Should accept donations", async () => {
      const { crowdCare, user1, user2 } = await loadFixture(deployFixture)
      const requestAmount = ethers.parseEther("50")
      const donationAmount = ethers.parseEther("1")

      await crowdCare.connect(user1).createRequest(requestAmount, "Test Request")

      await expect(crowdCare.connect(user2).donate(0, { value: donationAmount }))
        .to.emit(crowdCare, "DonationReceived")
        .withArgs(0, user2.address, donationAmount)

      const request = await crowdCare.requests(0)
      expect(request.raised).to.equal(donationAmount)
    })

    it("Should fund request when target is reached", async () => {
      const { crowdCare, user1, user2 } = await loadFixture(deployFixture)
      const amount = ethers.parseEther("50")

      await crowdCare.connect(user1).createRequest(amount, "Test Request")

      await expect(crowdCare.connect(user2).donate(0, { value: amount }))
        .to.emit(crowdCare, "RequestFunded")
        .withArgs(0, user1.address, amount)

      const request = await crowdCare.requests(0)
      expect(request.isFunded).to.be.true
    })
  })

  describe("Disputes", () => {
    it("Should create a dispute", async () => {
      const { crowdCare, user1, user2 } = await loadFixture(deployFixture)
      const amount = ethers.parseEther("50")
      const donationAmount = ethers.parseEther("1")

      await crowdCare.connect(user1).createRequest(amount, "Test Request")
      await crowdCare.connect(user2).donate(0, { value: donationAmount })

      await expect(crowdCare.connect(user2).createDispute(0, "Test Dispute"))
        .to.emit(crowdCare, "DisputeCreated")
        .withArgs(0, 0, user2.address)
    })

    it("Should allow voting on disputes", async () => {
      const { crowdCare, user1, user2 } = await loadFixture(deployFixture)
      const amount = ethers.parseEther("50")
      const donationAmount = ethers.parseEther("1")

      await crowdCare.connect(user1).createRequest(amount, "Test Request")
      await crowdCare.connect(user2).donate(0, { value: donationAmount })
      await crowdCare.connect(user2).createDispute(0, "Test Dispute")

      await crowdCare.connect(user2).voteOnDispute(0, true)

      const dispute = await crowdCare.disputes(0)
      expect(dispute.votesFor).to.equal(1)
    })
  })
})

