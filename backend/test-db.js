const mysql = require('mysql2');
const config = require('./config');

async function testConnection() {
  console.log('Testing MySQL connection...');
  console.log('Config:', config.database);
  
  const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
  });

  try {
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error('Connection failed:', err);
          reject(err);
        } else {
          console.log('✅ Connected to MySQL successfully!');
          resolve();
        }
      });
    });

    // Test a simple query
    const result = await new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) as count FROM users', (err, results) => {
        if (err) {
          console.error('Query failed:', err);
          reject(err);
        } else {
          console.log('✅ Query successful:', results);
          resolve(results);
        }
      });
    });

    console.log('✅ Database test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    connection.end();
  }
}

testConnection();
