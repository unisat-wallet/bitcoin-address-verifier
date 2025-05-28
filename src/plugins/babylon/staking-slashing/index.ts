import { toXOnly } from "bitcoinjs-lib/src/psbt/bip371";

import {
  ContractPlugin,
  ContractNetwork,
  WalletAccount
} from "../../../core-sdk/types";
import { getAddressNetwork } from "../../../core-sdk/utils";
import { BabylonSlashingPluginParams } from "../types/types";
import { getStakingSlashingContract } from "./staking-slashing-contract";

export default {
  id: "babylon:staking-slashing",
  name: "Babylon Staking Slashing Contract",
  description: "Babylon Staking Slashing Contract",
  verify(params: BabylonSlashingPluginParams, account: WalletAccount) {
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

    const result = getStakingSlashingContract(
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
