const { Wallet } = require("ethers");

const wallet = Wallet.createRandom();
console.log("🆕 Simulated Tag Wallet:");
console.log("  Address:", wallet.address);
console.log("  Private Key:", wallet.privateKey);
