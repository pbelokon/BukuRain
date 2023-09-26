"use strict";
import fs from "fs-extra";
import path from "path";
import { parseText, parseFileName, parseMarkDown } from "./parser.js";
import { createSpinner } from "nanospinner";

let distPath = "./dist";
let lang = "en-CA";

async function createFile(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  let content = data.split("\r\n\r\n"); // TODO: add multi platform file ending regex

  if (path.extname(filePath) === ".txt") {
    fs.writeFile(
      `${distPath}/${parseFileName(filePath)}.html`,
      parseText(content, filePath, lang)
    );
  } else if (path.extname(filePath) === ".md") {
    fs.writeFile(
      `${distPath}/${parseFileName(filePath)}.html`,
      parseMarkDown(content, filePath, lang)
    );
  }
}

async function convertDirectory(dirPath) {
  const files = await fs.readdir(dirPath);

  for (let file of files) {
    let filePath = path.join(dirPath, file);

    if (path.extname(filePath) === ".txt" || path.extname(filePath) === ".md") {
      await createFile(filePath);
    }
  }
}

const sleep = (ms = 400) => new Promise((r) => setTimeout(r, ms));

async function main(filePath, language, directory) {
  try {
    const spinner = createSpinner(`Creating files...`).start();
    const stats = await fs.stat(filePath);

    if (directory) {
      distPath = directory;
    }

    if (language != undefined) {
      lang = language;
    }

    // clear destination folder or create it
    fs.emptyDirSync(distPath);

    if (stats.isDirectory()) {
      await convertDirectory(filePath);
      await sleep();
      spinner.success({ text: `Success files were created in ${distPath}` });
    } else if (stats.isFile() && path.extname(filePath) === ".txt") {
      await createFile(filePath);
      await sleep();
      spinner.success({ text: `Success file was created in ${distPath}` });
    } else if (stats.isFile() && path.extname(filePath) === ".md") {
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
