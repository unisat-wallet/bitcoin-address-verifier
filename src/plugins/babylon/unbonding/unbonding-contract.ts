import { payments } from "bitcoinjs-lib";
import { StakingScriptData } from "@babylonlabs-io/btc-staking-ts";
import { Taptree } from "bitcoinjs-lib/src/types";

import { ContractNetwork } from "../../../core-sdk/types";
import { networkToBitcoinNetwork } from "../../../core-sdk/utils";
import { internalPubkey } from "../utils/internalPubKey";
import { getPublicKeyNoCoord, initBTCCurve } from "../utils/btc";

initBTCCurve();

export function getUnbondingContract(
  params: {
    stakerPk: string;
    covenantPks: string[];
    finalityProviders: string[];
    covenantThreshold: number;
    unbondingTimeBlocks: number;
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

  const { covenantThreshold, unbondingTimeBlocks, stakingDuration } = params;

  const stakingScriptData = new StakingScriptData(
    stakerPk,
    finalityProviders,
    covenantPks,
    covenantThreshold,
    stakingDuration,
    unbondingTimeBlocks
  );

  const { unbondingTimelockScript, slashingScript } =
    stakingScriptData.buildScripts();

  const unbondingScriptTree: Taptree = [
    { output: slashingScript },
    { output: unbondingTimelockScript }
  ];

  const p2tr = payments.p2tr({
    internalPubkey,
    scriptTree: unbondingScriptTree,
    network: networkToBitcoinNetwork(network)
  });

  return {
    address: p2tr.address || "",
    script: p2tr.output?.toString("hex") || ""
  };
}
