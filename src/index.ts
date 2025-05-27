import { PluginRegistry } from "./core-sdk/registry";
import { registerAllPlugins } from "./generated/plugins.auto";
import { initBTCCurve } from "./plugins/babylon/utils/btc";

const registry = new PluginRegistry();

registerAllPlugins(registry);

initBTCCurve();

export function verifyContract(
  contractId: string,
  contractParams: any,
  walletAccount: any
) {
  return registry.verifyContract(contractId, contractParams, walletAccount);
}
