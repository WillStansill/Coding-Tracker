// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StudyTracker {
    address public owner;
    uint256 public lastStudiedTimestamp;
    uint256 public totalStudyTime;
    bool public isStudySessionActive;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    event StudySessionCompleted(address indexed user, uint256 timeStudied);

    constructor() {
        owner = msg.sender;
        lastStudiedTimestamp = block.timestamp;
    }

    function startStudySession() external onlyOwner {
        require(!isStudySessionActive, "Study session is already active");
        lastStudiedTimestamp = block.timestamp;
        isStudySessionActive = true;
    }

    function endStudySession() external onlyOwner {
        require(isStudySessionActive, "No active study session");
        uint256 currentTime = block.timestamp;
        uint256 studyDuration = currentTime - lastStudiedTimestamp;
        totalStudyTime += studyDuration;

        emit StudySessionCompleted(msg.sender, studyDuration);

        isStudySessionActive = false;
    }

    function getTotalStudyTime() external view returns (uint256) {
        return totalStudyTime;
    }

    function isSessionActive() external view returns (bool) {
        return isStudySessionActive;
    }
}
