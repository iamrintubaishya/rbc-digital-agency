
const express = require('express');
const path = require('path');

const app = express();

// Serve static files from dist/public
app.use(express.static(path.join(__dirname, '..', 'dist', 'public')));

// API routes would go here
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Handle React Router - send all non-API requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'public', 'index.html'));
});

module.exports = app;
