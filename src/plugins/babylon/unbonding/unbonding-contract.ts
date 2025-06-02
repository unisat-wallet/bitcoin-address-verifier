import { payments } from "bitcoinjs-lib";
import { Taptree } from "bitcoinjs-lib/src/types";
import { toXOnly } from "bitcoinjs-lib/src/psbt/bip371";

import { BtcNetwork } from "../../../core-sdk/utils";
import { internalPubkey } from "../utils/internalPubkey";
import {
  buildSlashingScript,
  buildUnbondingTimelockScript,
} from "../utils/scripts";
import { BabylonUnbondingPluginParams } from "../types/types";

export function getUnbondingContract(
  params: BabylonUnbondingPluginParams,
  network: BtcNetwork
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
    network: network
  });

  return {
    address: p2tr.address || "",
    script: p2tr.output?.toString("hex") || "",
  };
}
