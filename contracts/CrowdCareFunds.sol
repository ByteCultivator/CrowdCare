// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./CrowdCareStructs.sol";

contract CrowdCareFunds is CrowdCareStructs {
    uint256 public totalFunds;
    uint256 public totalFees;

    event DonationReceived(address indexed donor, uint256 indexed requestId, uint256 amount, uint256 newTotalFunds);
    event FundsClaimed(uint256 indexed requestId, address indexed requester, uint256 amount, uint256 newTotalFunds);
    event FeesWithdrawn(uint256 amount);

    function donate(uint256 requestId) external payable {
        FundRequest storage request = fundRequests[requestId];

        require(request.status == RequestStatus.Active, "Request is not active.");
        require(msg.value >= minDonation && msg.value <= maxDonation, "Donation amount is out of range.");

        request.totalDonations += msg.value;
        request.donations[msg.sender] += msg.value;

        totalFunds += msg.value;

        emit DonationReceived(msg.sender, requestId, msg.value, totalFunds);
    }

    function claimFunds(uint256 requestId) external {
        FundRequest storage request = fundRequests[requestId];

        require(request.status == RequestStatus.Approved, "Request is not approved for claiming.");
        require(msg.sender == request.requester, "Only the requester can claim funds.");
        require(block.timestamp <= request.claimDeadline, "Claim deadline has passed.");

        uint256 claimableAmount = request.totalDonations;
        require(claimableAmount > 0, "No funds to claim.");

        request.totalDonations = 0;
        request.status = RequestStatus.Claimed;

        totalFunds -= claimableAmount;

        (bool success, ) = payable(msg.sender).call{value: claimableAmount}();
        require(success, "Transfer failed.");

        emit FundsClaimed(requestId, msg.sender, claimableAmount, totalFunds);
    }

    function withdrawFees() external onlyRole(ADMIN_ROLE) {
        uint256 feeAmount = totalFees;
        require(feeAmount > 0, "No fees to withdraw.");

        totalFees = 0;

        (bool success, ) = payable(msg.sender).call{value: feeAmount}();
        require(success, "Transfer failed.");

        emit FeesWithdrawn(feeAmount);
    }
}
