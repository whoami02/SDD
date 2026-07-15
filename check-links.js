const fs = require('fs');

async function checkLinks() {
  const code = fs.readFileSync('src/data.ts', 'utf8');
  const urls = [...code.matchAll(/articleUrl:\s*'([^']+)'/g)].map(m => m[1]);
  
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
      console.log(`[${res.status}] ${url}`);
      if (res.status >= 400 && res.status !== 403 && res.status !== 405) {
        // Try GET if HEAD fails
        const resGet = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } });
        console.log(`  -> GET [${resGet.status}] ${url}`);
      }
    } catch (e) {
      console.log(`[ERR] ${url} - ${e.message}`);
    }
  }
}
checkLinks();
