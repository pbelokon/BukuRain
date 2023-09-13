#!/usr/bin/env node
import { help, logo, version, display } from "../src/commands.js";
import arg from "arg";

try {
  const args = arg({
    // Types
    "--help": Boolean,
    "--version": Boolean,
    "--input": String,

    // Aliases
    "-h": "--help",
    "-v": "--version",
    "-i": "--input",
  });

  if (args["--version"]) {
    version();
  } else if (args["--help"]) {
    help();
  } else if (args["--input"]) {
    console.log(args["--input"]);
  } else {
    logo();
  }
} catch (e) {
  display(e.message + " use -h or --help");
}
