import { ContractParams } from "../../../core-sdk/types"

export const BABYLON_PLUGINS = {
  STAKING: {
    id: "babylon:staking",
    name: "Babylon Staking",
    description: "Babylon Staking",
    params: {} as BabylonStakingPluginParams
  },
  UNBONDING: {
    id: "babylon:unbonding",
    name: "Babylon Unbonding",
    description: "Babylon Unbonding",
    params: {} as BabylonUnbondingPluginParams
  },
  SLASHING: {
    id: "babylon:slashing",
    name: "Babylon Slashing Refund",
    description: "Babylon Slashing Refund",
    params: {} as BabylonSlashingPluginParams
  },
  SLASHING_BURN: {
    id: "babylon:slashing-burn",
    name: "Babylon Slashing Burn",
    description: "Babylon Slashing Burn",
    params: {} as BabylonSlashingBurnPluginParams
  }
} as const;

/**
 * Parameters for the Babylon Staking Plugin.
 * 
 * @param stakerPk - The public key of the staker.
 * @param covenantPks - The public keys of the covenants.
 * @param finalityProviders - The public keys of the finality providers.
 * @param covenantThreshold - The threshold for the covenants.
 * @param minUnbondingTime - The minimum time to unbond for.
 * @param stakingDuration - The duration of the staking.
 */
export interface BabylonStakingPluginParams extends ContractParams {
  stakerPk: string
  covenantPks: string[]
  finalityProviders: string[]
  covenantThreshold: number
  minUnbondingTime: number
  stakingDuration: number
}

/**
 * Parameters for the Babylon Unbonding Plugin.
 * 
 * @param stakerPk - The public key of the staker.
 * @param covenantPks - The public keys of the covenants.
 * @param finalityProviders - The public keys of the finality providers.
 * @param covenantThreshold - The threshold for the covenants.
 * @param unbondingTimeBlocks - The number of blocks to unbond for.
 * @param unbondingFeeSat - The fee to pay for unbonding. This value is not used
 * for deriving the script/tapscript address, but it's an important value for
 * the staker to know in the UI.
 */
export interface BabylonUnbondingPluginParams extends ContractParams {
  stakerPk: string
  covenantPks: string[]
  finalityProviders: string[]
  covenantThreshold: number
  unbondingTimeBlocks: number
  unbondingFeeSat: number
}

/**
 * Parameters for the Babylon Slashing Plugin Params.
 * Both for Staking Slashing and Unbonding Slashing.
 *
 * @param stakerPk - The public key of the staker.
 * @param unbondingTimeBlocks - The number of blocks to unbond for.
 * @param slashingFeeSat - The fee to pay for slashing if it occurs. This value
 * is not used for deriving the script/tapscript address, but it's an important
 * value for the staker to know in the UI.
 */
export interface BabylonSlashingPluginParams extends ContractParams {
  stakerPk: string
  unbondingTimeBlocks: number
  slashingFeeSat: number
}

/**
 * Parameters for the Babylon Slashing Burn Plugin.
 *
 * @param slashingPkScriptHex - The script hex of the slashing.
 */
export interface BabylonSlashingBurnPluginParams extends ContractParams {
  slashingPkScriptHex: string
}
