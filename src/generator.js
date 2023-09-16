const require = createRequire(import.meta.url);
const fs = require("fs-extra");
const path = require("path");

import { display } from "./commands.js";
import { createRequire } from "module";
import { parseToHtml, parseFileName } from "./parser.js";
import { createSpinner } from "nanospinner";

let distPath = "./dist";

async function createFile(path) {
  const data = fs.readFileSync(path, "utf-8");
  let content;

  if (process.platform === "linux" || process.platform === "darwin") {
    content = data.split("\n\n");
  } else if (process.platform === "win32") {
    content = data.split("\r\n\r\n");
  }

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

const sleep = (ms = 400) => new Promise((r) => setTimeout(r, ms));

async function main(filePath, directory) {
  try {
    const spinner = createSpinner(`Creating files...`).start();
    const stats = await fs.stat(filePath);

    if (directory) {
      distPath = directory;
    }

    // clear destination folder or create it
    fs.emptyDirSync(distPath);

    if (stats.isDirectory()) {
      await viewDirectory(filePath);
      await sleep();
      spinner.success({ text: `Success files were created in ${distPath}` });
    } else if (stats.isFile() && path.extname(filePath) === ".txt") {
      await createFile(filePath);
      await sleep();
      spinner.success({ text: `Success file was created in ${distPath}` });
    } else {
      spinner.error({ text: `Could not find file or directory!` });
    }
  } catch (e) {
    console.log(e.message);
  }
}

export { main };
