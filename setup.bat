@echo off
echo 🌾 Smart Crop Advisory - Setup Script
echo =====================================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js v14 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version

REM Check if MySQL is installed
mysql --version >nul 2>&1
if errorlevel 1 (
    echo ❌ MySQL is not installed. Please install MySQL v5.7 or higher.
    pause
    exit /b 1
)

echo ✅ MySQL found
mysql --version

REM Check if Expo CLI is installed
expo --version >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing Expo CLI...
    npm install -g @expo/cli
)

echo ✅ Expo CLI found
expo --version

echo.
echo 🔧 Setting up Backend...
cd backend
npm install
echo ✅ Backend dependencies installed

echo.
echo 🔧 Setting up Frontend...
cd ..\frontend
npm install
echo ✅ Frontend dependencies installed

echo.
echo 📊 Database Setup Instructions:
echo 1. Start MySQL service
echo 2. Create database: CREATE DATABASE smart_crop_advisory;
echo 3. Update database credentials in backend/config.js if needed

echo.
echo 🚀 Start the application:
echo 1. Start backend: cd backend ^&^& npm start
echo 2. Start frontend: cd frontend ^&^& expo start
echo 3. Scan QR code with Expo Go app

echo.
echo 🎉 Setup completed! Happy farming!
pause
