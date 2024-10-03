import { ethers } from "ethers";

import { log } from "../helpers/env_helpers";
import { testnetJSONRPC } from "../../rpc";
import { decrypt } from "../helpers/encryption_helpers";

export const transferNativeToken = async (
  fromAddress: string,
  toAddress: string,
  amount: number,
  privateKey: string
) => {
  try {
    const provider = new ethers.JsonRpcProvider(testnetJSONRPC.ethereum);
    privateKey = decrypt(privateKey);
    const walletInstance = new ethers.Wallet(privateKey, provider);

    const tx = await walletInstance.sendTransaction({
      to: toAddress,
      value: ethers.parseEther(amount.toString())
    });
    return tx.hash;
  } catch (error: any) {
    log("================ error making transfer =============");
    log(error.info);
    throw error.info || new Error("😵‍💫");
  }
};

export const transferERC20Token = async () => {};
