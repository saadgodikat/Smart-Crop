const fetch = require('node-fetch');

async function testLogin() {
  try {
    console.log('Testing login API...');
    
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: '9876543210',
        password: 'password123'
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.raw());
    
    const data = await response.text();
    console.log('Response body:', data);
    
    if (response.ok) {
      console.log('✅ Login test successful!');
    } else {
      console.log('❌ Login test failed!');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testLogin();
