// Simple local static server for the Shakespeare Erasmus frontend.
// No Vite, no build step, no dependencies.
// Run: node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

// SH_CHARACTERS_API_INTEGRATION: Optional hosted Ollama-compatible chat endpoint for the integrated Characters page.
// Run the frontend server with these environment variables if you want the chatbot to answer:
//   OLLAMA_API_URL=https://your-ollama-compatible-domain.com/api/chat
//   OLLAMA_MODEL=mistral-medium-3.5
//   OLLAMA_API_KEY=optional_bearer_token
async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error('Request body too large.'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch (error) { reject(error); }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function buildCharactersPrompt(context) {
  return `You are the Shakespearasmus Cultural Guide inside an interactive web experience. Speak warmly with light Shakespearean flavor, but stay clear and easy to understand. Keep answers focused on Shakespeare, culture, theatre, storytelling, Erasmus+ learning, costumes, festivals, and the selected country or character. Current country: ${context.country || 'Unknown'}. Character: ${context.characterName || 'Unknown'}. Title: ${context.characterTitle || 'Unknown'}. Role: ${context.role || 'Unknown'}. Costume: ${context.costume || 'Unknown'}. Background: ${context.background || 'Unknown'}. Suggested topics: ${Array.isArray(context.topics) ? context.topics.join(', ') : (context.topics || 'Unknown')}. If asked about unrelated topics, briefly redirect back to Shakespearasmus.`;
}

async function handleCharactersChat(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Use POST for /api/chat.' });
  const ollamaApiUrl = process.env.OLLAMA_API_URL || '';
  if (!ollamaApiUrl) {
    return sendJson(res, 503, { error: 'OLLAMA_API_URL is not configured on the local frontend server.' });
  }

  try {
    const body = await readJsonBody(req);
    const model = process.env.OLLAMA_MODEL || 'llama3.2:3b';
    const headers = { 'Content-Type': 'application/json' };
    if (process.env.OLLAMA_API_KEY) headers.Authorization = `Bearer ${process.env.OLLAMA_API_KEY}`;
    const messages = [
      { role: 'system', content: buildCharactersPrompt(body) },
      ...(Array.isArray(body.history) ? body.history.slice(-10) : []),
      { role: 'user', content: String(body.message || '').slice(0, 2000) }
    ];
    const upstream = await fetch(ollamaApiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ model, messages, stream: false })
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) return sendJson(res, upstream.status, { error: data.error || 'Hosted Ollama request failed.' });
    const reply = data.message?.content || data.response || data.reply || 'The muse is quiet for this moment.';
    return sendJson(res, 200, { reply });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || 'Chat server error.' });
  }
}


const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json'
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const normalized = path.normalize(decoded).replace(/^([/\\])+/, '');
  const fullPath = path.join(ROOT, normalized || 'index.html');
  return fullPath.startsWith(ROOT) ? fullPath : path.join(ROOT, 'index.html');
}

const server = http.createServer((req, res) => {
  if (req.url.split('?')[0] === '/api/chat') {
    handleCharactersChat(req, res);
    return;
  }

  let filePath = safePath(req.url);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    // Keeps React hash routing safe and returns the main page.
    filePath = path.join(ROOT, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Server error loading the file.');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Shakespeare Erasmus frontend running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server.');
});
