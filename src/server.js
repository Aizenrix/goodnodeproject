const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { buildReport } = require('./gradeCalculator');
const { parseGrades } = require('./parseGrades');

const host = '127.0.0.1';
const basePort = Number(process.env.PORT) || 3000;
const publicDir = path.resolve(__dirname, '..', 'public');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

function handleApi(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const parsedBody = body ? JSON.parse(body) : {};
      const input = Array.isArray(parsedBody.grades) ? parsedBody.grades : [];
      const grades = parseGrades(input);
      const report = buildReport(grades);
      sendJson(res, 200, report);
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
  });
}

function requestHandler(req, res) {
  if (!req.url) {
    sendJson(res, 400, { error: 'Bad request' });
    return;
  }

  if (req.url === '/api/calculate' && req.method === 'POST') {
    handleApi(req, res);
    return;
  }

  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const normalized = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(publicDir, normalized);
  if (!filePath.startsWith(publicDir)) {
    sendJson(res, 403, { error: 'Forbidden' });
    return;
  }
  serveFile(res, filePath);
}

function startServer(port) {
  const server = http.createServer(requestHandler);
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && !process.env.PORT) {
      const nextPort = port + 1;
      console.log(`Port busy, retry: ${nextPort}`);
      startServer(nextPort);
      return;
    }
    throw error;
  });
  server.listen(port, host, () => {
    console.log(`Server: http://${host}:${port}`);
  });
}

startServer(basePort);
