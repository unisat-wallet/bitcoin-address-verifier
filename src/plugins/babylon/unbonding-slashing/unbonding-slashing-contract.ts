import { payments } from "bitcoinjs-lib"

import { ContractNetwork } from "../../../core-sdk/types"
import { networkToBitcoinNetwork } from "../../../core-sdk/utils"
import { internalPubkey } from "../utils/internalPubkey"
import {
  buildUnbondingTimelockScript
} from "../utils/scripts"
import { BabylonSlashingPluginParams } from "../types/types"

export function getUnbondingSlashingContract(
  params: BabylonSlashingPluginParams,
  network = ContractNetwork.MAINNET
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
    network: networkToBitcoinNetwork(network)
  })

  return {
    address: p2tr.address || "",
    script: p2tr.output?.toString("hex") || ""
  }
}
