import { toXOnly } from "bitcoinjs-lib/src/psbt/bip371";

import {
  ContractPlugin,
  WalletAccount
} from "../../../core-sdk/types";
import { getAddressNetwork } from "../../../core-sdk/utils";
import { BABYLON_PLUGINS, BabylonSlashingPluginParams } from "../types/types";
import { getSlashingContract } from "./slashing-contract";

const slashingPlugin: ContractPlugin<BabylonSlashingPluginParams> = {
  id: BABYLON_PLUGINS.SLASHING.id,
  name: BABYLON_PLUGINS.SLASHING.name,
  description: BABYLON_PLUGINS.SLASHING.description,
  verify(params: BabylonSlashingPluginParams, account: WalletAccount) {
    let isOwned = false;
    if (
      toXOnly(Buffer.from(account.publicKey, "hex")).toString("hex") ===
      params.stakerPk
    ) {
      isOwned = true;
    }

    const network = getAddressNetwork(account.address);
    
    const result = getSlashingContract(
      params,
      network
    );

    return {
      isOwned,
      address: result.address,
      script: result.script
    };
  }
}

export default slashingPlugin;
