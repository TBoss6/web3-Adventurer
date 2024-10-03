import { ethers } from "ethers";
import { encrypt } from "../helpers/encryption_helpers";
import { log } from "../helpers/env_helpers";

export const createSingleWallet = () => {
  const wallet1 = ethers.Wallet.createRandom();
  const seedPhrase = wallet1.mnemonic!.phrase;
  const privateKey1 = wallet1.privateKey;

  const address1 = wallet1.address;

  const wallet = {
    address: address1,
    privateKey: privateKey1,
    mnemonic: seedPhrase
  };
  return wallet;
};

export const createSingleWalletEncrypted = () => {
  const wallet1 = ethers.Wallet.createRandom();
  const seedPhrase = wallet1.mnemonic!.phrase;
  const privateKey1 = wallet1.privateKey;

  const address1 = wallet1.address;

  const wallet = {
    address: address1,
    privateKey: encrypt(privateKey1),
    mnemonic: encrypt(seedPhrase)
  };
  return wallet;
};

log(createSingleWallet());
log("==== best practice ====");
log(createSingleWalletEncrypted());
