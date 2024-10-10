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
    var _a;
    try {
        const provider = new ethers_1.ethers.JsonRpcProvider(rpc_1.testnetJSONRPC.polygonZkEVM);
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
        (0, env_helpers_1.log)(error);
        throw (_a = error.info) !== null && _a !== void 0 ? _a : new Error("😵‍💫");
    }
});
exports.transferNativeToken = transferNativeToken;
(0, exports.transferNativeToken)("0xe4f7A744ebA25E8E5D9930eb5d4F6DD2a2268612", 0.001, "bb60ccba04234d6cfa1f3a2a3c618f1bc4c14931b40c2183cb1dc2c3329844279191d4ba451d3e7bec825f4d0741da4258594c4c849d1b05e2d622c3ebc2f71712d74481a7d2d5c5aa5bdbbcd1e12719").then((response) => {
    console.log(response);
});
