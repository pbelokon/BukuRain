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
  const data = fs.readFileSync(path, "utf-8");
  let content;

  if (process.platform === "linux" || process.platform === "darwin") {
    content = data.split("\n\n");
  } else if (process.platform === "win32") {
    content = data.split("\r\n\r\n");
  }
  console.log(content);
  fs.writeFile(
    `${distPath}/${parseFileName(path)}.html`,
    parseToHtml(content, path)
  );
}

async function viewDirectory(dirPath) {
  const files = await fs.readdir(dirPath);

  for (let file of files) {
    let filePath = path.join(dirPath, file);

    if (path.extname(filePath) === ".txt") {
      await createFile(filePath);
    }
  }
}

async function main(filePath) {
  try {
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      await viewDirectory(filePath);
      return;
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
