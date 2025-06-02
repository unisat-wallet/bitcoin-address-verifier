## 🚀 Babylon PSBT Plugin Integration

This plugin enables enhanced PSBT verification for Babylon staking-related transactions within the Wallet through a common interface. It provides users with better visibility into what they are signing by allowing the wallet to recognize and label specific PSBT inputs and outputs based on Babylon contract data.

### 👨🏻‍💻 Overview

When a Babylon dApp calls `signPsbt`, it can pass a list of contract plugins in the call arguments. Each plugin includes an identifier and a set of parameters. These parameters are used by the wallet to re-derive expected Taproot addresses. If a match is found within the PSBT's inputs or outputs, the wallet can label the corresponding section with a meaningful contract name and description.

Additionally, users can inspect the data used to derive each contract address, improving transparency and helping users better understand the purpose of the transaction.

---

### 💪 Supported Plugins

The following Babylon plugins are currently supported:

```ts
export const BABYLON_PLUGINS = {
  STAKING: {
    id: "babylon:staking",
    name: "Babylon Staking",
    description: "Babylon Staking",
    params: {} as BabylonStakingPluginParams
  },
  UNBONDING: {
    id: "babylon:unbonding",
    name: "Babylon Unbonding",
    description: "Babylon Unbonding",
    params: {} as BabylonUnbondingPluginParams
  },
  SLASHING: {
    id: "babylon:slashing",
    name: "Babylon Slashing Refund",
    description: "Babylon Slashing Refund",
    params: {} as BabylonSlashingPluginParams
  }
} as const;
```

---

### 🏋️ Plugin Parameter Definitions

Each plugin has a defined set of parameters used to deterministically derive the expected contract address.

#### 1️⃣ BabylonStakingPluginParams
```ts
interface BabylonStakingPluginParams extends ContractParams {
  stakerPk: string
  covenantPks: string[]
  finalityProviders: string[]
  covenantThreshold: number
  minUnbondingTime: number
  stakingDuration: number
}
```

#### 2️⃣ BabylonUnbondingPluginParams

```ts
interface BabylonUnbondingPluginParams extends ContractParams {
  stakerPk: string
  covenantPks: string[]
  finalityProviders: string[]
  covenantThreshold: number
  unbondingTimeBlocks: number
}
```

#### 3️⃣ BabylonSlashingPluginParams

```ts
interface BabylonSlashingPluginParams extends ContractParams {
  stakerPk: string
  unbondingTimeBlocks: number
}
```

---

### 🧐 Example Usage Flow

1. A Babylon dApp calls wallet.signPsbt(psbt, { contracts })
2. The contracts argument includes Babylon plugin objects like:

```ts
[
  {
    id: "babylon:staking",
    params: {
      stakerPk: "...",
      covenantPks: [...],
      finalityProviders: [...],
      covenantThreshold: 3,
      minUnbondingTime: 1000,
      stakingDuration: 5000
    }
  }
]
```

3. The wallet plugin detects the contract by id
4. It derives the expected output address from the given parameters
5. If a match is found in the PSBT, the wallet:
 -- Labels the matching input/output (e.g., “Babylon Staking”)
 -- Allows users to expand and view the contract data used to compute the address