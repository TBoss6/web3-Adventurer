import { ethers } from "ethers";
import { testnetJSONRPC } from "../../rpc";
import { log } from "../helpers/env_helpers";

export const queryNativeBalance = async (walletAddress: string) => {
  const provider = new ethers.JsonRpcProvider(testnetJSONRPC.ethereum);

  // Fetch the balance in the smallest unit (wei for Ethereum)
  const balance = await provider.getBalance(walletAddress);
  const convertedBalance = ethers.formatEther(balance);

  return convertedBalance;
};

log("==== fetching wallet's native balance ===");
queryNativeBalance("0xFC61d167c74aD1d29aFE457E7758B6C9970E6C28").then(
  (response) => {
    log(`Native balance: ${response} ETH`);
  }
);
