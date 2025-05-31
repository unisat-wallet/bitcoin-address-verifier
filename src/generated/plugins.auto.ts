// Auto-generated at 2025-05-31T01:30:02.610Z
// DO NOT EDIT DIRECTLY

import BabylonSlashing from '../plugins/babylon/slashing';
import BabylonStaking from '../plugins/babylon/staking';
import BabylonUnbonding from '../plugins/babylon/unbonding';
import Brc20DevModule from '../plugins/brc20-dev/module';

export function registerAllPlugins(registry) {
  registry.register(BabylonSlashing);
  registry.register(BabylonStaking);
  registry.register(BabylonUnbonding);
  registry.register(Brc20DevModule);
}