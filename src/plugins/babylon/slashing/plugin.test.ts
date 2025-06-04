import { WalletAccount } from "../../../core-sdk/types";
import plugin from "../../babylon/slashing";

describe("babylon:slashing", () => {
  it("should generate valid mainnet tapscript address", () => {
    const account: WalletAccount = {
      address: "bc1qp2npkhwqk9wzlh3pwf4ultjem5ve9032g3gevy",
      publicKey:
        "02b3e9e3140da9d4a148b1471d9b3d4b1c1ff9fb69f421e19a9443365b2a647bf2"
    };

    const params = {
      stakerPk:
        "b3e9e3140da9d4a148b1471d9b3d4b1c1ff9fb69f421e19a9443365b2a647bf2",
      unbondingTimeBlocks: 144,
      slashingFeeSat: 10000
    };
    const result = plugin.verify(params, account);
    expect(result.address).toBe(
      "bc1p9dhnp4p4s2ygpyz542zq0e5ch5lx8fat5efr52cszdcyn69z2cpqqqzf92"
    );
    expect(result.isOwned).toBe(true);
  });

  it("should generate testnet tapscript address", () => {
    const account: WalletAccount = {
      address: "tb1qftyphvne93ala5wlzhf9p2tmfdqs3x5x6dpyhg",
      publicKey:
        "03ed5da96d4cbb64d635569b570a39133db75322a161a52f8fca8d9cc2748ac442"
    };

    const params = {
      stakerPk:
        "b3e9e3140da9d4a148b1471d9b3d4b1c1ff9fb69f421e19a9443365b2a647bf2",
      unbondingTimeBlocks: 144,
      slashingFeeSat: 10000
    };
    const result = plugin.verify(params, account);
    expect(result.address).toBe(
      "tb1p9dhnp4p4s2ygpyz542zq0e5ch5lx8fat5efr52cszdcyn69z2cpqhg5xl9"
    );
    expect(result.isOwned).toBe(false);
  });
});
