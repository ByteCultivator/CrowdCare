// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./CrowdCareConfig.sol";
import "./CrowdCareUsers.sol";
import "./CrowdCareRequests.sol";
import "./CrowdCareVoting.sol";
import "./CrowdCareDisputes.sol";
import "./CrowdCareFunds.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CrowdCare is
    CrowdCareConfig,
    CrowdCareUsers,
    CrowdCareRequests,
    CrowdCareVoting,
    CrowdCareDisputes,
    CrowdCareFunds,
    ReentrancyGuard,
    Pausable,
    AccessControl
{
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        _setupRole(MODERATOR_ROLE, msg.sender);
    }

    function emergencyWithdraw() external onlyRole(ADMIN_ROLE) {
        uint256 balance = address(this).balance;
        totalFunds = 0;
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "Transfer failed");
        emit EmergencyWithdrawal(balance);
    }
}
