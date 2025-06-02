import { ContractPlugin, WalletAccount } from "./types";
export class PluginRegistry {
  private plugins = new Map<string, ContractPlugin>();

  register(plugin: ContractPlugin) {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin ${plugin.id} already registered`);
    }
    this.plugins.set(plugin.id, plugin);
  }

  verifyContract(id: string, params: any, account: WalletAccount) {
    let data = null;
    try {
      const plugin = this.plugins.get(id);
      if (!plugin) {
        throw new Error(`Plugin ${id} not found`);
      }
      const { address, script, isOwned, description } = plugin.verify(
        params,
        account
      );
      data = {
        id: plugin.id,
        name: plugin.name,
        description: description || plugin.description,
        address,
        script,
        isOwned,
      };
    } catch (e) {
      console.error(e);
      // throw new Error(`Error verifying contract: ${e.message}`);
    }

    return data;
  }
}
