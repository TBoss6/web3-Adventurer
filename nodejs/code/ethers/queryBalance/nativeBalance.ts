import { ethers } from "ethers";
import { testnetJSONRPC } from "../../rpc";
import { log } from "../helpers/env_helpers";

export const queryNativeBalance = async (walletAddress: string) => {
  const provider = new ethers.JsonRpcProvider(testnetJSONRPC.polygonZkEVM);

  // Fetch the balance in the smallest unit (wei for Ethereum)
  const balance = await provider.getBalance(walletAddress);
  const convertedBalance = ethers.formatEther(balance);

  return convertedBalance;
};

log("==== fetching wallet's native balance ===");
queryNativeBalance("0xbfB3508311DF8bDa9D95C86B35AF855af37b8d94").then(
  (response) => {
    log(`Native balance: ${response} ETH`);
  }
);
