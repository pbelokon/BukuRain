#!/usr/bin/env node
import { help, logo, version, display } from "../src/commands.js";
import { main } from "../src/generator.js";
import arg from "arg";

try {
  const args = arg(
    {
      // Types
      "--help": Boolean,
      "--version": Boolean,
      "--input": String,
      "--output": String,

      // Aliases
      "-h": "--help",
      "-v": "--version",
      "-i": "--input",
      "-o": "--output",
    },
    { permissive: true }
  );

  const commands = {
    "--version": version,
    "--help": help,
    "--output": () => main(args["--input"], args["--output"]),
    "--input": () => main(args["--input"]),
  };

  const selectedCommand = Object.keys(args).find((arg) => commands[arg]);

  if (selectedCommand) {
    commands[selectedCommand]();
  } else {
    logo();
  }
} catch (e) {
  display(e.message + " use -h or --help");
}
