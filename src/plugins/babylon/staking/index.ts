import { ContractPlugin } from "../../../core-sdk/types";
import { getStakingContract } from "./staking-contract";

export default {
  id: "babylon:staking",
  name: "Babylon Staking Contract",
  description: "Babylon Staking Contract",
  generate(params) {
    return getStakingContract(params);
  },
} as ContractPlugin;
