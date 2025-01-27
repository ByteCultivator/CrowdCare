// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./CrowdCareStructs.sol";
import "./CrowdCareUsers.sol";

contract CrowdCareRequests is CrowdCareUsers {
    mapping(uint256 => FundRequest) public fundRequests;
    uint256 public requestCount;

    event FundRequestCreated(uint256 indexed requestId, address indexed requester, uint256 amount, Category category);
    event RequestStatusUpdated(uint256 indexed requestId, RequestStatus newStatus);

    modifier onlyValidRequest(uint256 requestId) {
        require(fundRequests[requestId].requester != address(0), "Invalid request ID.");
        _;
    }

    function createFundRequest(
        uint256 amount,
        string calldata purpose,
        Category category
    ) external onlyRegistered {
        require(amount >= minRequest && amount <= maxRequest, "Invalid request amount.");
        require(bytes(purpose).length > 0, "Purpose cannot be empty.");

        requestCount++;
        FundRequest storage newRequest = fundRequests[requestCount];

        newRequest.requester = msg.sender;
        newRequest.amount = amount;
        newRequest.purpose = purpose;
        newRequest.category = category;
        newRequest.createdAt = block.timestamp;
        newRequest.votingEndTime = block.timestamp + votingPeriod;
        newRequest.claimDeadline = block.timestamp + claimPeriod;
        newRequest.status = RequestStatus.Pending;

        emit FundRequestCreated(requestCount, msg.sender, amount, category);
    }

    function updateRequestStatus(uint256 requestId, RequestStatus newStatus) external onlyValidRequest(requestId) {
        FundRequest storage request = fundRequests[requestId];
        request.status = newStatus;

        emit RequestStatusUpdated(requestId, newStatus);
    }
}
