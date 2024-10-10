"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenABI = void 0;
exports.tokenABI = [
    // Standard ERC-20 functions
    "function balanceOf(address account) view returns (uint256)",
    "function transfer(address recipient, uint256 amount) returns (bool)",
    "function decimals() view returns (uint8)",
    "function _decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function _symbol() view returns (string)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function name() view returns (string)"
];
