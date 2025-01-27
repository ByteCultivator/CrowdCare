// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Governance is Ownable {
    struct Proposal {
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 createdAt;
        uint256 deadline;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    CrowdCareToken public token;

    event ProposalCreated(uint256 indexed proposalId, string description);
    event Voted(uint256 indexed proposalId, address voter, bool support);
    event ProposalExecuted(uint256 indexed proposalId, bool success);

    constructor(CrowdCareToken _token) {
        token = _token;
    }

    function createProposal(string calldata description) external onlyOwner {
        proposals[proposalCount] = Proposal({
            description: description,
            votesFor: 0,
            votesAgainst: 0,
            createdAt: block.timestamp,
            deadline: block.timestamp + 7 days,
            executed: false
        });
        emit ProposalCreated(proposalCount, description);
        proposalCount++;
    }

    function vote(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp <= proposal.deadline, "Voting period has ended.");
        require(token.balanceOf(msg.sender) > 0, "No voting power.");

        uint256 votingPower = token.balanceOf(msg.sender);
        if (support) {
            proposal.votesFor += votingPower;
        } else {
            proposal.votesAgainst += votingPower;
        }
        emit Voted(proposalId, msg.sender, support);
    }

    function executeProposal(uint256 proposalId) external onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp > proposal.deadline, "Voting period not ended.");
        require(!proposal.executed, "Proposal already executed.");

        proposal.executed = true;
        bool success = proposal.votesFor > proposal.votesAgainst;

        emit ProposalExecuted(proposalId, success);
    }
}
