function parseToHtml(content, filename) {
  let title;
  let header;
  // TODO: add parsing for linux based systems
  if (content[1].startsWith("\r\n")) {
    title = content[0];
    header = `<h1>${content[0]}</h1>`;
  } else {
    title = parseFileName(filename);
    header = `<p>${content[0]}</p>`;
  }

  const lines = content
    .slice(2)
    .map((line) => `<p>${line}</p>`)
    .join("\n");

  return `
    <!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    ${header}
    ${lines}
    </body>
    </html>`;
}

function parseFileName(path) {
  const filenameRegex = /[\\/](?:([^\\/]+))\.\w+$/;
  let name = path.match(filenameRegex);
  return name[1];
}

export { parseToHtml, parseFileName };
