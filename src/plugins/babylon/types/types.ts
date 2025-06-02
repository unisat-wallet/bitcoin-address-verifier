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
  }
} as const;

/**
 * Parameters for the Babylon Staking Plugin.
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
 */
export interface BabylonUnbondingPluginParams extends ContractParams {
  stakerPk: string
  covenantPks: string[]
  finalityProviders: string[]
  covenantThreshold: number
  unbondingTimeBlocks: number
}

/**
 * Parameters for the Babylon Slashing Plugin Params.
 * Both for Staking Slashing and Unbonding Slashing.
 */
export interface BabylonSlashingPluginParams extends ContractParams {
  stakerPk: string
  unbondingTimeBlocks: number
}
