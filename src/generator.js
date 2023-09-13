import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs-extra");
const path = require("path");

const distPath = "../public";
import { display } from "./commands.js";

// clear destination folder
fse.emptyDirSync(distPath);

async function main(path) {
  try {
    const stats = await fs.stat(path);

    if (stats.isDirectory()) {
      // TODO process all files in the directory
    } else if (stats.isFile() && path.extname(path) === ".txt") {
      // TODO process single file
    } else {
      display("Could not find file or directory");
    }
  } catch (e) {
    console.log(e.message);
  }
}
