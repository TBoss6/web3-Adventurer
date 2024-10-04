import { ethers } from "ethers";
import { testnetJSONRPC } from "../../rpc";
import { tokenABI } from "../erc20TokenABI";
import { convertFromTokenUnits } from "../helpers/converters";
import { log } from "../helpers/env_helpers";

const USDT_TOKEN_ADDRESS = "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06"; // a random testnet usdt token address

export const queryERC20TokenBalance = async (
  walletAddress: string,
  erc20contractAddress: string
) => {
  const provider = new ethers.JsonRpcProvider(testnetJSONRPC.ethereum);

  const tokenContract = new ethers.Contract(
    erc20contractAddress,
    tokenABI,
    provider
  );

  const tokenDecimals = await tokenContract.decimals();
  const amount = await tokenContract.balanceOf(walletAddress);
  const convertedAmount = convertFromTokenUnits(amount, tokenDecimals);

  return convertedAmount;
};

log("==== fetching wallet's token balance ===");
queryERC20TokenBalance(
  "0xFC61d167c74aD1d29aFE457E7758B6C9970E6C28",
  USDT_TOKEN_ADDRESS
).then((response) => {
  log(`${response}`);
});
