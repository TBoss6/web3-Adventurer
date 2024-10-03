"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSingleWalletEncrypted = exports.createSingleWallet = void 0;
const ethers_1 = require("ethers");
const encryption_helpers_1 = require("../helpers/encryption_helpers");
const env_helpers_1 = require("../helpers/env_helpers");
const createSingleWallet = () => {
    const wallet1 = ethers_1.ethers.Wallet.createRandom();
    const seedPhrase = wallet1.mnemonic.phrase;
    const privateKey1 = wallet1.privateKey;
    const address1 = wallet1.address;
    const wallet = {
        address: address1,
        privateKey: privateKey1,
        mnemonic: seedPhrase
    };
    return wallet;
};
exports.createSingleWallet = createSingleWallet;
const createSingleWalletEncrypted = () => {
    const wallet1 = ethers_1.ethers.Wallet.createRandom();
    const seedPhrase = wallet1.mnemonic.phrase;
    const privateKey1 = wallet1.privateKey;
    const address1 = wallet1.address;
    const wallet = {
        address: address1,
        privateKey: (0, encryption_helpers_1.encrypt)(privateKey1),
        mnemonic: (0, encryption_helpers_1.encrypt)(seedPhrase)
    };
    return wallet;
};
exports.createSingleWalletEncrypted = createSingleWalletEncrypted;
(0, env_helpers_1.log)((0, exports.createSingleWallet)());
(0, env_helpers_1.log)("==== best practice ====");
(0, env_helpers_1.log)((0, exports.createSingleWalletEncrypted)());
