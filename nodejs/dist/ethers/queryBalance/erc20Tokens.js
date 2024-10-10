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
exports.queryERC20TokenBalance = void 0;
const ethers_1 = require("ethers");
const rpc_1 = require("../../rpc");
const erc20TokenABI_1 = require("../erc20TokenABI");
const converters_1 = require("../helpers/converters");
const env_helpers_1 = require("../helpers/env_helpers");
const INSPIRATION_TOKEN_ADDRESS = "0xb943f76d0ABe6852FA34e7238F2b47Afbd610ca7"; // a random testnet  token address i created and deployed on Polygon zkevm
// you could go over here and mint new testnet Inspi tokens for yourself here using the mint method, Ive tweaked it to nmake mint free for everone
const queryERC20TokenBalance = (walletAddress, erc20contractAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new ethers_1.ethers.JsonRpcProvider(rpc_1.testnetJSONRPC.polygonZkEVM);
    const tokenContract = new ethers_1.ethers.Contract(erc20contractAddress, erc20TokenABI_1.tokenABI, provider);
    const tokenDecimals = yield tokenContract.decimals();
    const batchRequest = yield Promise.all([
        tokenContract.balanceOf(walletAddress),
        tokenContract.name()
    ]);
    const amount = batchRequest[0];
    const tokenName = batchRequest[1];
    const convertedAmount = (0, converters_1.convertFromTokenUnits)(amount, tokenDecimals);
    return { convertedAmount, tokenName };
});
exports.queryERC20TokenBalance = queryERC20TokenBalance;
(0, env_helpers_1.log)("==== fetching wallet's token balance ===");
(0, exports.queryERC20TokenBalance)("0xbfB3508311DF8bDa9D95C86B35AF855af37b8d94", INSPIRATION_TOKEN_ADDRESS)
    .then((response) => {
    (0, env_helpers_1.log)(`${response.convertedAmount} ${response.tokenName} Tokens`);
})
    .catch((error) => {
    (0, env_helpers_1.log)("error occured fetching erc20 balance");
    (0, env_helpers_1.log)(error);
});
