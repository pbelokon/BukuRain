const require = createRequire(import.meta.url);
const fs = require("fs-extra");
const path = require("path");

import { display } from "./commands.js";
import { createRequire } from "module";
import { parseToHtml, parseFileName } from "./parser.js";

const distPath = "./public";

// clear destination folder
fs.emptyDirSync(distPath);

async function createFile(path) {
  let data = fs.readFileSync(path, "utf-8");
  let content;

  // TODO: add system based file reader
  if (process.platform === "linux" || process.platform === "darwin") {
    content = data.split("\n\n");
  } else if (process.platform === "win32") {
    content = data.split("\r\n\r\n");
  }
  console.log(`${distPath}${parseFileName(path)}.html`);
  fs.writeFile(`${distPath}${parseFileName(path)}.html`, parseToHtml(content));
}

async function main(filePath) {
  try {
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      // TODO process all files in the directory
    } else if (stats.isFile() && path.extname(filePath) === ".txt") {
      await createFile(filePath);
      return;
    } else {
      display("Could not find file or directory");
    }
  } catch (e) {
    console.log(e.message);
  }
}

export { main };
