// Setup: npm install alchemy-sdk
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
const { Network, Alchemy } = require("alchemy-sdk");

// Optional config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "", // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with your network.
};
const alchemy = new Alchemy(settings);

alchemy.core.getBlock(15221026).then(console.log);
