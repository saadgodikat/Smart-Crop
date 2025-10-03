// Simple test to check backend connection
export const testBackendConnection = async () => {
  const API_URL = 'http://172.16.82.30:3000/api/health';
  
  try {
    console.log('Testing connection to:', API_URL);
    
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend connection successful:', data);
      return { success: true, data };
    } else {
      console.log('❌ Backend responded with error:', response.status);
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.log('❌ Backend connection failed:', error.message);
    return { success: false, error: error.message };
  }
};