import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ...['app.js','analyzer.js','export.js','samples.js'].map(f => [`/src/${f}`, [`src/${f}`, 'text/javascript; charset=utf-8']]),
  ['/src/styles.css', ['src/styles.css', 'text/css; charset=utf-8']],
  ['/devpost/app-map.html', ['devpost/app-map.html', 'text/html; charset=utf-8']],
]);
const port = Number(process.env.PORT || 4173);
const server = http.createServer(async (req,res) => {
  const headers = { 'X-Content-Type-Options':'nosniff', 'Referrer-Policy':'no-referrer', 'Cache-Control':'no-store', 'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'" };
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405,headers).end('Method not allowed'); return; }
  const path = new URL(req.url, 'http://127.0.0.1').pathname;
  if (path === '/favicon.ico') { res.writeHead(204,headers).end(); return; }
  const entry = files.get(path);
  if (!entry) { res.writeHead(404,headers).end('Not found'); return; }
  try {
    const content = await readFile(fileURLToPath(new URL(entry[0],root)));
    res.writeHead(200, { ...headers, 'Content-Type':entry[1] }).end(req.method === 'HEAD' ? undefined : content);
  } catch { res.writeHead(404,headers).end('File not available'); }
});
server.on('error', e => { console.error(e.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`RuleTrace ready at http://127.0.0.1:${port}`));
