// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/utils/math/Math.sol";


contract Staking is Ownable {
    struct Stake {
        uint256 amount;
        uint256 stakedAt;
    }

    mapping(address => Stake) public stakedBalances;
    uint256 public rewardRate = 5; // 5% annual reward rate
    uint256 public vestingPeriod = 365 days;

    CrowdCareToken public token;

    constructor(CrowdCareToken _token) {
        token = _token;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero.");
        require(token.balanceOf(msg.sender) >= amount, "Insufficient token balance.");

        if (stakedBalances[msg.sender].amount > 0) {
            claimRewards();
        }

        token.transferFrom(msg.sender, address(this), amount);
        stakedBalances[msg.sender] = Stake({
            amount: stakedBalances[msg.sender].amount + amount,
            stakedAt: block.timestamp
        });
    }

    function claimRewards() public {
        Stake storage stakeInfo = stakedBalances[msg.sender];
        require(stakeInfo.amount > 0, "No staked tokens.");

        uint256 stakingDuration = block.timestamp - stakeInfo.stakedAt;
        uint256 reward = (stakeInfo.amount * rewardRate * stakingDuration) / (vestingPeriod * 100);

        stakeInfo.stakedAt = block.timestamp;
        token.mint(msg.sender, reward);
    }

    function unstake() external {
        Stake storage stakeInfo = stakedBalances[msg.sender];
        require(stakeInfo.amount > 0, "No staked tokens.");

        claimRewards();
        uint256 amount = stakeInfo.amount;
        stakeInfo.amount = 0;

        token.transfer(msg.sender, amount);
    }
}