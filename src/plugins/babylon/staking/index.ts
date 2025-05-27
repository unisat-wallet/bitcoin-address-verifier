import { toXOnly } from "bitcoinjs-lib/src/psbt/bip371";

import {
  ContractPlugin,
  ContractNetwork,
  WalletAccount
} from "../../../core-sdk/types";
import { getAddressNetwork } from "../../../core-sdk/utils";
import { BabylonStakingPluginParams } from "../types/types";
import { getStakingContract } from "./staking-contract";

export default {
  id: "babylon:staking",
  name: "Babylon Staking Contract",
  description: "Babylon Staking Contract",
  verify(params: BabylonStakingPluginParams, account: WalletAccount) {
    let isOwned = false;
    if (
      toXOnly(Buffer.from(account.publicKey, "hex")).toString("hex") ===
      params.stakerPk
    ) {
      isOwned = true;
    }

    const network = getAddressNetwork(account.address);
    if (!network.valid) {
      throw new Error("Invalid account address");
    }

    const result = getStakingContract(
      params,
      network.network as ContractNetwork
    );

    return {
      isOwned,
      address: result.address,
      script: result.script
    };
  }
} as ContractPlugin;
