let htmlButton = `
</body>
</html>`;

function parseToHtml(content, filename) {
  let hasTitle = false;
  let title;
  let header;
  if (content[1].startsWith("\r\n")) {
    header = `\n<h1>${content[0]}</h1>`;
    hasTitle = true;
  } else {
    header = `\n<p>${content[0]}</p>`;
  }

  if (hasTitle) {
    title = content[0];
  } else {
    title = parseFileName(filename);
  }

  let htmlTop = `
    <!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>`;
  htmlTop += header;
  content.forEach((line, i) => {
    if (i >= 2) {
      htmlTop += `\n<p>${line}</p>`;
    }
  });

  return htmlTop + htmlButton;
}

function parseFileName(path) {
  const filenameRegex = /[\\/](?:([^\\/]+))\.\w+$/;
  let name = path.match(filenameRegex);
  return name[1];
}

export { parseToHtml, parseFileName };
