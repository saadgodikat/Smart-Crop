#!/bin/bash

echo "🌾 Smart Crop Advisory - Setup Script"
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL v5.7 or higher."
    exit 1
fi

echo "✅ MySQL found: $(mysql --version)"

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
fi

echo "✅ Expo CLI found: $(expo --version)"

echo ""
echo "🔧 Setting up Backend..."
cd backend
npm install
echo "✅ Backend dependencies installed"

echo ""
echo "🔧 Setting up Frontend..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

echo ""
echo "📊 Database Setup Instructions:"
echo "1. Start MySQL service"
echo "2. Create database: CREATE DATABASE smart_crop_advisory;"
echo "3. Update database credentials in backend/config.js if needed"

echo ""
echo "🚀 Start the application:"
echo "1. Start backend: cd backend && npm start"
echo "2. Start frontend: cd frontend && expo start"
echo "3. Scan QR code with Expo Go app"

echo ""
echo "🎉 Setup completed! Happy farming!"
