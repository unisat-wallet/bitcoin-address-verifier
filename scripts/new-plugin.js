#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Config
const PLUGINS_ROOT = path.join(__dirname, "../src/plugins");
const TEMPLATES = {
  basic: basicTemplate,
};

// Main function
async function main() {
  console.log("🛠️  Bitcoin Contract Plugin Generator\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    // Get user input
    const project = await ask(
      rl,
      '1. Enter project name (lowercase, e.g. "myapp"): '
    );
    const contract = await ask(
      rl,
      '2. Enter contract type (e.g. "time-lock"): '
    );
    const template = TEMPLATES.basic;

    // Create directory
    const pluginDir = path.join(PLUGINS_ROOT, project, contract);
    fs.mkdirSync(pluginDir, { recursive: true });

    // Generate files
    const templateFn = TEMPLATES[template] || TEMPLATES.basic;
    templateFn(pluginDir, `${project}:${contract}`);

    console.log(
      `\n✅ Successfully created plugin template at: ${path.relative(
        process.cwd(),
        pluginDir
      )}`
    );
    console.log("👉 Next steps:");
    console.log(
      `1. Implement contract logic in ${path.join(contract, "index.ts")}`
    );
    console.log("2. Run `npm run generate` to update registry");
  } finally {
    rl.close();
  }
}

// Prompt function
function ask(rl, question, options) {
  return new Promise((resolve) => {
    function prompt() {
      rl.question(question, (answer) => {
        if (!options || options.includes(answer)) {
          resolve(answer.toLowerCase());
        } else {
          console.log(`Please enter a valid option: ${options.join(", ")}`);
          prompt();
        }
      });
    }
    prompt();
  });
}

// ---- Template Definitions ----
function basicTemplate(dir, contractId) {
  // index.ts
  fs.writeFileSync(
    path.join(dir, "index.ts"),
    `
import { ContractPlugin } from "../../../core-sdk/types";
export default {
  id: "${contractId}",
  name: "Your Plugin Name",
  description: "Your Plugin Description",

  generate(params: any) {
    // Implement your contract address generation logic here
    throw new Error("Not implemented");
  },
} as ContractPlugin;
`
  );

  // test.ts
  fs.writeFileSync(
    path.join(dir, `plugin.test.ts`),
    `
import plugin from "./index";

describe("${contractId}", () => {
  test("should generate valid address", () => {
    const params = {
      // Add required parameters here
    };
    expect(() => plugin.generate(params)).not.toThrow();
  });

  test("should throw with invalid params", () => {
    expect(() => plugin.generate({})).toThrow();
  });
});
`
  );
}

// Run
main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
