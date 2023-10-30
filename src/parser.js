"use strict";

// Create html string
function buildHtml(title, body, lang) {
  return `
    <!doctype html>
    <html lang=${lang}>
    <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <link rel="stylesheet" href="../prism/prism.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    ${body}
    <script src="../prism/prism.js"></script>
    </body>
    </html>`;
}

// Parse text to title and body
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

  return { title, body };
}

// Build html content from text
function buildFromText(content, filename, lang) {
  const { title, body } = parseText(content, filename);
  return buildHtml(title, body, lang);
}

// Parse code blocks in markdown
function parseCodeBlocks(body) {
  const codeBlockRegex = /```(.*?)\n(.*?)\n```/gs;

  return body.replace(codeBlockRegex, (match, language, code) => {
    const className = language ? `language-${language}` : "";
    return `<pre><code class="${className}">${code.trim()}</code></pre>`;
  });
}

// Parse markdown to title and body
function parseMarkDown(content, filename) {
  let title = parseFileName(filename);

  const italic = /\_([^*><]+)\_/g;
  const horizontalRule = /^( ?[-_*]){3,} ?[\t]*$/g;

  const body = content
    .map((line) => {
      if (line.startsWith("# ")) {
        const slicedLine = line.slice(2);
        return `<h1>${slicedLine}</h1>`;
      } else if (line.startsWith("## ")) {
        const slicedLine = line.slice(3);
        return `<h2>${slicedLine}</h2>`;
      } else if (line.startsWith("### ")) {
        const slicedLine = line.slice(3);
        return `<h3>${slicedLine}</h3>`;
      } else if (line.match(italic)) {
        return line.replace(italic, "<i>$1</i>");
      } else if (line.match(horizontalRule)) {
        return line.replace(horizontalRule, "<hr>");
      } else {
        return line;
      }
    })
    .join("\n");

  const bodyWithCodeBlocks = parseCodeBlocks(body);

  return { title, body: bodyWithCodeBlocks };
}

// Build html content from markdown
function buildFromMarkDown(content, filename, lang) {
  const { title, body } = parseMarkDown(content, filename);
  return buildHtml(title, body, lang);
}

function parseFileName(path) {
  const filenameRegex = /[\\/](?:([^\\/]+))\.\w+$/;
  let name = path.match(filenameRegex);
  return name[1];
}

export { buildFromMarkDown, parseFileName, buildFromText };
