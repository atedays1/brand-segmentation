/**
 * Local receiver API for the Figma plugin.
 * POST /api/ingest-figma with JSON payload (frames keyed by frame name).
 * Writes public/extracted/data.json and PNGs for the Gallery page.
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;
const OUT_DIR = path.join(__dirname, '..', 'public', 'extracted');

function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const body = Buffer.concat(chunks).toString('utf8');
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function sanitizeId(id) {
  return String(id).replace(/:/g, '-');
}

function send(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

async function handleIngest(payload) {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, error: 'Invalid JSON payload' };
  }

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const flat = [];
  for (const [frameName, items] of Object.entries(payload)) {
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      const { id, type, name, text, imageBase64 } = item;
      const el = {
        id: id || '',
        type: type || 'UNKNOWN',
        name: name || '',
        visible: true,
        frameName: frameName || item.frameName || '',
      };
      if (text != null) el.text = String(text);
      if (imageBase64) {
        const safeId = sanitizeId(id);
        const filename = `${safeId}.png`;
        const filePath = path.join(OUT_DIR, filename);
        const buf = Buffer.from(imageBase64, 'base64');
        fs.writeFileSync(filePath, buf);
        el.imagePath = `/extracted/${filename}`;
      }
      flat.push(el);
    }
  }

  const dataPath = path.join(OUT_DIR, 'data.json');
  fs.writeFileSync(dataPath, JSON.stringify(flat, null, 2), 'utf8');
  return { ok: true, count: flat.length };
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/ingest-figma') {
    send(res, 404, { error: 'Not found' });
    return;
  }

  try {
    const payload = await parseBody(req);
    const result = await handleIngest(payload);
    if (result.ok) {
      send(res, 200, { ok: true, count: result.count });
    } else {
      send(res, 400, { error: result.error });
    }
  } catch (e) {
    send(res, 500, { error: e.message || 'Server error' });
  }
});

server.listen(PORT, () => {
  console.log(`Receiver API running at http://localhost:${PORT}`);
  console.log(`POST /api/ingest-figma to receive Figma plugin payload.`);
});
