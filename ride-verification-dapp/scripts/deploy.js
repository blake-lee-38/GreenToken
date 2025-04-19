/*
Hardhat deployment script for GreenToken and RideVerifier smart contracts
*/
const hre = require("hardhat");

async function main() {
  // Deployer = Owner of Contracts (Used random test wallet loaded with Sepolia ETH)
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  // 1. Deploy GreenToken
  const GreenToken = await hre.ethers.getContractFactory("GreenToken");
  const greenToken = await GreenToken.deploy();
  await greenToken.waitForDeployment();
  console.log("✅ GreenToken deployed to:", await greenToken.getAddress());

  // 2. Deploy RideVerifier using GreenToken address
  const RideVerifier = await hre.ethers.getContractFactory("RideVerifier");
  const rideVerifier = await RideVerifier.deploy(await greenToken.getAddress());
  await rideVerifier.waitForDeployment();
  console.log("✅ RideVerifier deployed to:", await rideVerifier.getAddress());

  // 3. Set RideVerifier as a valid minter of GreenToken
  const tx = await greenToken.setMinter(await rideVerifier.getAddress(), true);
  await tx.wait();
  console.log("✅ RideVerifier is now a minter of GreenToken");

  // 4. Set trustedTags in RideVerifier (Map Tag IDs to their respective addresses for verification)
  await rideVerifier.setTrustedTag(
    "BUS_001_STOP_001",
    "0x859E04E3d990523b4B52cE591169A8FA0d9a176f"
  );
  await rideVerifier.setTrustedTag(
    "BUS_001_STOP_003",
    "0x1eC46730C4Fa540a62d1Bb7F9D99b0C687a03eD9"
  );
  console.log("✅ Trusted tags set in RideVerifier");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
