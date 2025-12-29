import fs from "fs";
import path from "path";

function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  // Fix imports with from keyword (both ./ and ../)
  content = content.replace(/from\s+["'](\.\.?\/.*?)["']/g, (match, p1) => {
    if (!p1.endsWith(".js") && !p1.endsWith(".json")) {
      return `from "${p1}.js"`;
    }
    return match;
  });
  // Fix direct imports without from keyword (both ./ and ../)
  content = content.replace(/import\s+["'](\.\.?\/.*?)["']/g, (match, p1) => {
    if (!p1.endsWith(".js") && !p1.endsWith(".json")) {
      return `import "${p1}.js"`;
    }
    return match;
  });
  fs.writeFileSync(filePath, content);
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith(".js") && !file.endsWith(".test.js")) {
      fixImportsInFile(filePath);
    }
  }
}

// Process both dist and dist/src directories
processDirectory("dist");
if (fs.existsSync("dist/src")) {
  processDirectory("dist/src");
}
