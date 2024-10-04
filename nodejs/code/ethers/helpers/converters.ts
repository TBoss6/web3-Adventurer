import { BigNumberish, ethers } from "ethers";

/**
 * Converts a human-readable token amount to the smallest unit.
 * @param amount - The human-readable amount (e.g., 0.2 for USDC)
 * @param decimals - The number of decimals the token uses (e.g., 6 for USDC)
 * @returns The amount in the smallest unit (as a BigNumber)
 */
const convertToTokenUnits = (
  amount: string,
  decimals: number
): BigNumberish => {
  return ethers.parseUnits(amount, decimals);
};

/**
 * Converts an amount from the smallest unit to human-readable format.
 * @param amount - The amount in the smallest unit (as a BigNumber)
 * @param decimals - The number of decimals the token uses (e.g., 6 for USDC)
 * @returns The human-readable token amount (as a string)
 */
const convertFromTokenUnits = (
  amount: BigNumberish,
  decimals: number
): string => {
  return ethers.formatUnits(amount, decimals);
};

export { convertFromTokenUnits, convertToTokenUnits };
