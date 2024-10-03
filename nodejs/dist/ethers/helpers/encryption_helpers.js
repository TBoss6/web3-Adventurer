"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const env_helpers_1 = require("./env_helpers");
const secret = env_helpers_1.SECRET_INIT !== null && env_helpers_1.SECRET_INIT !== void 0 ? env_helpers_1.SECRET_INIT : "";
const initVector = env_helpers_1.INIT_VECTOR !== null && env_helpers_1.INIT_VECTOR !== void 0 ? env_helpers_1.INIT_VECTOR : "";
const encrypt = (mnemonic) => {
    const cipher = crypto_1.default.createCipheriv("aes256", secret, initVector);
    const mnemonic_e = cipher.update(mnemonic, "utf8", "hex") + cipher.final("hex");
    return mnemonic_e;
};
exports.encrypt = encrypt;
const decrypt = (encrypted) => {
    let decipher = crypto_1.default.createDecipheriv("aes256", secret, initVector);
    let word = decipher.update(encrypted.toString(), "hex", "utf8") +
        decipher.final("utf8");
    return word;
};
exports.decrypt = decrypt;
