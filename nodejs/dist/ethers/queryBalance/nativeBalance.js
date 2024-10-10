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
exports.queryNativeBalance = void 0;
const ethers_1 = require("ethers");
const rpc_1 = require("../../rpc");
const env_helpers_1 = require("../helpers/env_helpers");
const queryNativeBalance = (walletAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new ethers_1.ethers.JsonRpcProvider(rpc_1.testnetJSONRPC.polygonZkEVM);
    // Fetch the balance in the smallest unit (wei for Ethereum)
    const balance = yield provider.getBalance(walletAddress);
    const convertedBalance = ethers_1.ethers.formatEther(balance);
    return convertedBalance;
});
exports.queryNativeBalance = queryNativeBalance;
(0, env_helpers_1.log)("==== fetching wallet's native balance ===");
(0, exports.queryNativeBalance)("0xbfB3508311DF8bDa9D95C86B35AF855af37b8d94").then((response) => {
    (0, env_helpers_1.log)(`Native balance: ${response} ETH`);
});
