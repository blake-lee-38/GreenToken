import { Wallet } from "ethers";

const newWallet = Wallet.createRandom();
console.log("Address:", newWallet.address);
console.log("Private Key:", newWallet.privateKey);
