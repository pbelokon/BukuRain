import { expect, test } from "vitest";
import { buildFromText } from "../src/parser.js";

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
