// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CrowdCareStructs {
    enum RequestStatus {
        Pending,
        Active,
        Approved,
        Rejected,
        Claimed,
        Cancelled,
        Expired
    }

    enum Category {
        Medical,
        Education,
        Emergency,
        Community,
        Other
    }

    struct User {
        string profileMetadata;
        uint256 lastRequestTime;
        uint256 totalDonated;
        uint256 reputation;
        bool isRegistered;
        mapping(uint256 => uint256) donations;
    }

    struct FundRequest {
        address requester;
        uint256 amount;
        string purpose;
        uint256 createdAt;
        uint256 votingEndTime;
        uint256 claimDeadline;
        uint256 totalDonations;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 votingPower;
        Category category;
        RequestStatus status;
        mapping(address => Vote) votes;
        mapping(address => uint256) donations;
    }

    struct Vote {
        bool hasVoted;
        bool support;
        uint256 power;
    }

    struct Dispute {
        address creator;
        string evidence;
        uint256 createdAt;
        uint256 resolutionDeadline;
        bool resolved;
        mapping(address => bool) moderatorVotes;
        uint256 positiveVotes;
        uint256 negativeVotes;
    }
}
