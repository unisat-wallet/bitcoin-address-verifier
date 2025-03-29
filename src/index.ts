import { PluginRegistry } from "./core-sdk/registry";
import { registerAllPlugins } from "./generated/plugins.auto";

const registry = new PluginRegistry();

registerAllPlugins(registry);

export function verifyContract(
  contractId: string,
  contractParams: any,
  walletAccount:any
) {
  return registry.verifyContract(contractId, contractParams, walletAccount);
}

