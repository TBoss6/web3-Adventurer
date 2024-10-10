"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importWalletFromMnemonicBestPractice = exports.importWalletFromPrivateKeyBestPractice = exports.importWalletFromMnemonic = exports.importWalletFromPrivateKey = void 0;
const ethers_1 = require("ethers");
const env_helpers_1 = require("../helpers/env_helpers");
const encryption_helpers_1 = require("../helpers/encryption_helpers");
const importWalletFromPrivateKey = (privateKey) => {
    const wallet = new ethers_1.ethers.Wallet(privateKey);
    const address = wallet.address;
    const privateKey1 = wallet.privateKey;
    // note that you can't access mnemonic since you imported using privateKey 🌝
    const walletDetails = {
        address,
        privateKey: privateKey1,
        encryptedPrivateKey: (0, encryption_helpers_1.encrypt)(privateKey)
    };
    return walletDetails;
};
exports.importWalletFromPrivateKey = importWalletFromPrivateKey;
const importWalletFromMnemonic = (mnemonic) => {
    const wallet = ethers_1.ethers.Wallet.fromPhrase(mnemonic);
    const address = wallet.address;
    // yay 🦸, now you have your mnemonic back and privatekey
    const privateKey = wallet.privateKey;
    const seedPhrase = wallet.mnemonic.phrase;
    const walletDetails = {
        address,
        privateKey,
        mnemonic: seedPhrase,
        encryptedPrivateKey: (0, encryption_helpers_1.encrypt)(privateKey)
    };
    return walletDetails;
};
exports.importWalletFromMnemonic = importWalletFromMnemonic;
// THE MNEMONIC USED HERE IS ... YOU KNOW..JUST BE CAREFUL 🙂.. DONT USE IT ANYWHERE ELSE APART FROM TESTING
(0, env_helpers_1.log)((0, exports.importWalletFromMnemonic)("pill pencil minute stool always sail claw minor extra fresh auction palace"));
(0, env_helpers_1.log)("==== imported using privatekey ====");
(0, env_helpers_1.log)((0, exports.importWalletFromPrivateKey)("0xe84091b88b3a4060ef7876d52b89718e40c036c688acb65bb9ff12b9c7f6f78c"));
// BEST PRACTICEEEEEEEEE
const importWalletFromPrivateKeyBestPractice = (privateKey) => {
    const wallet = new ethers_1.ethers.Wallet((0, encryption_helpers_1.decrypt)(privateKey));
    const address = wallet.address;
    const privateKey1 = wallet.privateKey;
    // note that you can't access mnemonic since you imported using privateKey 🌝
    // I should encrypt privateKey before returning... but that would defeat the revelation 🌝
    const walletDetails = {
        address,
        privateKey: privateKey1,
        encryptedPrivateKey: privateKey
    };
    return walletDetails;
};
exports.importWalletFromPrivateKeyBestPractice = importWalletFromPrivateKeyBestPractice;
const importWalletFromMnemonicBestPractice = (mnemonic) => {
    const wallet = ethers_1.ethers.Wallet.fromPhrase((0, encryption_helpers_1.decrypt)(mnemonic));
    const address = wallet.address;
    // yay 🦸, now you have your mnemonic back and privatekey
    const privateKey = wallet.privateKey;
    const seedPhrase = wallet.mnemonic.phrase;
    // I should encrypt privatekey and mnemonic before returning... but that would defeat the revelation 🌝
    const walletDetails = {
        address,
        privateKey,
        mnemonic: seedPhrase,
        encryptedPrivateKey: (0, encryption_helpers_1.encrypt)(privateKey)
    };
    return walletDetails;
};
exports.importWalletFromMnemonicBestPractice = importWalletFromMnemonicBestPractice;
(0, env_helpers_1.log)("=========== 🔥 Best Practices 🔥🔥🔥🔥🔥🔥🔥 =========== ");
(0, env_helpers_1.log)((0, exports.importWalletFromMnemonicBestPractice)("400ff393738fdc199a52bd73b70a56f8ec4d70ffc83b0fe4fa1a0732777a3a6db121266a0fe61620eb116cccb3d28e1e0aebe9ffcdc79ff2842dd875c421921d2d9fff6edcedaae40f242aa91e1e55ea"));
(0, env_helpers_1.log)("==== imported using privatekey ====");
(0, env_helpers_1.log)((0, exports.importWalletFromPrivateKeyBestPractice)("573ad37c3197813891d6e8c0b90a60fe37662e8d059b050aa226a32a6c69b2ccfdbea4b214f4c7149a4f53f2eac99b9c2ef3e77ef0c07eda6857e9553ca6131e5d62b94d1075e961f4fec7fe5688bc7d"));
