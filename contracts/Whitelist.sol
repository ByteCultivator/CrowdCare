// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Whitelist is Ownable {
    mapping(address => bool) public whitelist;

    function addToWhitelist(address account) external onlyOwner {
        whitelist[account] = true;
    }

    function removeFromWhitelist(address account) external onlyOwner {
        whitelist[account] = false;
    }

    modifier onlyWhitelisted() {
        require(whitelist[msg.sender], "Not whitelisted.");
        _;
    }
}