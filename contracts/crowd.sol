// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CrowdCare is ReentrancyGuard, Pausable, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    // Structs
    struct User {
        string profileMetadata;    // IPFS hash of profile data
        uint256 lastRequestTime;   // Timestamp of last fund request
        uint256 totalDonated;     // Total amount donated
        bool isRegistered;
    }
    
    struct FundRequest {
        address requester;
        uint256 amount;
        string purpose;           // IPFS hash of request details
        uint256 votingEndTime;
        uint256 yesVotes;
        uint256 noVotes;
        bool isApproved;
        bool isClaimed;
        mapping(address => bool) hasVoted;
    }
    
    // State variables
    mapping(address => User) public users;
    mapping(uint256 => FundRequest) public fundRequests;
    uint256 public requestCount;
    uint256 public minDonation = 1 ether / 100;    // $1 equivalent
    uint256 public minRequest = 50 ether / 100;     // $50 equivalent
    uint256 public requestFee = 1 ether / 1000;     // $0.10 equivalent
    uint256 public votingPeriod = 7 days;
    uint256 public minVotingDonation = 10 ether / 100; // $10 equivalent
    uint256 public totalFunds;    // Track total funds in the contract
    
    // Events
    event UserRegistered(address indexed user, string profileMetadata);
    event DonationReceived(address indexed donor, uint256 amount, uint256 newTotalFunds);
    event FundRequestCreated(uint256 indexed requestId, address requester, uint256 amount);
    event VoteCast(uint256 indexed requestId, address voter, bool support);
    event FundsClaimed(uint256 indexed requestId, address requester, uint256 amount, uint256 newTotalFunds);
    event FundsReceived(address indexed from, uint256 amount, uint256 newTotalFunds);
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    // View total balance
    function getTotalFunds() public view returns (uint256) {
        return address(this).balance;
    }
    
    // View contract statistics
    function getContractStats() public view returns (
        uint256 _totalFunds,
        uint256 _totalRequests,
        uint256 _minDonation,
        uint256 _minRequest
    ) {
        return (
            address(this).balance,
            requestCount,
            minDonation,
            minRequest
        );
    }
    
    // User Registration
    function registerUser(string calldata _profileMetadata) external {
        require(!users[msg.sender].isRegistered, "Already registered");
        
        users[msg.sender] = User({
            profileMetadata: _profileMetadata,
            lastRequestTime: 0,
            totalDonated: 0,
            isRegistered: true
        });
        
        emit UserRegistered(msg.sender, _profileMetadata);
    }
    
    // Donation Function
    function donate() external payable nonReentrant whenNotPaused {
        require(msg.value >= minDonation, "Donation below minimum");
        
        User storage donor = users[msg.sender];
        donor.totalDonated += msg.value;
        totalFunds += msg.value;
        
        emit DonationReceived(msg.sender, msg.value, totalFunds);
    }
    
    // Create Fund Request
    function createFundRequest(uint256 _amount, string calldata _purpose) 
        external 
        payable 
        nonReentrant 
        whenNotPaused 
    {
        require(users[msg.sender].isRegistered, "User not registered");
        require(msg.value == requestFee, "Incorrect request fee");
        require(_amount >= minRequest, "Request below minimum");
        require(
            block.timestamp >= users[msg.sender].lastRequestTime + 365 days,
            "Too soon for new request"
        );
        
        uint256 requestId = requestCount++;
        FundRequest storage request = fundRequests[requestId];
        request.requester = msg.sender;
        request.amount = _amount;
        request.purpose = _purpose;
        request.votingEndTime = block.timestamp + votingPeriod;
        
        users[msg.sender].lastRequestTime = block.timestamp;
        totalFunds += msg.value; // Add request fee to total funds
        
        emit FundRequestCreated(requestId, msg.sender, _amount);
    }
    
    // Vote on Request
    function vote(uint256 _requestId, bool _support) 
        external 
        nonReentrant 
        whenNotPaused 
    {
        require(users[msg.sender].totalDonated >= minVotingDonation, "Insufficient donation history");
        
        FundRequest storage request = fundRequests[_requestId];
        require(block.timestamp <= request.votingEndTime, "Voting period ended");
        require(!request.hasVoted[msg.sender], "Already voted");
        
        request.hasVoted[msg.sender] = true;
        
        if (_support) {
            request.yesVotes++;
        } else {
            request.noVotes++;
        }
        
        if (block.timestamp >= request.votingEndTime) {
            request.isApproved = request.yesVotes > request.noVotes;
        }
        
        emit VoteCast(_requestId, msg.sender, _support);
    }
    
    // Claim Approved Funds
    function claimFunds(uint256 _requestId) 
        external 
        nonReentrant 
        whenNotPaused 
    {
        FundRequest storage request = fundRequests[_requestId];
        require(msg.sender == request.requester, "Not requester");
        require(block.timestamp > request.votingEndTime, "Voting ongoing");
        require(request.isApproved, "Request not approved");
        require(!request.isClaimed, "Already claimed");
        require(address(this).balance >= request.amount, "Insufficient funds");
        
        request.isClaimed = true;
        totalFunds -= request.amount;
        
        (bool success, ) = payable(msg.sender).call{value: request.amount}("");
        require(success, "Transfer failed");
        
        emit FundsClaimed(_requestId, msg.sender, request.amount, totalFunds);
    }
    
    // Admin Functions
    function updateMinimums(
        uint256 _minDonation,
        uint256 _minRequest,
        uint256 _requestFee,
        uint256 _minVotingDonation
    ) external onlyRole(ADMIN_ROLE) {
        minDonation = _minDonation;
        minRequest = _minRequest;
        requestFee = _requestFee;
        minVotingDonation = _minVotingDonation;
    }
    
    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }
    
    // Emergency withdrawal
    function emergencyWithdraw() external onlyRole(ADMIN_ROLE) {
        uint256 balance = address(this).balance;
        totalFunds = 0;
        payable(msg.sender).transfer(balance);
    }
    
    receive() external payable {
        totalFunds += msg.value;
        emit FundsReceived(msg.sender, msg.value, totalFunds);
    }
}
