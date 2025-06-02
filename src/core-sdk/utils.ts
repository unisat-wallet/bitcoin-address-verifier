import * as bitcoin from "bitcoinjs-lib";

// Bitcoin network type, a type alias for the bitcoin.Network type
export type BtcNetwork = bitcoin.Network;

const NETWORKS = {
  mainnet: bitcoin.networks.bitcoin,
  testnet: bitcoin.networks.testnet,
  regtest: bitcoin.networks.regtest,
};

export function getAddressNetwork(address: string): BtcNetwork {
  for (const [_, network] of Object.entries(NETWORKS)) {
    try {
      bitcoin.address.toOutputScript(address, network);
      return network;
    } catch {
      continue;
    }
  }
  throw new Error(
    "Invalid address: No compatible network found for the provided address"
  );
}
