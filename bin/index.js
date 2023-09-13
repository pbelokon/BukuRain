#!/usr/bin/env node
import { help, logo, version } from "../src/commands.js";
import arg from "arg";

try {
  const args = arg({
    // Types
    "--help": Boolean,
    "--version": Boolean,

    // Aliases
    "-h": "--help",
    "-v": "--version",
  });

  if (args["--version"]) {
    version();
  } else if (args["--help"]) {
    help();
  } else {
    logo();
  }
} catch (e) {
  console.log(e.message, "use -h or --help");
}
