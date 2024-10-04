import { ethers } from "ethers";
import { testnetJSONRPC } from "../../rpc";
import { tokenABI } from "../erc20TokenABI";
import { convertToTokenUnits } from "../helpers/converters";
import { log } from "../helpers/env_helpers";

const USDT_TOKEN_ADDRESS = "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06"; // a random testnet usdt token address
// you could go over here and mint new testnet USDT tokens for yourself here using the _giveMeATokens (0xf5e3f1f7) method

export const sendERC20Token = async (
  toAddress: string,
  erc20contractAddress: string,
  amount: string,
  privateKey: string
) => {
  const provider = new ethers.JsonRpcProvider(testnetJSONRPC.ethereum);

  const walletInstance = new ethers.Wallet(privateKey, provider);
  const tokenContract = new ethers.Contract(
    erc20contractAddress,
    tokenABI,
    walletInstance
  );

  const tokenDecimals = await tokenContract.decimals();
  const convertedAmount = convertToTokenUnits(amount, tokenDecimals);

  const tx = await tokenContract.transfer(toAddress, convertedAmount);
  return tx.hash;
};

sendERC20Token(
  "0xbfB3508311DF8bDa9D95C86B35AF855af37b8d94",
  USDT_TOKEN_ADDRESS,
  "0.2",
  "0xa888c0e4315a0df2023868fa50ed9255c132e119095bd858eba12ee2a6d03f19"
).then((response) => {
  log(response);
});
