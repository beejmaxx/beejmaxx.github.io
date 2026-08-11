import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../dist/client");
const port = Number(process.env.PORT || 3000);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".rsc": "text/x-component; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function existingFile(candidates) {
  for (const candidate of candidates) {
    const resolved = path.resolve(root, `.${candidate}`);
    if (!resolved.startsWith(`${root}${path.sep}`) && resolved !== root) continue;
    try {
      if ((await stat(resolved)).isFile()) return resolved;
    } catch {
      continue;
    }
  }
  return path.join(root, "404.html");
}

createServer(async (request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  const cleanPath = pathname === "/" ? "/index.html" : pathname.replace(/\/$/, "");
  const candidates = path.extname(cleanPath)
    ? [cleanPath]
    : [`${cleanPath}.html`, `${cleanPath}/index.html`];
  const file = await existingFile(candidates);
  const isNotFound = file.endsWith(`${path.sep}404.html`);

  response.writeHead(isNotFound ? 404 : 200, {
    "Content-Type": types[path.extname(file)] ?? "application/octet-stream",
    "Cache-Control": "no-store",
  });
  if (request.method === "HEAD") response.end();
  else createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Portfolio preview: http://localhost:${port}/`);
});
