import { payments, initEccLib } from "bitcoinjs-lib";
import { StakingScriptData } from "@babylonlabs-io/btc-staking-ts";
import { Taptree } from "bitcoinjs-lib/src/types";
import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";
import { ContractNetwork } from "../../../core-sdk/types";
import { networkToBitcoinNetwork } from "../../../core-sdk/utils";

initEccLib(ecc);

// internalPubkey denotes an unspendable internal public key to be used for the taproot output
const key =
  "0250929b74c1a04954b78b4b6035e97a5e078a5a0f28ec96d547bfee9ace803ac0";
const internalPubkey = Buffer.from(key, "hex").subarray(1, 33); // Do a subarray(1, 33) to get the public coordinate
export function getStakingContract(
  params: {
    stakerPk: string;
    covenantPks: string[];
    finalityProviders: string[];
    covenantThreshold: number;
    minUnbondingTime: number;
    stakingDuration: number;
  },
  network = ContractNetwork.MAINNET
) {
  const stakerPk = Buffer.from(params.stakerPk, "hex");
  const covenantPks: Buffer[] = params.covenantPks.map((pk) =>
    Buffer.from(pk, "hex")
  );
  const covenantThreshold: number = params.covenantThreshold;
  const minUnbondingTime: number = params.minUnbondingTime;
  const stakingDuration: number = params.stakingDuration;
  const finalityProviders: Buffer[] = params.finalityProviders.map((pk) =>
    Buffer.from(pk, "hex")
  );

  const stakingScriptData = new StakingScriptData(
    stakerPk,
    finalityProviders,
    covenantPks,
    covenantThreshold,
    stakingDuration,
    minUnbondingTime
  );

  const {
    timelockScript,
    unbondingScript,
    slashingScript,
  } = stakingScriptData.buildScripts();

  // Build input tapleaf script
  const inputScriptTree: Taptree = [
    { output: slashingScript },
    [{ output: unbondingScript }, { output: timelockScript }],
  ];

  const p2tr = payments.p2tr({
    internalPubkey,
    scriptTree: inputScriptTree,
    network: networkToBitcoinNetwork(network),
  });

  return {
    address: p2tr.address || "",
    script: p2tr.output.toString("hex"),
  };
}
