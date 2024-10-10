"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendERC20Token = void 0;
const ethers_1 = require("ethers");
const rpc_1 = require("../../rpc");
const erc20TokenABI_1 = require("../erc20TokenABI");
const converters_1 = require("../helpers/converters");
const env_helpers_1 = require("../helpers/env_helpers");
const INSPIRATION_TOKEN_ADDRESS = "0xb943f76d0ABe6852FA34e7238F2b47Afbd610ca7"; // a random testnet  token address i created and deployed on Polygon zkevm
// you could go over here and mint new testnet Inspi tokens for yourself here using the mint method, Ive tweaked it to nmake mint free for everone
const sendERC20Token = (toAddress, erc20contractAddress, amount, privateKey) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new ethers_1.ethers.JsonRpcProvider(rpc_1.testnetJSONRPC.polygonZkEVM);
    const walletInstance = new ethers_1.ethers.Wallet(privateKey, provider);
    const tokenContract = new ethers_1.ethers.Contract(erc20contractAddress, erc20TokenABI_1.tokenABI, walletInstance);
    const tokenDecimals = yield tokenContract.decimals();
    const convertedAmount = (0, converters_1.convertToTokenUnits)(amount, tokenDecimals);
    const tx = yield tokenContract.transfer(toAddress, convertedAmount);
    return tx.hash;
});
exports.sendERC20Token = sendERC20Token;
(0, exports.sendERC20Token)("0xe4f7A744ebA25E8E5D9930eb5d4F6DD2a2268612", INSPIRATION_TOKEN_ADDRESS, "0.2", "0xe84091b88b3a4060ef7876d52b89718e40c036c688acb65bb9ff12b9c7f6f78c")
    .then((response) => {
    (0, env_helpers_1.log)(response);
})
    .catch((error) => {
    (0, env_helpers_1.log)("error occured sending erc20 tx");
    (0, env_helpers_1.log)(error);
});
