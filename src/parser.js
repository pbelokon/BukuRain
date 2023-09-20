function parseToHtml(content, filename) {
  let title;
  let header;
  // TODO: add parsing for linux based systems
  if (content.length >= 2 && content[1].startsWith("\r\n")) {
    title = content[0];
    header = `<h1>${content[0]}</h1>`;
  } else {
    title = parseFileName(filename);
    header = `<p>${content[0]}</p>`;
  }

  const lines = content
    .slice(1)
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

function mdParseToHtml(content, filename) {
  let title = parseFileName(filename);

  // to remove \r\n at the end of content
  let str = content.slice(-1).toString();
  str = str.slice(0, -2);
  content.pop();
  content.push(str);

  let slicedLine;

  const italic = /\_([^*><]+)\_/g;

  // to convert md lines to html tags
  const htmlContent = content
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
      } else {
        return `<p>${line}</p>`;
      }
    })
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
    ${htmlContent}
    </body>
    </html>`;
}

function parseFileName(path) {
  const filenameRegex = /[\\/](?:([^\\/]+))\.\w+$/;
  let name = path.match(filenameRegex);
  return name[1];
}

export { parseToHtml, parseFileName, mdParseToHtml };
