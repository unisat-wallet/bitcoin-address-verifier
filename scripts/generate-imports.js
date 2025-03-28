const fs = require("fs");
const path = require("path");

const PLUGINS_ROOT = path.join(__dirname, "../src/plugins");
const OUTPUT_FILE = path.join(__dirname, "../src/generated/plugins.auto.ts");

// 转换目录名到变量名 (babylon:staking -> babylonStaking)
function toCamelCase(str) {
  return str
    .replace(/(^|[:/-])(\w)/g, (_, __, letter) => letter.toUpperCase())
    .replace(/[^\w]/g, "");
}

// 递归查找所有插件入口文件
function findPluginFiles(dir, prefix = "") {
  let results = [];
  const entries = fs.readdirSync(dir);

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 忽略以_开头的目录
      if (!entry.startsWith("_")) {
        const newPrefix = prefix ? `${prefix}:${entry}` : entry;
        results = results.concat(findPluginFiles(fullPath, newPrefix));
      }
    } else if (entry === "index.js" || entry === "index.ts") {
      results.push({
        id: prefix.toLowerCase(),
        path: path.relative(PLUGINS_ROOT, dir),
      });
    }
  });

  return results;
}

// 生成文件内容
function generateContent() {
  const plugins = findPluginFiles(PLUGINS_ROOT);

  const imports = plugins
    .map(
      (plugin) =>
        `import ${toCamelCase(plugin.id)} from '../plugins/${plugin.path}';`
    )
    .join("\n");

  const registrations = plugins
    .map((plugin) => `registry.register(${toCamelCase(plugin.id)});`)
    .join("\n  ");

  return `// Auto-generated at ${new Date().toISOString()}
// DO NOT EDIT DIRECTLY

${imports}

export function registerAllPlugins(registry) {
  ${registrations}
}`;
}

// 主执行
fs.writeFileSync(OUTPUT_FILE, generateContent());
console.log("✅ Generated plugins.auto.ts");
