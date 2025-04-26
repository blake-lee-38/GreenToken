# GreenToken Ride Verifier

A decentralized prototype application that rewards users with GreenTokens for verifiably using sustainable transportation (e.g. buses or trains). Users scan NFC tags placed on public transit vehicles to prove their entry and exit, and the system mints on-chain tokens as proof of eco-friendly behavior.

---

## 🚀 Project Goals

- Tokenize sustainable activity as on-chain environmental credits
- Use NFC tags to cryptographically verify real-world actions
- Mint reward tokens (GreenTokens) on Ethereum Sepolia testnet
- Ensure security with signature validation and timestamp checks

---

## 🛠 Approach & Key Features

### ✅ Core Components
- **Smart Contracts (Solidity)**
  - `GreenToken.sol`: ERC-20 reward token
  - `RideVerifier.sol`: Verifies ride entry/exit payloads with cryptographic methods, mints GreenTokens

- **React Native Frontend (Expo Go)**
  - Simulates NFC scans and interacts with deployed contracts 
  - Allows users to enter wallet address and view ride status

- **Cryptographic NFC Simulation**
  - Each NFC tag signs a payload (`tagId`, `timestamp`, `user address`)
  - App submits both entry and exit payloads to smart contract to verify a ride

- **Security**
  - Prevents replay attacks via timestamp checks and tracking usedHashes
  - Verifies signatures with trusted tag public keys

---

## 🧪 How to Run the Project

### 💾 Prerequisites
- Node.js & npm
- Hardhat
- Expo CLI
- Alchemy or Infura API key (To deploy to Sepolia)
- Sepolia testnet ETH for deployer wallet (via faucet)

### Deployment Steps: Smart Contracts

- cd ride-verification-dapp
- npx hardhat compile
- npx hardhat run scripts/deploy.js --network sepolia

### Building Steps: Frontend

- cd ride-verifier-app
- npm install
- npx expo start
- Scan QR code with **Expo Go** on iOS or Android device.

### Note

- App is configured to fake NFC tag scans. Real scans can be made with a paid Apple Developer account using the "nfc_function.js" function found in scripts

---

## 🔐 Security Highlights
- NFC Tags sign messages using private key that is never revealed/accessible to user
- User pays gas for minting of GreenToken
- Only the contract owner can register new trusted tags
- RideVerifier checks prevent replay attacks

---

## 📹 Demo Video

[▶️ Watch on Google Drive](https://drive.google.com/file/d/1NjPqKXKHQuCfK8_SAjiXBHKbbQU10V26/view?usp=sharing)



---
