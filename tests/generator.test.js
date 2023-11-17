import { expect, test } from "vitest";
import fs from "fs-extra";
import { main } from "../src/generator.js";

const testOutputPath = "./outputTest";

test("main function converts a single text file to HTML", async () => {
  const testFilePath = "./examples/example.txt";
  await main(testFilePath, "en-CA", null, null);

  const outputFileExists = await fs.pathExists(`dist/example.html`);
  expect(outputFileExists).toBe(true);
});

test("main function converts a single markdown file to HTML", async () => {
  const testFilePath = "./examples/test.md";
  await main(testFilePath, "en-CA", null, null);

  const outputFileExists = await fs.pathExists(`dist/test.html`);
  expect(outputFileExists).toBe(true);
});

test("main function converts all files in a directory", async () => {
  const testDirectoryPath = "./examples";
  await main(testDirectoryPath, "en-CA", null, null);

  const outputFileExists1 = await fs.pathExists(`dist/story.html`);
  const outputFileExists2 = await fs.pathExists(`dist/example.html`);
  expect(outputFileExists1 && outputFileExists2).toBe(true);
});

test("main function uses specified output directory", async () => {
  const testFilePath = "./examples/title.txt";
  await main(testFilePath, null, testOutputPath, null);

  const outputFileExists = await fs.pathExists(`${testOutputPath}/title.html`);
  expect(outputFileExists).toBe(true);
});

test("cleanup after tests", async () => {
  await fs.remove(testOutputPath);
});
