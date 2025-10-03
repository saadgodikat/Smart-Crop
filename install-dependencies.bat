@echo off
echo Installing new dependencies for soil health module...
cd frontend
npm install expo-av@~13.4.1 react-native-youtube-iframe@^2.3.0 react-native-webview@13.2.2
echo Dependencies installed successfully!
echo.
echo Please restart your Expo development server after installation.
pause