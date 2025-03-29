import { WalletAccount } from "../../../core-sdk/types";
import plugin from "./index";

describe("brc20-dev:module", () => {
  it("should generate valid address", () => {
    const params = {
      moduleId:
        "fd5bd482bed1b62d0702e2f19a1e3bdd4fb755fa5c9bed5d8d0f219a3219ee95i0",
    };

    const account: WalletAccount = {
      address: "bc1qp2npkhwqk9wzlh3pwf4ultjem5ve9032g3gevy",
      publicKey:
        "02b3e9e3140da9d4a148b1471d9b3d4b1c1ff9fb69f421e19a9443365b2a647bf2",
    };

    expect(() => plugin.verify(params, account)).not.toThrow();
    const result = plugin.verify(params, account);
    expect(result.script).toBe(
      "6a2095ee19329a210f8d5ded9b5cfa55b74fdd3b1e9af1e202072db6d1be82d45bfd"
    );
  });

  it("should throw with invalid params", () => {
    expect(() => plugin.verify({}, {} as any)).toThrow();
  });
});
