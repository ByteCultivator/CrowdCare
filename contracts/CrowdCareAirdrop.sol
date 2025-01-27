// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Airdrop is Ownable {
    CrowdCareToken public token;

    constructor(CrowdCareToken _token) {
        token = _token;
    }

    function airdrop(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {
        require(recipients.length == amounts.length, "Arrays must have the same length");
        for (uint256 i = 0; i < recipients.length; i++) {
            token.transfer(recipients[i], amounts[i]);
        }
    }
}