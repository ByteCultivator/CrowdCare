// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CrowdCareToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 50_000_000 * 10 ** 18; // 50 million tokens with 18 decimals

    constructor() ERC20("CrowdCareToken", "CCT") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than zero.");
        _mint(to, amount);
    }

    function transferFromContract(address to, uint256 amount) external onlyOwner {
        require(balanceOf(address(this)) >= amount, "Not enough tokens in the contract.");
        _transfer(address(this), to, amount);
    }
}
