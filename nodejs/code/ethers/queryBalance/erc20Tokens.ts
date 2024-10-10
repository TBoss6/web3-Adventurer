import { ethers } from "ethers";
import { testnetJSONRPC } from "../../rpc";
import { tokenABI } from "../erc20TokenABI";
import { convertFromTokenUnits } from "../helpers/converters";
import { log } from "../helpers/env_helpers";

const INSPIRATION_TOKEN_ADDRESS = "0xb943f76d0ABe6852FA34e7238F2b47Afbd610ca7"; // a random testnet  token address i created and deployed on Polygon zkevm
// you could go over here and mint new testnet Inspi tokens for yourself here using the mint method, Ive tweaked it to nmake mint free for everone

export const queryERC20TokenBalance = async (
  walletAddress: string,
  erc20contractAddress: string
) => {
  const provider = new ethers.JsonRpcProvider(testnetJSONRPC.polygonZkEVM);

  const tokenContract = new ethers.Contract(
    erc20contractAddress,
    tokenABI,
    provider
  );

  const tokenDecimals = await tokenContract.decimals();
  const batchRequest = await Promise.all([
    tokenContract.balanceOf(walletAddress),
    tokenContract.name()
  ]);
  const amount = batchRequest[0];
  const tokenName = batchRequest[1];
  const convertedAmount = convertFromTokenUnits(amount, tokenDecimals);

  return { convertedAmount, tokenName };
};

log("==== fetching wallet's token balance ===");
queryERC20TokenBalance(
  "0xbfB3508311DF8bDa9D95C86B35AF855af37b8d94",
  INSPIRATION_TOKEN_ADDRESS
)
  .then((response) => {
    log(`${response.convertedAmount} ${response.tokenName} Tokens`);
  })
  .catch((error) => {
    log("error occured fetching erc20 balance");
    log(error);
  });
