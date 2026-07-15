const fs = require('fs');
const https = require('https');
const http = require('http');

async function fetchUrl(url) {
  return new Promise((resolve) => {
    const req = (url.startsWith('https') ? https : http).get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve(res.statusCode);
      res.resume();
    }).on('error', (err) => resolve(999));
  });
}

async function checkLinks() {
  const code = fs.readFileSync('src/data.ts', 'utf8');
  const urls = [...code.matchAll(/articleUrl:\s*'([^']+)'/g)].map(m => m[1]);
  
  for (const url of urls) {
    const status = await fetchUrl(url);
    console.log(`[${status}] ${url}`);
  }
}
checkLinks();
