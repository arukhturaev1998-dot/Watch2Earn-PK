// Copies ../frontend into ./www so Capacitor has a webDir to package.
// Run via `npm run copy-web` (also runs automatically before `npm run sync`).
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "frontend");
const dest = path.join(__dirname, "www");

function copyRecursive(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const srcPath = path.join(from, entry.name);
    const destPath = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

fs.rmSync(dest, { recursive: true, force: true });
copyRecursive(src, dest);
console.log(`Copied frontend/ -> mobile/www/`);
