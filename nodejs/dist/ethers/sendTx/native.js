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
exports.transferNativeToken = void 0;
const ethers_1 = require("ethers");
const env_helpers_1 = require("../helpers/env_helpers");
const rpc_1 = require("../../rpc");
const encryption_helpers_1 = require("../helpers/encryption_helpers");
const transferNativeToken = (toAddress, amount, privateKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provider = new ethers_1.ethers.JsonRpcProvider(rpc_1.testnetJSONRPC.ethereum);
        privateKey = (0, encryption_helpers_1.decrypt)(privateKey);
        const walletInstance = new ethers_1.ethers.Wallet(privateKey, provider);
        const tx = yield walletInstance.sendTransaction({
            to: toAddress,
            value: ethers_1.ethers.parseEther(amount.toString())
        });
        return tx.hash;
    }
    catch (error) {
        (0, env_helpers_1.log)("================ error making transfer =============");
        (0, env_helpers_1.log)(error.info);
        throw error.info || new Error("😵‍💫");
    }
});
exports.transferNativeToken = transferNativeToken;
