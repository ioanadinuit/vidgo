// Minimal static file server for previewing the skin locally.
// Replaces the previous `python -m http.server` launch config — Python is not
// installed on this machine, so the preview never started.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'out');
const PORT = Number(process.env.PORT) || 8765;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel.endsWith('/')) rel += 'index.html';
  // Cloudflare's auto-trailing-slash: /platforma serves platforma.html.
  if (!path.extname(rel) && fs.existsSync(path.join(ROOT, rel + '.html'))) rel += '.html';
  // directory index parity: /blog serves blog/index.html like Cloudflare does (after its redirect).
  else if (!path.extname(rel) && fs.existsSync(path.join(ROOT, rel, 'index.html'))) rel = path.join(rel, 'index.html');

  // Keep every read inside ROOT — no path traversal out of the project.
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found: ' + rel);
      return;
    }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  });
}).listen(PORT, () => console.log(`serving ${ROOT} on http://localhost:${PORT}`));
