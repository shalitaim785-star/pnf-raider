#!/bin/bash
echo "🦝 Starting PNF Raid Bot in 24/7 mode..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Create logs directory
mkdir -p logs

# Install PM2 globally
echo "🔧 Setting up PM2..."
npm install -g pm2

# Start the bot with PM2
echo "🚀 Starting bot..."
pm2 start ecosystem.config.js

echo ""
echo "✅ Bot started successfully!"
echo "📊 Check status: pm2 status"
echo "📋 View logs: pm2 logs pnf-raider" 
echo "🛑 Stop bot: pm2 stop pnf-raider"
echo ""

# Keep script running
wait