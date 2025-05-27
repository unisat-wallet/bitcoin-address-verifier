import { toXOnly } from "bitcoinjs-lib/src/psbt/bip371";

import {
  ContractPlugin,
  ContractNetwork,
  WalletAccount,
} from "../../../core-sdk/types";
import { getAddressNetwork } from "../../../core-sdk/utils";
import { getUnbondingContract } from "./unbonding-contract";

export default {
  id: "babylon:unbonding",
  name: "Babylon Unbonding Contract",
  description: "Babylon Unbonding Contract",
  verify(params, account: WalletAccount) {
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

    const result = getUnbondingContract(
      params,
      network.network as ContractNetwork
    );

    return {
      isOwned,
      address: result.address,
      script: result.script,
    };
  },
} as ContractPlugin;
