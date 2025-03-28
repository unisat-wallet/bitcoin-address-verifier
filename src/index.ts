import { PluginRegistry } from "./core-sdk/registry";
import { registerAllPlugins } from "./generated/plugins.auto";

const registry = new PluginRegistry();

registerAllPlugins(registry);

export function generateContract(
  id: string,
  params: any
) {
  return registry.generateContract(id, params);
}

