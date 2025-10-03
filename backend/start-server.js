const { exec } = require('child_process');
const http = require('http');

// Function to check if server is running
const checkServer = (port = 3000) => {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: port,
      path: '/api/health',
      method: 'GET',
      timeout: 2000
    }, (res) => {
      resolve(true);
    });
    
    req.on('error', () => resolve(false));
    req.on('timeout', () => resolve(false));
    req.end();
  });
};

// Start server if not running
const startServer = async () => {
  console.log('🔍 Checking if server is running...');
  
  const isRunning = await checkServer();
  
  if (isRunning) {
    console.log('✅ Server is already running on port 3000');
    return;
  }
  
  console.log('🚀 Starting server...');
  
  const serverProcess = exec('node app.js', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Server start error:', error);
      return;
    }
    if (stderr) {
      console.error('❌ Server stderr:', stderr);
      return;
    }
    console.log('📝 Server output:', stdout);
  });
  
  serverProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  
  serverProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });
  
  // Wait a bit and check if server started
  setTimeout(async () => {
    const isNowRunning = await checkServer();
    if (isNowRunning) {
      console.log('✅ Server started successfully!');
      console.log('🌐 API available at: http://localhost:3000/api');
    } else {
      console.log('❌ Server failed to start');
    }
  }, 3000);
};

startServer();