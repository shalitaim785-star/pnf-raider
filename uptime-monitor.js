const { exec } = require('child_process');
const axios = require('axios');

class UptimeMonitor {
  constructor() {
    this.checkInterval = 60000; // 1 minute
    this.restartAttempts = 0;
    this.maxRestarts = 10;
  }

  async checkBotStatus() {
    try {
      const response = await axios.get('http://localhost:3000/status', { timeout: 10000 });
      console.log(`✅ Bot Status: ${response.data.status} - ${new Date().toLocaleTimeString()}`);
      this.restartAttempts = 0; // Reset counter on success
      return true;
    } catch (error) {
      console.log(`❌ Bot offline: ${error.message}`);
      return false;
    }
  }

  async restartBot() {
    if (this.restartAttempts >= this.maxRestarts) {
      console.log('🚨 Maximum restart attempts reached. Stopping monitor.');
      return;
    }

    this.restartAttempts++;
    console.log(`🔄 Restarting bot (attempt ${this.restartAttempts})...`);

    exec('pm2 restart pnf-raider', (error, stdout, stderr) => {
      if (error) {
        console.log(`❌ Restart failed: ${error}`);
      } else {
        console.log(`✅ Restart successful: ${stdout}`);
      }
    });
  }

  start() {
    console.log('🟡 Starting 24/7 Uptime Monitor...');
    
    setInterval(async () => {
      const isOnline = await this.checkBotStatus();
      if (!isOnline) {
        await this.restartBot();
      }
    }, this.checkInterval);
  }
}

// Start monitor if running directly
if (require.main === module) {
  const monitor = new UptimeMonitor();
  monitor.start();
}

module.exports = UptimeMonitor;