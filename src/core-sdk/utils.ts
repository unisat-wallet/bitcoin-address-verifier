import { ContractNetwork } from "./types";
import * as bitcoin from "bitcoinjs-lib";

export function networkToBitcoinNetwork(network: ContractNetwork) {
  switch (network) {
    case ContractNetwork.MAINNET:
      return bitcoin.networks.bitcoin;
    case ContractNetwork.TESTNET:
      return bitcoin.networks.testnet;
    case ContractNetwork.REGTEST:
      return bitcoin.networks.regtest;
    default:
      throw new Error("Invalid network");
  }
}

const NETWORKS = {
  mainnet: bitcoin.networks.bitcoin,
  testnet: bitcoin.networks.testnet,
  regtest: bitcoin.networks.regtest,
};

export function getAddressNetwork(address: string): {
  network: string | null;
  valid: boolean;
} {
  for (const [name, network] of Object.entries(NETWORKS)) {
    try {
      bitcoin.address.toOutputScript(address, network);
      return { network: name, valid: true };
    } catch (_) {
      continue;
    }
  }
  return { network: null, valid: false };
}
