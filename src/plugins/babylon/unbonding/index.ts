import { toXOnly } from "bitcoinjs-lib/src/psbt/bip371";

import {
  ContractPlugin,
} from "../../../core-sdk/types";
import { getAddressNetwork } from "../../../core-sdk/utils";
import { BABYLON_PLUGINS, BabylonUnbondingPluginParams } from "../types/types";
import { getUnbondingContract } from "./unbonding-contract";

const unbondingPlugin: ContractPlugin<BabylonUnbondingPluginParams> = {
  id: BABYLON_PLUGINS.UNBONDING.id,
  name: BABYLON_PLUGINS.UNBONDING.name,
  description: BABYLON_PLUGINS.UNBONDING.description,
  verify(params, account) {
    let isOwned = false;
    if (
      toXOnly(Buffer.from(account.publicKey, "hex")).toString("hex") ===
      params.stakerPk
    ) {
      isOwned = true;
    }

    const network = getAddressNetwork(account.address);

    const result = getUnbondingContract(
      params,
      network
    );

    return {
      isOwned,
      address: result.address,
      script: result.script
    };
  }
};

export default unbondingPlugin;
