export enum ContractNetwork {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  REGTEST = "regtest",
}

export interface ContractPlugin {
  id: string; // Plugin ID
  name: string; // Plugin name
  description: string; // Plugin description

  verify: (
    params: any,
    account: WalletAccount
  ) => {
    isOwned: boolean; // Ownership status

    address: string; // Generated contract address
    script: string; // Generated script
    description?: string; // Optional description
  };
}

export interface WalletAccount {
  address: string; // Wallet address
  publicKey: string; // Wallet public key
}
