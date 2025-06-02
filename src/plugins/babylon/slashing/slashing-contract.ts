import { payments } from "bitcoinjs-lib"

import { BtcNetwork } from "../../../core-sdk/utils"
import { internalPubkey } from "../utils/internalPubkey"
import {
  buildUnbondingTimelockScript
} from "../utils/scripts"
import { BabylonSlashingPluginParams } from "../types/types"

export function getSlashingContract(
  params: BabylonSlashingPluginParams,
  network: BtcNetwork
) {
  const stakerPk = Buffer.from(params.stakerPk, "hex")

  const { unbondingTimeBlocks } = params

  const unbondingTimelockScript = buildUnbondingTimelockScript(
    stakerPk,
    unbondingTimeBlocks
  )

  const p2tr = payments.p2tr({
    internalPubkey,
    scriptTree: { output: unbondingTimelockScript },
    network: network
  })

  return {
    address: p2tr.address || "",
    script: p2tr.output?.toString("hex") || ""
  }
}
