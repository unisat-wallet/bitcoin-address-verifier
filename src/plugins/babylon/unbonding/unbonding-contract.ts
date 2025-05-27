import { payments, initEccLib } from "bitcoinjs-lib";
import { StakingScriptData } from "@babylonlabs-io/btc-staking-ts";
import { Taptree } from "bitcoinjs-lib/src/types";
import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";

import { ContractNetwork } from "../../../core-sdk/types";
import { networkToBitcoinNetwork } from "../../../core-sdk/utils";
import { internalPubkey } from "../utils/internalPubKey";

initEccLib(ecc);

export function getUnbondingContract(
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
    unbondingTimelockScript,
    slashingScript,
  } = stakingScriptData.buildScripts();

  const unbondingScriptTree: Taptree = [
    { output: slashingScript },
    { output: unbondingTimelockScript },
  ];

  const p2tr = payments.p2tr({
    internalPubkey,
    scriptTree: unbondingScriptTree,
    network: networkToBitcoinNetwork(network),
  });

  return {
    address: p2tr.address || "",
    script: p2tr.output?.toString("hex") || "",
  };
}
