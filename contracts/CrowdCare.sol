// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract CrowdCare is ReentrancyGuard, Ownable, Pausable {
    struct Request {
        address payable creator;
        uint256 amount;
        uint256 raised;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 deadline;
        string description;
        bool isActive;
        bool isFunded;
    }

    struct Dispute {
        address creator;
        uint256 requestId;
        string description;
        bool isResolved;
        mapping(address => bool) votes;
        uint256 votesFor;
        uint256 votesAgainst;
    }

    mapping(uint256 => Request) public requests;
    mapping(uint256 => Dispute) public disputes;
    mapping(address => uint256) public userDonations;
    mapping(address => uint256) public lastRequestTime;

    uint256 public nextRequestId;
    uint256 public nextDisputeId;
    uint256 public minDonationAmount = 1 ether;
    uint256 public minRequestAmount = 50 ether;
    uint256 public requestCooldown = 365 days;
    uint256 public votingPeriod = 7 days;
    uint256 public disputeResolutionPeriod = 5 days;

    event RequestCreated(uint256 indexed requestId, address creator, uint256 amount);
    event DonationReceived(uint256 indexed requestId, address donor, uint256 amount);
    event RequestFunded(uint256 indexed requestId, address creator, uint256 amount);
    event DisputeCreated(uint256 indexed disputeId, uint256 requestId, address creator);
    event DisputeResolved(uint256 indexed disputeId, bool result);

    constructor() Ownable(msg.sender) {}

    function createRequest(uint256 amount, string memory description) external whenNotPaused {
        require(amount >= minRequestAmount, "Amount too low");
        require(block.timestamp >= lastRequestTime[msg.sender] + requestCooldown, "Too soon");

        uint256 requestId = nextRequestId++;
        Request storage request = requests[requestId];
        request.creator = payable(msg.sender);
        request.amount = amount;
        request.description = description;
        request.deadline = block.timestamp + votingPeriod;
        request.isActive = true;

        lastRequestTime[msg.sender] = block.timestamp;
        emit RequestCreated(requestId, msg.sender, amount);
    }

    function donate(uint256 requestId) external payable whenNotPaused nonReentrant {
        require(msg.value >= minDonationAmount, "Donation too low");
        Request storage request = requests[requestId];
        require(request.isActive, "Request not active");
        require(!request.isFunded, "Already funded");

        request.raised += msg.value;
        userDonations[msg.sender] += msg.value;

        if (request.raised >= request.amount) {
            request.isFunded = true;
            request.creator.transfer(request.amount);
            emit RequestFunded(requestId, request.creator, request.amount);
        }

        emit DonationReceived(requestId, msg.sender, msg.value);
    }

    function createDispute(uint256 requestId, string memory description) external whenNotPaused {
        require(userDonations[msg.sender] > 0, "Must be a donor");
        Request storage request = requests[requestId];
        require(request.isActive || request.isFunded, "Invalid request");

        uint256 disputeId = nextDisputeId++;
        Dispute storage dispute = disputes[disputeId];
        dispute.creator = msg.sender;
        dispute.requestId = requestId;
        dispute.description = description;

        emit DisputeCreated(disputeId, requestId, msg.sender);
    }

    function voteOnDispute(uint256 disputeId, bool support) external whenNotPaused {
        require(userDonations[msg.sender] > 0, "Must be a donor");
        Dispute storage dispute = disputes[disputeId];
        require(!dispute.isResolved, "Already resolved");
        require(!dispute.votes[msg.sender], "Already voted");

        dispute.votes[msg.sender] = true;
        if (support) {
            dispute.votesFor++;
        } else {
            dispute.votesAgainst++;
        }

        // Auto-resolve if clear majority
        if (block.timestamp >= dispute.creator + disputeResolutionPeriod) {
            resolveDispute(disputeId);
        }
    }

    function resolveDispute(uint256 disputeId) public whenNotPaused {
        Dispute storage dispute = disputes[disputeId];
        require(!dispute.isResolved, "Already resolved");
        require(
            block.timestamp >= dispute.creator + disputeResolutionPeriod,
            "Voting period active"
        );

        dispute.isResolved = true;
        bool result = dispute.votesFor > dispute.votesAgainst;

        if (result) {
            Request storage request = requests[dispute.requestId];
            request.isActive = false;
            // Implement refund logic here
        }

        emit DisputeResolved(disputeId, result);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Emergency withdrawal
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}

