import { WalletAccount } from "../../../core-sdk/types";
import plugin from "./index";

describe("babylon:slashing-burn", () => {
  it("should return the correct script for the slashing burn plugin", () => {
    const params = {
      slashingPkScriptHex:
        "6a07626162796c6f6e"
    };
    const result = plugin.verify(params, {} as WalletAccount);
    expect(result.address).toBe(
      ""
    );
    expect(result.isOwned).toBe(false);
    expect(result.script).toBe(
      "6a07626162796c6f6e"
    );
  });
});
