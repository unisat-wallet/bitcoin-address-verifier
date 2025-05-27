import { payments } from "bitcoinjs-lib";
import { StakingScriptData } from "@babylonlabs-io/btc-staking-ts";
import { Taptree } from "bitcoinjs-lib/src/types";
import { toXOnly } from "bitcoinjs-lib/src/psbt/bip371";

import { ContractNetwork } from "../../../core-sdk/types";
import { networkToBitcoinNetwork } from "../../../core-sdk/utils";
import { internalPubkey } from "../utils/internalPubKey";
import { initBTCCurve } from "../utils/btc";

initBTCCurve();

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
    toXOnly(Buffer.from(pk, "hex"))
  );
  const finalityProviders: Buffer[] = params.finalityProviders.map((pk) =>
    toXOnly(Buffer.from(pk, "hex"))
  );

  const { covenantThreshold, minUnbondingTime, stakingDuration } = params;

  const stakingScriptData = new StakingScriptData(
    stakerPk,
    finalityProviders,
    covenantPks,
    covenantThreshold,
    stakingDuration,
    minUnbondingTime
  );

  const { timelockScript, unbondingScript, slashingScript } =
    stakingScriptData.buildScripts();

  // Build input tapleaf script
  const inputScriptTree: Taptree = [
    { output: slashingScript },
    [{ output: unbondingScript }, { output: timelockScript }]
  ];

  const p2tr = payments.p2tr({
    internalPubkey,
    scriptTree: inputScriptTree,
    network: networkToBitcoinNetwork(network)
  });

  return {
    address: p2tr.address || "",
    script: p2tr.output.toString("hex")
  };
}
