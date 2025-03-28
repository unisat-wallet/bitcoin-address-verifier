import plugin from "../../babylon/staking";

describe("babylon:staking", () => {
  it("should generate valid address", () => {
    const params = {
      stakerPk:
        "50000074c1a04954b78b4b6035e97a5e078a5a0f28ec96d547bfee9ace803ac0",
      covenantPks: [
        "50000074c1a04954b78b4b6035e97a5e078a5a0f28ec96d547bfee9ace803ac0",
      ],
      finalityProviders: [
        "50000074c1a04954b78b4b6035e97a5e078a5a0f28ec96d547bfee9ace803ac0",
      ],
      covenantThreshold: 1,
      minUnbondingTime: 101,
      stakingDuration: 144,
      magicBytes: "62627434",
    };
    expect(() => plugin.generate(params)).not.toThrow();
    expect(plugin.generate(params).address).toBe(
      "bc1p0eq4zgyddsntx6fvvq5xd4zfq80jeuw484d3w8kp7y8u6yfdd2eqcekcaa"
    );
  });

  it("should throw with invalid params", () => {
    expect(() => plugin.generate({})).toThrow();
  });
});
