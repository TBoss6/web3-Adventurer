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
const USDT_TOKEN_ADDRESS = "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06"; // a random testnet usdt token address
const queryERC20TokenBalance = (walletAddress, erc20contractAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new ethers_1.ethers.JsonRpcProvider(rpc_1.testnetJSONRPC.ethereum);
    const tokenContract = new ethers_1.ethers.Contract(erc20contractAddress, erc20TokenABI_1.tokenABI, provider);
    const tokenDecimals = yield tokenContract.decimals();
    const amount = yield tokenContract.balanceOf(walletAddress);
    const convertedAmount = (0, converters_1.convertFromTokenUnits)(amount, tokenDecimals);
    return convertedAmount;
});
exports.queryERC20TokenBalance = queryERC20TokenBalance;
(0, env_helpers_1.log)("==== fetching wallet's token balance ===");
(0, exports.queryERC20TokenBalance)("0xFC61d167c74aD1d29aFE457E7758B6C9970E6C28", USDT_TOKEN_ADDRESS).then((response) => {
    (0, env_helpers_1.log)(`${response}`);
});
