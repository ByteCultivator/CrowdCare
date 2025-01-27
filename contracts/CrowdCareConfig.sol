// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./CrowdCareStructs.sol";

contract CrowdCareConfig {
    uint256 public minDonation;
    uint256 public maxDonation;
    uint256 public minRequest;
    uint256 public maxRequest;
    uint256 public requestFee;
    uint256 public votingPeriod;
    uint256 public claimPeriod;
    uint256 public disputePeriod;
    uint256 public minVotingDonation;
    uint256 public reputationThreshold;

    mapping(CrowdCareStructs.Category => uint256) public categoryLimits;

    constructor() {
        minDonation = 1 ether / 100;
        maxDonation = 1000 ether;
        minRequest = 50 ether / 100;
        maxRequest = 10000 ether;
        requestFee = 1 ether / 1000;
        votingPeriod = 7 days;
        claimPeriod = 30 days;
        disputePeriod = 5 days;
        minVotingDonation = 10 ether / 100;
        reputationThreshold = 100;

        categoryLimits[CrowdCareStructs.Category.Medical] = 10000 ether;
        categoryLimits[CrowdCareStructs.Category.Education] = 5000 ether;
        categoryLimits[CrowdCareStructs.Category.Emergency] = 15000 ether;
        categoryLimits[CrowdCareStructs.Category.Community] = 7500 ether;
        categoryLimits[CrowdCareStructs.Category.Other] = 3000 ether;
    }
}
