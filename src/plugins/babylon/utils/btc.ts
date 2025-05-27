import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";
import { initEccLib } from "bitcoinjs-lib";

import { NO_COORD_PK_BYTE_LENGTH } from "../constants/keys";

// Initialize elliptic curve library
export const initBTCCurve = () => {
  initEccLib(ecc);
};

/**
 * Get the public key without the coordinate.
 *
 * @param {string} pkHex - The public key in hex, with or without the coordinate.
 * @returns {string} - The public key without the coordinate in hex.
 * @throws {Error} - If the public key is invalid.
 */
export const getPublicKeyNoCoord = (pkHex: string): string => {
  const publicKey = Buffer.from(pkHex, "hex");

  const publicKeyNoCoordBuffer =
    publicKey.length === NO_COORD_PK_BYTE_LENGTH
      ? publicKey
      : publicKey.subarray(1, 33);

  // Validate the public key without coordinate
  if (!validateNoCoordPublicKeyBuffer(publicKeyNoCoordBuffer)) {
    throw new Error("Invalid public key without coordinate");
  }

  return publicKeyNoCoordBuffer.toString("hex");
};

const validateNoCoordPublicKeyBuffer = (pkBuffer: Buffer): boolean => {
  if (pkBuffer.length !== NO_COORD_PK_BYTE_LENGTH) {
    return false;
  }

  // Try both compressed forms: y-coordinate even (0x02) and y-coordinate odd (0x03)
  const compressedKeyEven = Buffer.concat([Buffer.from([0x02]), pkBuffer]);
  const compressedKeyOdd = Buffer.concat([Buffer.from([0x03]), pkBuffer]);

  return ecc.isPoint(compressedKeyEven) || ecc.isPoint(compressedKeyOdd);
};
