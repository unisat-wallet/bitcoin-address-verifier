// Auto-generated at 2025-05-28T09:06:17.585Z
// DO NOT EDIT DIRECTLY

import BabylonStaking from '../plugins/babylon/staking';
import BabylonUnbonding from '../plugins/babylon/unbonding';
import Brc20DevModule from '../plugins/brc20-dev/module';

export function registerAllPlugins(registry) {
  registry.register(BabylonStaking);
  registry.register(BabylonUnbonding);
  registry.register(Brc20DevModule);
}