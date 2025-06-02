import { toXOnly } from "bitcoinjs-lib/src/psbt/bip371";

import {
  ContractPlugin,
} from "../../../core-sdk/types";
import { getAddressNetwork } from "../../../core-sdk/utils";
import { BABYLON_PLUGINS, BabylonStakingPluginParams } from "../types/types";
import { getStakingContract } from "./staking-contract";

const stakingPlugin: ContractPlugin<BabylonStakingPluginParams> = {
  id: BABYLON_PLUGINS.STAKING.id,
  name: BABYLON_PLUGINS.STAKING.name,
  description: BABYLON_PLUGINS.STAKING.description,
  verify(params, account) {
    let isOwned = false;
    if (
      toXOnly(Buffer.from(account.publicKey, "hex")).toString("hex") ===
      params.stakerPk
    ) {
      isOwned = true;
    }

    const network = getAddressNetwork(account.address);
    
    const result = getStakingContract(
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

export default stakingPlugin;