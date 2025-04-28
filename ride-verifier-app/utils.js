// Used to simulate tag scans in UI due to lack of NFC support in Expo Go
export const tag3payload = {
  tagId: "BUS_001_STOP_003",
  timestamp: 1745008932,
  user: "0x1eC46730C4Fa540a62d1Bb7F9D99b0C687a03eD9",
  stop: "3",
  bus: "1",
  sig: "0x846b00f3041d8dfce3ae30ea42b0f11f76aaedba5915bb91ad0535f6b5c515b9444e155b3814227a24eb9fc9abe2856df58504d39e0858e7996e93a6d3e512521c",
};

export const tag1payload = {
  tagId: "BUS_001_STOP_001",
  timestamp: 1745008872,
  user: "0x1eC46730C4Fa540a62d1Bb7F9D99b0C687a03eD9",
  stop: "1",
  bus: "1",
  sig: "0xc81ed4b3ed9b3290a5fa595e03d934d0cff57379ab4462ba19d1945c46cdb3296c23ebea063bdda078ede9f95e173c551ec6f4b6fbebb39829c9f8a9425073301b",
};

// Used by ethers.js to call smart contract
export const rideVerifierABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "greenToken",
    outputs: [
      {
        internalType: "contract GreenToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tagId",
        type: "string",
      },
      {
        internalType: "address",
        name: "publicKey",
        type: "address",
      },
    ],
    name: "setTrustedTag",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "trustedTags",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "usedHashes",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "entryTagId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "entryTimestamp",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "entrySig",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "exitTagId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "exitTimestamp",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "exitSig",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "verifyAndMintTwoTags",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
