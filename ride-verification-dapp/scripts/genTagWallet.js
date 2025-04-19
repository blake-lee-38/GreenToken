/*
Used to generate random wallet for NFC tags:
- Tags hold private key for signing messages
- Contracts hold public key for verifying messages
*/
const { Wallet } = require("ethers");

const wallet = Wallet.createRandom();
console.log("Simulated Tag Wallet:");
console.log("  Address:", wallet.address);
console.log("  Private Key:", wallet.privateKey);
