// Auto-generated at 2025-06-03T09:22:32.564Z
// DO NOT EDIT DIRECTLY

import BabylonSlashing from '../plugins/babylon/slashing';
import BabylonSlashingBurn from '../plugins/babylon/slashing-burn';
import BabylonStaking from '../plugins/babylon/staking';
import BabylonUnbonding from '../plugins/babylon/unbonding';
import Brc20DevModule from '../plugins/brc20-dev/module';

export function registerAllPlugins(registry) {
  registry.register(BabylonSlashing);
  registry.register(BabylonSlashingBurn);
  registry.register(BabylonStaking);
  registry.register(BabylonUnbonding);
  registry.register(Brc20DevModule);
}