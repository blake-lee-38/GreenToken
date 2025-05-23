// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./GreenToken.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract RideVerifier is Ownable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    GreenToken public greenToken;
    mapping(bytes32 => bool) public usedHashes;
    mapping(string => address) public trustedTags;

    constructor(address _token) Ownable(msg.sender) {
        greenToken = GreenToken(_token);
    }

    // Function to set trusted tags for later verification (tagId -> publicKey mapping)
    // Can only be called by the contract owner
    function setTrustedTag(
        string memory tagId,
        address publicKey
    ) external onlyOwner {
        trustedTags[tagId] = publicKey;
    }

    function verifyAndMintTwoTags(
        string memory entryTagId,
        uint256 entryTimestamp,
        bytes memory entrySig,
        string memory exitTagId,
        uint256 exitTimestamp,
        bytes memory exitSig,
        address user
    ) public {
        // 1. Ensure exit time is greater (later) than entry time
        require(exitTimestamp > entryTimestamp, "Invalid timestamps");

        // 2. Use trustedTags to retrieve public keys using tag IDs, make sure both are registered/valid
        address entryTrusted = trustedTags[entryTagId];
        address exitTrusted = trustedTags[exitTagId];
        require(
            entryTrusted != address(0) && exitTrusted != address(0),
            "Unregistered tag"
        );

        // 3. Verify Signatures from NFC tags using the public keys
        bytes32 entryMessage = keccak256(
            abi.encodePacked(entryTagId, entryTimestamp, user)
        ).toEthSignedMessageHash();
        bytes32 exitMessage = keccak256(
            abi.encodePacked(exitTagId, exitTimestamp, user)
        ).toEthSignedMessageHash();
        require(
            entryMessage.recover(entrySig) == entryTrusted,
            "Invalid entry tag signature"
        );
        require(
            exitMessage.recover(exitSig) == exitTrusted,
            "Invalid exit tag signature"
        );

        // 4. Check if the hashes have been used (Prevent replay attacks)
        require(!usedHashes[entryMessage], "Entry already used");
        require(!usedHashes[exitMessage], "Exit already used");
        usedHashes[entryMessage] = true;
        usedHashes[exitMessage] = true;

        // 5. Verification successful, mint GreenToken to user
        greenToken.mint(user, 10 * 1e18);
    }
}
