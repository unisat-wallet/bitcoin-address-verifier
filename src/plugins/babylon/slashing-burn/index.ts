import {
  ContractPlugin,
  WalletAccount
} from "../../../core-sdk/types";
import { BABYLON_PLUGINS, BabylonSlashingBurnPluginParams } from "../types/types";

const slashingBurnPlugin: ContractPlugin<BabylonSlashingBurnPluginParams> = {
  id: BABYLON_PLUGINS.SLASHING_BURN.id,
  name: BABYLON_PLUGINS.SLASHING_BURN.name,
  description: BABYLON_PLUGINS.SLASHING_BURN.description,
  verify(params: BabylonSlashingBurnPluginParams, _account: WalletAccount) {
    return {
      isOwned: false,
      address: "",
      script: params.slashingPkScriptHex
    };
  }
}

export default slashingBurnPlugin;
