import { Alert } from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { Wallet, JsonRpcProvider, Contract } from "ethers";

// In a production environment, this code could be used to handle the NFC tag signing
const handleNfcScan = async (isExit = false) => {
  setStatus("📡 Waiting for NFC tag...");
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();
    const payloadText = Ndef.text.decodePayload(tag.ndefMessage[0].payload);
    const parsed = JSON.parse(payloadText);

    if (!isExit) {
      setEntrancePayload(parsed);
      setRidingInfo({
        bus: parsed.bus,
        stop: parsed.stop,
      });
      setStatus(
        `🚌 You are currently riding Bus ${parsed.bus}, you got on at stop ${parsed.stop}`
      );
    } else {
      if (!entrancePayload) {
        Alert.alert(
          "Missing Entrance Scan",
          "Please scan the entrance tag first."
        );
        return;
      }

      setStatus(
        `🔄 Verifying your ride from stop ${entrancePayload.stop} to stop ${parsed.stop} and minting GreenTokens...`
      );

      const provider = new JsonRpcProvider(ALCHEMY_SEPOLIA);
      const signer = new Wallet(TAG_PRIVATE_KEY, provider);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      console.log(parsed, entrancePayload);
      // Later: Pass both payloads to updated contract function
      const tx = await contract.verifyAndMint(
        entrancePayload.tagId,
        entrancePayload.timestamp,
        walletAddress,
        entrancePayload.sig,
        { gasLimit: 300000n }
      );

      await tx.wait();
      setStatus("✅ Ride verified and GreenTokens minted!");
      setEntrancePayload(null);
      setRidingInfo(null);
    }
  } catch (err) {
    console.error("❌ NFC Scan Error:", err);
    setStatus("❌ Scan failed or invalid tag");
    Alert.alert("Scan Error", err.message || "Unknown error");
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
};
