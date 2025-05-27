import { payments } from "bitcoinjs-lib";
import { StakingScriptData } from "@babylonlabs-io/btc-staking-ts";
import { Taptree } from "bitcoinjs-lib/src/types";

import { ContractNetwork } from "../../../core-sdk/types";
import { networkToBitcoinNetwork } from "../../../core-sdk/utils";
import { internalPubkey } from "../utils/internalPubKey";
import { getPublicKeyNoCoord, initBTCCurve } from "../utils/btc";

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
    Buffer.from(getPublicKeyNoCoord(pk), "hex")
  );
  const finalityProviders: Buffer[] = params.finalityProviders.map((pk) =>
    Buffer.from(getPublicKeyNoCoord(pk), "hex")
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
