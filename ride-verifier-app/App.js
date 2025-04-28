import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  Wallet,
  JsonRpcProvider,
  Contract,
  getBytes,
  solidityPackedKeccak256,
} from "ethers";
import { tag1payload, tag3payload, rideVerifierABI } from "./utils";

// Constants used for demonstration
const CONTRACT_ADDRESS = "";
const USER_PRIVATE_KEY = "";
const ALCHEMY_SEPOLIA = "";
const CONTRACT_ABI = rideVerifierABI;

export default function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletComplete, setWalletComplete] = useState(false);
  const [status, setStatus] = useState("Enter your wallet address to begin.");
  const [entrancePayload, setEntrancePayload] = useState(null);
  const [onBus, setOnBus] = useState(false);
  const [loading, setLoading] = useState(false);

  const simulateTagScan = async (isExit = false) => {
    setLoading(true);

    // Simulate a delay to mimic the time taken for a real scan
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate tag scans using preloaded payloads
    const payload = isExit ? tag3payload : tag1payload;
    const { tagId, timestamp, user, stop, bus, sig } = payload;

    // When first entering bus, just set entrance payload and status
    if (!isExit) {
      setEntrancePayload(payload);
      setOnBus(true);
      setStatus(
        `🚌 You are currently riding Bus ${bus}, you got on at stop ${stop}`
      );
      setLoading(false);
    } else {
      // When exiting bus, make sure entrance payload exists, then send both to smart contract
      if (!entrancePayload) {
        Alert.alert(
          "Missing Entrance Scan",
          "Please scan the entrance tag first."
        );
        setLoading(false);
        return;
      }

      setStatus(
        `🔄 Verifying your ride from stop ${entrancePayload.stop} to stop ${payload.stop} and minting GreenTokens...`
      );

      // Verify ride using smart contract -> User calls contract and therefore pays gas fee
      try {
        const provider = new JsonRpcProvider(ALCHEMY_SEPOLIA);
        const signer = new Wallet(USER_PRIVATE_KEY, provider);
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        await contract.verifyAndMintTwoTags(
          entrancePayload.tagId,
          entrancePayload.timestamp,
          entrancePayload.sig,
          payload.tagId,
          payload.timestamp,
          payload.sig,
          user
        );
        setStatus("✅ Ride verified and GreenTokens minted!");
        setEntrancePayload(null);
        setOnBus(false);
      } catch (err) {
        // Alert user of error both in UI and with popup alert
        setStatus("❌ Verification failed");
        Alert.alert("Transaction failed", err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
  };

  // Default screen: Wait for user to enter wallet address
  if (!walletComplete) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎟 Enter Wallet Address</Text>
        <TextInput
          style={styles.input}
          placeholder="0x..."
          value={walletAddress}
          onChangeText={setWalletAddress}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button
          title="Start Ride"
          onPress={() => {
            setStatus("Ready to scan entrance tag.");
            setWalletComplete(true);
          }}
        />
        <Text style={styles.status}>{status}</Text>
      </View>
    );
  }

  // Main screen: User has entered wallet address and is ready to scan tags
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚇 Ride Verifier</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title={
            entrancePayload ? "Simulate Exit Tag" : "Simulate Entrance Tag"
          }
          onPress={() => simulateTagScan(onBus)}
        />
      )}
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
  status: {
    marginTop: 20,
    fontSize: 16,
  },
  input: {
    width: 280,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
});
