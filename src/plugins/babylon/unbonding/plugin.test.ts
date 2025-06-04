import { WalletAccount } from "../../../core-sdk/types";
import plugin from "../../babylon/unbonding";

describe("babylon:unbonding", () => {
  it("should generate valid mainnet tapscript address", () => {
    const account: WalletAccount = {
      address: "bc1qp2npkhwqk9wzlh3pwf4ultjem5ve9032g3gevy",
      publicKey:
        "02b3e9e3140da9d4a148b1471d9b3d4b1c1ff9fb69f421e19a9443365b2a647bf2"
    };

    const params = {
      stakerPk:
        "b3e9e3140da9d4a148b1471d9b3d4b1c1ff9fb69f421e19a9443365b2a647bf2",
      covenantPks: [
        "50000074c1a04954b78b4b6035e97a5e078a5a0f28ec96d547bfee9ace803ac0"
      ],
      finalityProviders: [
        "50000074c1a04954b78b4b6035e97a5e078a5a0f28ec96d547bfee9ace803ac0"
      ],
      covenantThreshold: 1,
      unbondingTimeBlocks: 101,
      unbondingFeeSat: 10000
    };
    const result = plugin.verify(params, account);
    expect(result.address).toBe(
      "bc1ps7cyyqahwz4d9dlpsjqdzzksv0a3c4upqxa3yyeh3f856r4a6y3qzxxs5f"
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
      covenantPks: [
        "50000074c1a04954b78b4b6035e97a5e078a5a0f28ec96d547bfee9ace803ac0"
      ],
      finalityProviders: [
        "50000074c1a04954b78b4b6035e97a5e078a5a0f28ec96d547bfee9ace803ac0"
      ],
      covenantThreshold: 1,
      unbondingTimeBlocks: 144,
      unbondingFeeSat: 10000
    };
    const result = plugin.verify(params, account);
    expect(result.address).toBe(
      "tb1pxhvypjf7pltfms0upy8fskyxy2vf95a3skutlsw02npvherz67lq2lwy56"
    );
    expect(result.isOwned).toBe(false);
  });
});
