import { ContractPlugin } from "./types";
export class PluginRegistry {
  private plugins = new Map<string, ContractPlugin>();

  register(plugin: ContractPlugin) {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin ${plugin.id} already registered`);
    }
    this.plugins.set(plugin.id, plugin);
  }

  generateContract(id: string, params: any) {
    let valid = false;
    let data = null;
    let error = null;
    try {
      const plugin = this.plugins.get(id);
      if (!plugin) {
        throw new Error(`Plugin ${id} not found`);
      }
      const { address, script } = plugin.generate(params);
      data = {
        id: plugin.id,
        name: plugin.name,
        description: plugin.description,
        address,
        script,
      };
    } catch (e) {
      error = e;
    }
    if (data) {
      valid = true;
    }
    return {
      valid,
      data,
      error,
    };
  }
}
