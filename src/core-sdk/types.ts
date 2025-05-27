export enum ContractNetwork {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  REGTEST = "regtest",
}

export interface ContractParams {
  [key: string]: string | number | string[] | number[];
}

export interface ContractPlugin<T extends ContractParams = ContractParams> {
  id: string; // Plugin ID
  name: string; // Plugin name
  description: string; // Plugin description

  verify: (
    params: T, // Contract parameters
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
