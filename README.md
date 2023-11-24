# BukuRain

BukuRain (Book Online) is a CLI tool written in javascript that helps you with generation of static html pages from any text file you provide.

## Via npm

```
// Install BukuRain in any folder you want 
npm i bukurain

// Look at usage manual 
buku -h or buku --help

```

## Usage

BukuRain accepts the following options:

- `-v` or `--version`: Print the version of the package
- `-h` or `--help`: Print help useful help message
- `-i` or `--input`: Generate HTML files from TXT files. FILE PATH can be a path to an individual file, or to a folder. Also, MD file is able to be converted into the .HTML.
- `-o` or `--output`: Name of the output directory. Default is './dist', followed by `-i` or `--input` FILE PATH
- `-c` or `--config`: The TOML-based config file path. Missing options will use default settings

## Examples

`buku -v`

`buku -h`

`buku -i .\examples`

`buku -i .\examples\paragraphs.txt` || `buku -i .\examples\test.md`

`buku -o .\test -i .\examples\paragraphs.txt`

`buku -i .\examples -c config.toml`

## Features

As of release 0.0.1 BukuRain can:

- allow the user to specify a different output directory using `--output` or `-o`
- mark the first line as the title of the page, as long as first line followed by two blank lines
- markdown fenced blocks allow code blocks syntax highlighting for most programming languages
