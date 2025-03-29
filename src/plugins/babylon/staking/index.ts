import { ContractPlugin, WalletAccount } from "../../../core-sdk/types";
import { getStakingContract } from "./staking-contract";

const toXOnly = (pubKey) =>
  pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);

export default {
  id: "babylon:staking",
  name: "Babylon Staking Contract",
  description: "Babylon Staking Contract",
  verify(params, account: WalletAccount) {
    let isOwned = false;
    if (
      toXOnly(Buffer.from(account.publicKey, "hex")).toString("hex") ===
      params.stakerPk
    ) {
      isOwned = true;
    }
    const result = getStakingContract(params);

    return {
      isOwned,
      address: result.address,
      script: result.script,
    };
  },
} as ContractPlugin;
