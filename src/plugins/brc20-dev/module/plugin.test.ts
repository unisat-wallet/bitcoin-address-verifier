import plugin from "./index";

describe("brc20-dev:module", () => {
  it("should generate valid address", () => {
    const params = {
      moduleId:
        "fd5bd482bed1b62d0702e2f19a1e3bdd4fb755fa5c9bed5d8d0f219a3219ee95i0",
    };
    expect(() => plugin.generate(params)).not.toThrow();
    expect(plugin.generate(params).script).toBe(
      "6a2095ee19329a210f8d5ded9b5cfa55b74fdd3b1e9af1e202072db6d1be82d45bfd"
    );
  });

  it("should throw with invalid params", () => {
    expect(() => plugin.generate({})).toThrow();
  });
});
