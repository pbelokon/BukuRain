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
      "--lang": String,
      "--config": String,

      // Aliases
      "-h": "--help",
      "-v": "--version",
      "-i": "--input",
      "-o": "--output",
      "-l": "--lang",
      "-c": "--config",
    },
    { permissive: true },
  );

  const commands = {
    "--version": version,
    "--help": help,
    "--output": () => main(args["--input"], args["--lang"], args["--output"]),
    "--input": () => main(args["--input"], args["--lang"]),
    "--config": () => main(args["--input"], args["--lang"], args["--config"]),
  };

  const selectedCommand = Object.keys(args).find((arg) => commands[arg]);
  const hasConfig = Object.keys(args).find((arg) => arg == "--config");

  if (hasConfig) {
    commands[hasConfig]();
  } else if (selectedCommand) {
    commands[selectedCommand]();
  } else {
    logo();
  }
} catch (e) {
  display(e.message + " use -h or --help");
}
