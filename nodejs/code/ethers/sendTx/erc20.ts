import { ethers } from "ethers";
import { testnetJSONRPC } from "../../rpc";
import { tokenABI } from "../erc20TokenABI";
import { convertToTokenUnits } from "../helpers/converters";
import { log } from "../helpers/env_helpers";

const INSPIRATION_TOKEN_ADDRESS = "0xb943f76d0ABe6852FA34e7238F2b47Afbd610ca7"; // a random testnet  token address i created and deployed on Polygon zkevm
// you could go over here and mint new testnet Inspi tokens for yourself here using the mint method, Ive tweaked it to nmake mint free for everone

export const sendERC20Token = async (
  toAddress: string,
  erc20contractAddress: string,
  amount: string,
  privateKey: string
) => {
  const provider = new ethers.JsonRpcProvider(testnetJSONRPC.polygonZkEVM);

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
  "0xe4f7A744ebA25E8E5D9930eb5d4F6DD2a2268612",
  INSPIRATION_TOKEN_ADDRESS,
  "0.2",
  "0xe84091b88b3a4060ef7876d52b89718e40c036c688acb65bb9ff12b9c7f6f78c"
)
  .then((response) => {
    log(response);
  })
  .catch((error) => {
    log("error occured sending erc20 tx");
    log(error);
  });
