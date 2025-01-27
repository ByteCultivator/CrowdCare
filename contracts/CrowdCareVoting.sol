// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./CrowdCareStructs.sol";
import "./CrowdCareRequests.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";


contract CrowdCareVoting is CrowdCareRequests {
    using Math for uint256;

    event VoteCast(uint256 indexed requestId, address indexed voter, bool support, uint256 power);

    modifier onlyActiveRequest(uint256 requestId) {
        require(fundRequests[requestId].status == RequestStatus.Active, "Request not active for voting.");
        require(block.timestamp <= fundRequests[requestId].votingEndTime, "Voting period has ended.");
        _;
    }

    function calculateVotingPower(uint256 amount) public pure returns (uint256) {
        return amount.sqrt();
    }

    function vote(uint256 requestId, bool support) external onlyActiveRequest(requestId) onlyRegistered {
        FundRequest storage request = fundRequests[requestId];
        User storage voter = users[msg.sender];

        require(!request.votes[msg.sender].hasVoted, "Already voted.");
        require(voter.donations[requestId] >= minVotingDonation, "Insufficient donation to vote.");

        uint256 power = calculateVotingPower(voter.donations[requestId]);

        request.votes[msg.sender] = Vote({
            hasVoted: true,
            support: support,
            power: power
        });

        if (support) {
            request.yesVotes += 1;
            request.votingPower += power;
        } else {
            request.noVotes += 1;
            request.votingPower -= power;
        }

        emit VoteCast(requestId, msg.sender, support, power);
    }
}
