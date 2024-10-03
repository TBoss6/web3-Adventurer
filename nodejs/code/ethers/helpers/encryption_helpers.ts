import crypto from "crypto";
import { INIT_VECTOR, SECRET_INIT } from "./env_helpers";

const secret = SECRET_INIT ?? "";
const initVector = INIT_VECTOR ?? "";

export const encrypt = (mnemonic: string) => {
  const cipher = crypto.createCipheriv("aes256", secret, initVector);
  const mnemonic_e =
    cipher.update(mnemonic, "utf8", "hex") + cipher.final("hex");

  return mnemonic_e;
};

export const decrypt = (encrypted: string) => {
  let decipher = crypto.createDecipheriv("aes256", secret, initVector);
  let word =
    decipher.update(encrypted.toString(), "hex", "utf8") +
    decipher.final("utf8");

  return word;
};
