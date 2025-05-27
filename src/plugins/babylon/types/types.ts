import { ContractParams } from "../../../core-sdk/types";

/**
 * Parameters for the Babylon Staking Plugin.
 */
export interface BabylonStakingPluginParams extends ContractParams {
  stakerPk: string;
  covenantPks: string[];
  finalityProviders: string[];
  covenantThreshold: number;
  minUnbondingTime: number;
  stakingDuration: number;
}

/**
 * Parameters for the Babylon Unbonding Plugin.
 */
export interface BabylonUnbondingPluginParams extends ContractParams {
  stakerPk: string;
  covenantPks: string[];
  finalityProviders: string[];
  covenantThreshold: number;
  unbondingTimeBlocks: number;
}
