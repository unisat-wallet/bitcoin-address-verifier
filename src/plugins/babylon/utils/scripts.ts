import { opcodes, script } from "bitcoinjs-lib";

import { NO_COORD_PK_BYTE_LENGTH } from "../constants/keys";

/**
 * Builds the unbonding timelock script.
 * Creates the unbonding timelock script in the form:
 *    <stakerPubKey>
 *    OP_CHECKSIGVERIFY
 *    <unbondingTimeBlocks>
 *    OP_CHECKSEQUENCEVERIFY
 * @returns {Buffer} The unbonding timelock script.
 */
export const buildUnbondingTimelockScript = (
  stakerKey: Buffer,
  unbondingTimeLock: number
): Buffer => {
  return buildTimelockScript(stakerKey, unbondingTimeLock);
};

/**
 * Builds a timelock script.
 * @param timelock - The timelock value to encode in the script.
 * @returns {Buffer} containing the compiled timelock script.
 */
export const buildTimelockScript = (
  stakerKey: Buffer,
  timelock: number
): Buffer => {
  return script.compile([
    stakerKey,
    opcodes.OP_CHECKSIGVERIFY,
    script.number.encode(timelock),
    opcodes.OP_CHECKSEQUENCEVERIFY
  ]);
};

/**
 * Builds the slashing script for staking in the form:
 *    buildSingleKeyScript(stakerPk, true) ||
 *    buildMultiKeyScript(finalityProviderPKs, 1, true) ||
 *    buildMultiKeyScript(covenantPks, covenantThreshold, false)
 *    || means combining the scripts
 * The slashing script is a combination of single-key and multi-key scripts.
 * The single-key script is used for staker key verification.
 * The multi-key script is used for finality provider key verification and covenant key verification.
 * @returns {Buffer} The slashing script as a Buffer.
 */
export const buildSlashingScript = (
  stakerKey: Buffer,
  finalityProviderKeys: Buffer[],
  covenantKeys: Buffer[],
  covenantThreshold: number
): Buffer => {
  return Buffer.concat([
    buildSingleKeyScript(stakerKey, true),
    buildMultiKeyScript(
      finalityProviderKeys,
      // The threshold is always 1 as we only need one
      // finalityProvider signature to perform slashing
      // (only one finalityProvider performs an offence)
      1,
      // OP_VERIFY/OP_CHECKSIGVERIFY is added at the end
      true
    ),
    buildMultiKeyScript(
      covenantKeys,
      covenantThreshold,
      // No need to add verify since covenants are at the end of the script
      false
    )
  ]);
};

// buildSingleKeyScript and buildMultiKeyScript allow us to reuse functionality
// for creating Bitcoin scripts for the unbonding script and the slashing script
/**
 * Builds a single key script in the form:
 * buildSingleKeyScript creates a single key script
 *    <pk> OP_CHECKSIGVERIFY (if withVerify is true)
 *    <pk> OP_CHECKSIG (if withVerify is false)
 * @param pk - The public key buffer.
 * @param withVerify - A boolean indicating whether to include the OP_CHECKSIGVERIFY opcode.
 * @returns The compiled script buffer.
 */
const buildSingleKeyScript = (pk: Buffer, withVerify: boolean) => {
  // Check public key length
  if (pk.length != NO_COORD_PK_BYTE_LENGTH) {
    throw new Error("Invalid key length");
  }
  return script.compile([
    pk,
    withVerify ? opcodes.OP_CHECKSIGVERIFY : opcodes.OP_CHECKSIG
  ]);
};

/**
 * Builds a multi-key script in the form:
 *    <pk1> OP_CHEKCSIG <pk2> OP_CHECKSIGADD <pk3> OP_CHECKSIGADD ... <pkN> OP_CHECKSIGADD <threshold> OP_NUMEQUAL
 *    <withVerify -> OP_NUMEQUALVERIFY>
 * It validates whether provided keys are unique and the threshold is not greater than number of keys
 * If there is only one key provided it will return single key sig script
 * @param pks - An array of public keys.
 * @param threshold - The required number of valid signers.
 * @param withVerify - A boolean indicating whether to include the OP_VERIFY opcode.
 * @returns The compiled multi-key script as a Buffer.
 * @throws {Error} If no keys are provided, if the required number of valid signers is greater than the number of provided keys, or if duplicate keys are provided.
 */
const buildMultiKeyScript = (
  pks: Buffer[],
  threshold: number,
  withVerify: boolean
) => {
  // Verify that pks is not empty
  if (!pks || pks.length === 0) {
    throw new Error("No keys provided");
  }
  // Check buffer object have expected lengths like checking pks.length
  if (pks.some((pk) => pk.length != NO_COORD_PK_BYTE_LENGTH)) {
    throw new Error("Invalid key length");
  }
  // Verify that threshold <= len(pks)
  if (threshold > pks.length) {
    throw new Error(
      "Required number of valid signers is greater than number of provided keys"
    );
  }
  if (pks.length === 1) {
    return buildSingleKeyScript(pks[0], withVerify);
  }
  // keys must be sorted
  const sortedPks = [...pks].sort(Buffer.compare);
  // verify there are no duplicates
  for (let i = 0; i < sortedPks.length - 1; ++i) {
    if (sortedPks[i].equals(sortedPks[i + 1])) {
      throw new Error("Duplicate keys provided");
    }
  }
  const scriptElements = [sortedPks[0], opcodes.OP_CHECKSIG];
  for (let i = 1; i < sortedPks.length; i++) {
    scriptElements.push(sortedPks[i]);
    scriptElements.push(opcodes.OP_CHECKSIGADD);
  }
  scriptElements.push(script.number.encode(threshold));
  if (withVerify) {
    scriptElements.push(opcodes.OP_NUMEQUALVERIFY);
  } else {
    scriptElements.push(opcodes.OP_NUMEQUAL);
  }
  return script.compile(scriptElements);
};
