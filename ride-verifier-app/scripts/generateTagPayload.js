import { Wallet, solidityPackedKeccak256, getBytes } from "ethers";
import fs from "fs";

const entryTagWallet = new Wallet("");
const exitTagWallet = new Wallet("");
const user = ""; // Replace with the user's wallet address

const simulateTagPayload = async (
  tagId,
  timestamp,
  user,
  wallet,
  stop,
  bus
) => {
  const hash = solidityPackedKeccak256(
    ["string", "uint256", "address"],
    [tagId, timestamp, user]
  );
  const sig = await wallet.signMessage(getBytes(hash));

  return { tagId, timestamp, user, stop, bus, sig };
};

const now = Math.floor(Date.now() / 1000);

// Usage
const entryPayload = await simulateTagPayload(
  "BUS_001_STOP_001",
  now,
  user,
  entryTagWallet,
  "1",
  "1"
);
const exitPayload = await simulateTagPayload(
  "BUS_001_STOP_003",
  now + 60,
  user,
  exitTagWallet,
  "1",
  "3"
);

fs.writeFileSync(
  "ntag215_payload1.json",
  JSON.stringify(entryPayload, null, 2)
);
fs.writeFileSync("ntag215_payload2.json", JSON.stringify(exitPayload, null, 2));

console.log("✅ Payload written to ntag215_payload.json");
