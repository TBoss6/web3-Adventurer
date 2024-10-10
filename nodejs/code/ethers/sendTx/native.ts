import { ethers } from "ethers";

import { log } from "../helpers/env_helpers";
import { testnetJSONRPC } from "../../rpc";
import { decrypt } from "../helpers/encryption_helpers";

export const transferNativeToken = async (
  toAddress: string,
  amount: number,
  privateKey: string
) => {
  try {
    const provider = new ethers.JsonRpcProvider(testnetJSONRPC.polygonZkEVM);
    privateKey = decrypt(privateKey);

    const walletInstance = new ethers.Wallet(privateKey, provider);

    const tx = await walletInstance.sendTransaction({
      to: toAddress,
      value: ethers.parseEther(amount.toString())
    });
    return tx.hash;
  } catch (error: any) {
    log("================ error making transfer =============");
    log(error);
    throw error.info ?? new Error("😵‍💫");
  }
};

transferNativeToken(
  "0xe4f7A744ebA25E8E5D9930eb5d4F6DD2a2268612",
  0.001,
  "bb60ccba04234d6cfa1f3a2a3c618f1bc4c14931b40c2183cb1dc2c3329844279191d4ba451d3e7bec825f4d0741da4258594c4c849d1b05e2d622c3ebc2f71712d74481a7d2d5c5aa5bdbbcd1e12719"
).then((response) => {
  console.log(response);
});
