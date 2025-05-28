import { payments } from "bitcoinjs-lib";
import { Taptree } from "bitcoinjs-lib/src/types";
import { toXOnly } from "bitcoinjs-lib/src/psbt/bip371";

import { ContractNetwork } from "../../../core-sdk/types";
import { networkToBitcoinNetwork } from "../../../core-sdk/utils";
import { internalPubkey } from "../utils/internalPubkey";
import {
  buildSlashingScript,
  buildUnbondingTimelockScript,
} from "../utils/scripts";
import { BabylonUnbondingPluginParams } from "../types/types";

export function getUnbondingContract(
  params: BabylonUnbondingPluginParams,
  network = ContractNetwork.MAINNET
) {
  const stakerPk = Buffer.from(params.stakerPk, "hex");
  const covenantPks: Buffer[] = params.covenantPks.map((pk) =>
    toXOnly(Buffer.from(pk, "hex"))
  );
  const finalityProviders: Buffer[] = params.finalityProviders.map((pk) =>
    toXOnly(Buffer.from(pk, "hex"))
  );

  const { covenantThreshold, unbondingTimeBlocks } = params;

  const unbondingTimelockScript = buildUnbondingTimelockScript(
    stakerPk,
    unbondingTimeBlocks
  );

  const slashingScript = buildSlashingScript(
    stakerPk,
    finalityProviders,
    covenantPks,
    covenantThreshold
  );

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
