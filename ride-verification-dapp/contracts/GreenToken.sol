// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GreenToken is ERC20, Ownable {
    mapping(address => bool) public minters;

    constructor() ERC20("GreenToken", "GREEN") Ownable(msg.sender) {}

    // Set valid minters of GreenToken (RideVerifier contract)
    function setMinter(address minter, bool allowed) external onlyOwner {
        minters[minter] = allowed;
    }

    // Mint GreenToken to user after verifying ride (Check if valid minter)
    function mint(address to, uint256 amount) external {
        require(minters[msg.sender], "Not a minter");
        _mint(to, amount);
    }
}
