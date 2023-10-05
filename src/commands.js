import chalk from "chalk";
import gradient from "gradient-string";
import pkg from "../package.json" assert { type: "json" };

function help() {
  console.log(
    chalk.blue.bold("USAGE:"),
    chalk.blue(
      `\n
       -v, --version   Print the version of the package\n
       -h, --help      Print help useful help message\n
       -i, --input     <FILE PATH> Generate HTML files from TXT files. FILE PATH can be a path to an individual file, or to a folder\n
       -o, --output    <PATH> Name of the output directory. Default is './dist', followed by -i or --input FILE PATH
       -c, --config    <CONFIG FILE PATH> The TOML-based config file path. Missing options will use default settings
        `
    )
  );
}

function logo() {
  console.log(
    gradient("lightblue", "blue").multiline(
      [
        ".-. .-')               .-. .-')              _  .-')     ('-.                  .-') _  ",
        "\\  ( OO )              \\  ( OO )            ( \\( -O )   ( OO ).-.             ( OO ) ) ",
        " ;-----.\\  ,--. ,--.   ,--. ,--. ,--. ,--.   ,------.   / . --. /  ,-.-') ,--./ ,--,'  ",
        " | .-.  |  |  | |  |   |  .'   / |  | |  |   |   /`. '  | \\-.  \\   |  |OO)|   \\ |  |\\  ",
        " | '-' /_) |  | | .-') |      /, |  | | .-') |  /  | |.-'-'  |  |  |  |  \\|    \\|  | ) ",
        " | .-. `.  |  |_|( OO )|     ' _)|  |_|( OO )|  |_.' | \\| |_.'  |  |  |(_/|  .     |/  ",
        " | |  \\  | |  | | `-' /|  .   \\  |  | | `-' /|  .  '.'  |  .-.  | ,|  |_.'|  |\\    |   ",
        " | '--'  /('  '-'(_.-' |  |\\   \\('  '-'(_.-' |  |\\  \\   |  | |  |(_|  |   |  | \\   |   ",
        " `------'   `-----'    `--' '--'  `-----'    `--' '--'  `--' `--'  `--'   `--'  `--'   ",
      ].join("\n")
    )
  );

  console.log(chalk.blueBright(`\n --> to start use -h, --help   `));
}

function version() {
  console.log(chalk.blueBright.bold.underline(`${pkg.name} v${pkg.version}`));
}

function display(message) {
  console.log(chalk.blueBright.underline(message));
}

export { help, logo, version, display };
