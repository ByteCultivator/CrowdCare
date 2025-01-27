// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./CrowdCareStructs.sol";
import "./CrowdCareVoting.sol";

contract CrowdCareDisputes is CrowdCareVoting {
    mapping(uint256 => Dispute) public disputes;
    uint256 public disputeCount;

    event DisputeCreated(uint256 indexed disputeId, uint256 requestId, address indexed creator);
    event DisputeResolved(uint256 indexed disputeId, bool result);

    modifier onlyActiveDispute(uint256 disputeId) {
        require(!disputes[disputeId].resolved, "Dispute already resolved.");
        require(block.timestamp <= disputes[disputeId].resolutionDeadline, "Dispute resolution deadline passed.");
        _;
    }

    function createDispute(uint256 requestId, string calldata evidence) external {
        FundRequest storage request = fundRequests[requestId];

        require(request.status == RequestStatus.Approved, "Only approved requests can be disputed.");
        require(bytes(evidence).length > 0, "Evidence is required.");

        disputes[disputeCount] = Dispute({
            creator: msg.sender,
            evidence: evidence,
            createdAt: block.timestamp,
            resolutionDeadline: block.timestamp + disputePeriod,
            resolved: false,
            positiveVotes: 0,
            negativeVotes: 0
        });

        emit DisputeCreated(disputeCount, requestId, msg.sender);
        disputeCount++;
    }

    function voteOnDispute(uint256 disputeId, bool support) external onlyActiveDispute(disputeId) onlyModerator {
        Dispute storage dispute = disputes[disputeId];

        require(!dispute.moderatorVotes[msg.sender], "Moderator already voted.");

        dispute.moderatorVotes[msg.sender] = true;

        if (support) {
            dispute.positiveVotes++;
        } else {
            dispute.negativeVotes++;
        }

        // Automatically resolve dispute if majority votes are reached
        uint256 totalModerators = getRoleMemberCount(MODERATOR_ROLE);
        if (dispute.positiveVotes > totalModerators / 2) {
            resolveDispute(disputeId, true);
        } else if (dispute.negativeVotes > totalModerators / 2) {
            resolveDispute(disputeId, false);
        }
    }

    function resolveDispute(uint256 disputeId, bool result) internal {
        Dispute storage dispute = disputes[disputeId];

        dispute.resolved = true;
        emit DisputeResolved(disputeId, result);

        // Apply result logic if necessary (e.g., reversing funds or other actions)
    }
}
