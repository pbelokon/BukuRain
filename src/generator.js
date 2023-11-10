"use strict";

import fs from "fs-extra";
import path from "path";
import { buildFromMarkDown, parseFileName, buildFromText } from "./parser.js";
import { createSpinner } from "nanospinner";
import * as TOML from "@ltd/j-toml";

let distPath = "./dist";
let lang = "en-CA";

async function createFile(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  let content = data.split("\r\n\r\n"); // TODO: add multi platform file ending regex
  if (path.extname(filePath) === ".txt") {
    fs.writeFile(
      `${distPath}/${parseFileName(filePath)}.html`,
      buildFromText(content, filePath, lang)
    );
  } else if (path.extname(filePath) === ".md") {
    fs.writeFile(
      `${distPath}/${parseFileName(filePath)}.html`,
      buildFromMarkDown(content, filePath, lang)
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

async function main(filePath, language, directory, configPath) {
  try {
    const spinner = createSpinner(`Creating files...`).start();
    const stats = await fs.stat(filePath);

    if (directory) {
      distPath = directory;
    }

    if (language != undefined) {
      lang = language;
    }

    // get settings from config
    if (configPath) {
      const config = fs.readFileSync(configPath, "utf-8");
      const configTable = TOML.parse(config);
      if (configTable.lang != undefined) {
        lang = configTable.lang;
      }
      if (configTable.output != undefined) {
        distPath = configTable.output;
      }
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
