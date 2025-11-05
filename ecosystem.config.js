module.exports = {
  apps: [{
    name: "pnf-raider",
    script: "./raider.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "800M",
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
    env_production: {
      NODE_ENV: "production"
    },
    error_file: "./logs/err.log",
    out_file: "./logs/out.log",
    log_file: "./logs/combined.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    time: true
  }, {
    name: "pnf-uptime",
    script: "./keep-alive.js", 
    instances: 1,
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  }]
};