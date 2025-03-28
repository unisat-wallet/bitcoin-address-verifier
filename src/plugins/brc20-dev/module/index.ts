import { ContractPlugin } from "../../../core-sdk/types";
import * as bitcoin from "bitcoinjs-lib";

const brc20_module_descs = {
  fd5bd482bed1b62d0702e2f19a1e3bdd4fb755fa5c9bed5d8d0f219a3219ee95i0:
    "Fractal Pizza Swap Module",
};
export default {
  id: "brc20-dev:module",
  name: "BRC20 Module",
  description: "BRC20 Module",

  generate(params: { moduleId: string }) {
    if (!params.moduleId) {
      throw new Error("Missing moduleId");
    }
    const description = brc20_module_descs[params.moduleId];
    return {
      address: "",
      script: getModuleIdScript(params.moduleId),
      description,
    };
  },
} as ContractPlugin;

function getModuleIdScript(moduleId: string) {
  const str = moduleId.split("i")[0];
  const buff = Buffer.from(str, "hex").reverse();
  const script = bitcoin.script.compile([bitcoin.opcodes.OP_RETURN, buff]);
  return script.toString("hex");
}
