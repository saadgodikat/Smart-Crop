// Connection tester utility
const testConnection = async (baseUrl) => {
  try {
    const response = await fetch(`${baseUrl}/health`, {
      method: 'GET',
      timeout: 5000
    });
    return response.ok;
  } catch {
    return false;
  }
};

export const findWorkingAPI = async () => {
  const possibleURLs = [
    'http://localhost:3000/api',
    'http://127.0.0.1:3000/api',
    'http://172.16.82.30:3000/api',
    'http://192.168.1.100:3000/api' // Common local network IP
  ];
  
  console.log('🔍 Testing API connections...');
  
  for (const url of possibleURLs) {
    console.log(`Testing: ${url}`);
    const isWorking = await testConnection(url);
    if (isWorking) {
      console.log(`✅ Found working API: ${url}`);
      return url;
    }
  }
  
  console.log('❌ No working API found');
  return null;
};

export const getAPIStatus = async (baseUrl) => {
  try {
    const response = await fetch(`${baseUrl}/health`);
    if (response.ok) {
      const data = await response.json();
      return { status: 'connected', data };
    }
    return { status: 'error', error: `HTTP ${response.status}` };
  } catch (error) {
    return { status: 'error', error: error.message };
  }
};