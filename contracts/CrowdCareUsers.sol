// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./CrowdCareStructs.sol";

contract CrowdCareUsers is CrowdCareStructs {
    mapping(address => User) public users;

    event UserRegistered(address indexed user, string profileMetadata);
    event ReputationUpdated(address indexed user, uint256 newReputation);

    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "User is not registered.");
        _;
    }

    function registerUser(string calldata profileMetadata) external {
        require(!users[msg.sender].isRegistered, "User already registered.");

        User storage user = users[msg.sender];
        user.profileMetadata = profileMetadata;
        user.isRegistered = true;

        emit UserRegistered(msg.sender, profileMetadata);
    }

    function updateReputation(address user, uint256 amount, bool increase) internal {
        require(users[user].isRegistered, "User is not registered.");

        User storage u = users[user];
        if (increase) {
            u.reputation += amount;
        } else {
            u.reputation = u.reputation > amount ? u.reputation - amount : 0;
        }

        emit ReputationUpdated(user, u.reputation);
    }
}
