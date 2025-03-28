export interface ContractPlugin {
  id: string; // Plugin ID
  name: string; // Plugin name
  description: string; // Plugin description
  generate: (params: any) => {
    address: string; // Generated contract address
    script: string; // Generated script
    description?: string; // Optional description
  };
}
