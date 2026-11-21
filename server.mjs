import http from 'node:http';
import { readFile } from 'node:fs/promises';
const port = Number(process.env.PORT || 3000);
const assets = new Map([['/app.js', ['app.js', 'text/javascript']], ['/styles.css', ['styles.css', 'text/css']], ['/tokens.css', ['tokens.css', 'text/css']]]);
assets.set('/tura-theme.css', ['tura-theme.css', 'text/css']);
for (const file of ['ds6-entry.js', 'ds6-app.js', 'ds6-data.js']) assets.set('/'+file, [file, 'text/javascript']);
assets.set('/ds6.css', ['ds6.css', 'text/css']);
assets.set('/document-design.css', ['document-design.css', 'text/css']);
assets.set('/ds6-design.js', ['ds6-design.js', 'text/javascript']);
assets.set('/ds6-splash.js', ['ds6-splash.js', 'text/javascript']);
for (const name of ['workshop','craft','dress','celebration','room','photo','meetup','wellness','crochet','party','room-wide','login-art','celebration-hero']) assets.set('/assets/melo/'+name+'.png', ['assets/melo/'+name+'.png', 'image/png']);
// Keep existing page URLs stable while replacing low-resolution document crops.
for (const name of ['workshop','craft','dress','celebration','room','photo','meetup','wellness','crochet']) {
  assets.set('/assets/melo/'+name+'.png', ['assets/melo/'+name+'-hd.png', 'image/png']);
  assets.set('/assets/melo/'+name+'-hd.png', ['assets/melo/'+name+'-hd.png', 'image/png']);
}
http.createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  const asset = assets.get(path);
  if (!asset && path !== '/' && !/^\/(customer|admin|staff)(\/.*)?$/.test(path)) { res.writeHead(404); return res.end('Not found'); }
  try {
    const body = await readFile(new URL(asset ? asset[0] : 'index.html', import.meta.url));
    res.writeHead(200, { 'Content-Type': `${asset ? asset[1] : 'text/html'}; charset=utf-8`, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(body);
  } catch { res.writeHead(500); res.end('Unable to load application'); }
}).listen(port, '127.0.0.1', () => console.log(`Melo Space running at http://localhost:${port}`));
