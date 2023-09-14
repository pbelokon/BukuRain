# BukuRain

BukuRain (Book Online) is a CLI tool written in javascript that helps you with generation of static html pages from any text file you provide. 

## Installation
##### Before instalation make sure to download ode for your PC using the following link: https://nodejs.dev/
1. Clone the repository to your computer
2. Using CLI of your choice navigate to the directory where the repository was cloned into.
3. Run ``npm install`` or ``npm i`` to download the dependencies
4. Run buku for help

## Usage
BukuRain accepts the following options:

* `-v` or `--version`: Print the version of the package
* `-h` or `--help`: Print help useful help message
* `-i` or `--input`: FILE PATH Generate HTML files from TXT files. FILE PATH can be a path to an individual file, or to a folder
* `-o` or `--output`: PATH Name of the output directory. Default is './dist', followed by `-i` or `--input` FILE PATH
  
## Features
As of release 0.0.1 BukuRain can:

  - allow the user to specify a different output directory using ``--output`` or ``-o``
  - mark the first line as the title of the page, as long as first line followed by two blank lines

