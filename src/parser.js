"use strict";
function buildHtml(title, body) {
  return `
    <!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    ${body}
    </body>
    </html>`;
}

function parseText(content, filename) {
  let title;
  let body;

  if (content.length >= 2 && content[1].startsWith("\r\n")) {
    title = content[0];
    body = `<h1>${content[0]}</h1>`;
  } else {
    title = parseFileName(filename);
    body = `<p>${content[0]}</p>`;
  }

  body += content
    .slice(1)
    .map((line) => `<p>${line}</p>`)
    .join("\n");

  return buildHtml(title, body);
}

function parseMarkDown(content, filename) {
  let title = parseFileName(filename);

  // to remove \r\n at the end of content
  let str = content.slice(-1).toString();
  str = str.slice(0, -2);
  content.pop();
  content.push(str);

  let slicedLine;

  const italic = /\_([^*><]+)\_/g;
  const horizontalRule = /^( ?[-_*]){3,} ?[\t]*$/g;

  // to convert md lines to html tags
  const body = content
    .map((line) => {
      if (line.startsWith("# ")) {
        slicedLine = line.slice(2);
        return `<h1>${slicedLine}</h1>`;
      } else if (line.startsWith("## ")) {
        slicedLine = line.slice(3);
        return `<h2>${slicedLine}</h2>`;
      } else if (line.startsWith("### ")) {
        slicedLine = line.slice(3);
        return `<h3>${slicedLine}</h3>`;
      } else if (line.match(italic)) {
        return line.replace(italic, "<i>$1</i>");
      } else if (line.match(horizontalRule)) {
        return line.replace(horizontalRule, "<hr>");
      } else {
        return `<p>${line}</p>`;
      }
    })
    .join("\n");

  return buildHtml(title, body);
}

function parseFileName(path) {
  const filenameRegex = /[\\/](?:([^\\/]+))\.\w+$/;
  let name = path.match(filenameRegex);
  return name[1];
}

export { parseText, parseFileName, parseMarkDown };
