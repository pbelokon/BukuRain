import { expect, test } from "vitest";
import {
  buildFromText,
  parseFileName,
  buildFromMarkDown,
} from "../src/parser.js";

test("properly creates html body with plain text", () => {
  const html = `
    <!doctype html>
    <html lang=en-CA>
    <head>
    <meta charset="utf-8">
    <title>examples</title>
    <link rel="stylesheet" href="../prism/prism.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    <p>hello</p>
    <script src="../prism/prism.js"></script>
    </body>
    </html>`;

  expect(buildFromText(["hello"], "./examples.txt", "en-CA")).toBe(html);
});

test("properly parses file name from path", () => {
  const path = "/path/to/example-file.txt";
  const expectedFileName = "example-file";

  const result = parseFileName(path);

  expect(result).toBe(expectedFileName);
});

test("properly creates html body with markdown text", () => {
  const html = `
    <!doctype html>
    <html lang=en-CA>
    <head>
    <meta charset="utf-8">
    <title>test</title>
    <link rel="stylesheet" href="../prism/prism.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    <h1>hello</h1>
    <script src="../prism/prism.js"></script>
    </body>
    </html>`;

  expect(buildFromMarkDown(["# hello"], "./test.md", "en-CA")).toBe(html);
});
