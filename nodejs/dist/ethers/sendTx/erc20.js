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
const USDT_TOKEN_ADDRESS = "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06"; // a random testnet usdt token address
// you could go over here and mint new testnet USDT tokens for yourself here using the _giveMeATokens (0xf5e3f1f7) method
const sendERC20Token = (toAddress, erc20contractAddress, amount, privateKey) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new ethers_1.ethers.JsonRpcProvider(rpc_1.testnetJSONRPC.ethereum);
    const walletInstance = new ethers_1.ethers.Wallet(privateKey, provider);
    const tokenContract = new ethers_1.ethers.Contract(erc20contractAddress, erc20TokenABI_1.tokenABI, walletInstance);
    const tokenDecimals = yield tokenContract.decimals();
    const convertedAmount = (0, converters_1.convertToTokenUnits)(amount, tokenDecimals);
    const tx = yield tokenContract.transfer(toAddress, convertedAmount);
    return tx.hash;
});
exports.sendERC20Token = sendERC20Token;
(0, exports.sendERC20Token)("0xbfB3508311DF8bDa9D95C86B35AF855af37b8d94", USDT_TOKEN_ADDRESS, "0.2", "0xa888c0e4315a0df2023868fa50ed9255c132e119095bd858eba12ee2a6d03f19").then((response) => {
    (0, env_helpers_1.log)(response);
});
