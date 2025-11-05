const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    bot: 'PNF Raid Bot',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage()
  });
});

// Ping endpoint for uptime robots
app.get('/ping', (req, res) => {
  res.json({ status: 'pong', time: Date.now() });
});

// Bot status endpoint
app.get('/status', (req, res) => {
  res.json({
    status: '🟢 ONLINE',
    version: '2.0.0',
    features: ['Infinite Raid', 'File Spam', '24/7 Hosting'],
    last_restart: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🟢 Uptime Server: http://localhost:${PORT}`);
  console.log(`📊 Status Page: http://localhost:${PORT}/status`);
});

module.exports = app;