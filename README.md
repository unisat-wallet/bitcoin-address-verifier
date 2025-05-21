# Bitcoin Address Verifier

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modular system for validating and generating Bitcoin contract addresses with plugin support.

## Features

- 🧩 Plugin-based architecture for contract types
- 🔍 Automatic address generation from contract parameters
- 📦 Self-contained plugin system

## Installation

```bash
npm install @unisat/bitcoin-address-verifier
# or
yarn add @unisat/bitcoin-address-verifier
```

## Usage

### Basic Usage

```
import { verifyContract } from "./index";

const result = verifyContract("babylon:staking", {
  stakerPk: "5092...",
  covenantPks: ["5092...",],
  finalityProviders: ["5092...",],
  covenantThreshold: 1,
  minUnbondingTime: 101,
  stakingDuration: 144,
},{
  address: "",
  publicKey: ""
});

console.log(result);

```

### Wallet Integration

```
// Use in PSBT signing
wallet.signPsbt(psbt, {
  contracts: [{
    id: 'babylon:staking',
    params: { /* ... */ }
  }]
});
```

## Plugin Development

### Creating a New Plugin

1. Run the generator:

```
yarn new:plugin
```

2. Follow the interactive prompts

### Plugin Structure

```
plugins/
└── your-project/
    └── contract-name/
        ├── index.ts      # Main implementation
        └── plugin.test.ts       # Test cases
```

### Example Plugin

```
// plugins/example/timelock/index.ts
export default {
  id: 'example:timelock',
  version: '1.0.0',

  verify(params, account) {
    // Implementation here
  },

};
```

## Contributing

1. Fork the repository

2. Create a new branch (git checkout -b feature/your-plugin)

3. Commit your changes (git commit -am 'Add new plugin')

4. Push to the branch (git push origin feature/your-plugin)

5. Open a Pull Request

## Build Setup

```
# Install dependencies
yarn

# Build project
yarn build


# Run tests
yarn test
```

## Project Structure

```
bitcoin-contract-validator/
├── src/
│   ├── core-sdk/         # Core validation logic
│   ├── plugins/          # Plugin implementations
│   └── generated/        # Auto-generated registry
├── scripts/             # Generation scripts
└── test/                # Test cases
```
