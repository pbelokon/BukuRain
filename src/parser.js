let htmlTop = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Filename</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>`;

let htmlButton = `
</body>
</html>`;

function parseToHtml(content) {
  content.forEach((line) => (htmlTop = htmlTop + `\n<p>${line}</p>`));

  return htmlTop + htmlButton;
}

function parseFileName(path) {
  path = path.replace(".", "");
  return path.replace(".txt", "");
}

export { parseToHtml, parseFileName };
