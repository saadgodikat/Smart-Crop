const mysql = require('mysql2');
const config = require('./config');

// Create connection pool
const pool = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promise wrapper for async/await usage
const promisePool = pool.promise();

// Create database if it doesn't exist
const createDatabase = async () => {
  const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password
  });

  return new Promise((resolve, reject) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${config.database.database}`, (err) => {
      if (err) {
        console.error('Error creating database:', err);
        reject(err);
      } else {
        console.log('Database created/verified successfully');
        resolve();
      }
      connection.end();
    });
  });
};

// Initialize database tables
const initializeTables = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(15) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      soil_type VARCHAR(50),
      last_crop VARCHAR(100),
      push_token VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS advisory (
      id INT AUTO_INCREMENT PRIMARY KEY,
      soil_type VARCHAR(50) NOT NULL,
      last_crop VARCHAR(100) NOT NULL,
      crop_recommendation VARCHAR(100) NOT NULL,
      fertilizer VARCHAR(255) NOT NULL,
      market_price VARCHAR(100) NOT NULL,
      weather VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS soil_health (
      id INT AUTO_INCREMENT PRIMARY KEY,
      soil_type VARCHAR(50) NOT NULL,
      ph DECIMAL(3,1) NOT NULL,
      organic_content VARCHAR(50) NOT NULL,
      suggestion TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS weather (
      id INT AUTO_INCREMENT PRIMARY KEY,
      location VARCHAR(255) NOT NULL,
      temperature VARCHAR(20) NOT NULL,
      rainfall VARCHAR(20) NOT NULL,
      humidity VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS market (
      id INT AUTO_INCREMENT PRIMARY KEY,
      crop VARCHAR(100) NOT NULL,
      price VARCHAR(100) NOT NULL,
      location VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS feedback (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      feedback_text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS alerts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      alert_type ENUM('weather', 'pest', 'market', 'government') NOT NULL,
      severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
      location VARCHAR(255),
      crop_type VARCHAR(100),
      is_active BOOLEAN DEFAULT TRUE,
      expires_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS user_alerts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      alert_id INT NOT NULL,
      is_read BOOLEAN DEFAULT FALSE,
      read_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (alert_id) REFERENCES alerts(id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS alert_subscriptions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      alert_type ENUM('weather', 'pest', 'market', 'government') NOT NULL,
      is_enabled BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`
  ];

  for (const query of queries) {
    await new Promise((resolve, reject) => {
      pool.query(query, (err) => {
        if (err) {
          console.error('Error creating table:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  
  // Add push_token column to existing users table if it doesn't exist
  await new Promise((resolve, reject) => {
    pool.query('ALTER TABLE users ADD COLUMN push_token VARCHAR(255)', (err) => {
      if (err && err.code !== 'ER_DUP_FIELDNAME') {
        console.error('Error adding push_token column:', err);
        reject(err);
      } else {
        if (err && err.code === 'ER_DUP_FIELDNAME') {
          console.log('push_token column already exists');
        } else {
          console.log('push_token column added successfully');
        }
        resolve();
      }
    });
  });
  
  console.log('All tables created/verified successfully');
};

// Seed demo data
const seedData = async () => {
  const seedQueries = [
    `INSERT IGNORE INTO advisory (soil_type, last_crop, crop_recommendation, fertilizer, market_price, weather) VALUES
      ('black', 'cotton', 'Chickpea', '20kg urea/acre', '₹5200/quintal', 'Light showers'),
      ('sandy', 'wheat', 'Groundnut', '15kg DAP/acre', '₹4800/quintal', 'Hot & dry'),
      ('clay', 'rice', 'Maize', '25kg NPK/acre', '₹4100/quintal', 'Moderate rain'),
      ('loamy', 'sugarcane', 'Soybean', '18kg SSP/acre', '₹3800/quintal', 'Cloudy'),
      ('red', 'maize', 'Wheat', '22kg urea/acre', '₹1800/quintal', 'Clear sky')`,
    
    `INSERT IGNORE INTO soil_health (soil_type, ph, organic_content, suggestion) VALUES
      ('black', 6.5, 'Medium', 'Good for pulses and oilseeds'),
      ('sandy', 7.2, 'Low', 'Add organic manure and compost'),
      ('clay', 5.8, 'High', 'Add lime for pH balance'),
      ('loamy', 6.8, 'Good', 'Ideal for most crops'),
      ('red', 6.2, 'Medium', 'Suitable for cereals and pulses')`,
    
    `INSERT IGNORE INTO weather (location, temperature, rainfall, humidity) VALUES
      ('Solapur', '32°C', '12mm', '65%'),
      ('Pune', '29°C', '5mm', '60%'),
      ('Nashik', '28°C', '8mm', '70%'),
      ('Nagpur', '34°C', '15mm', '68%'),
      ('Aurangabad', '31°C', '3mm', '55%')`,
    
    `INSERT IGNORE INTO market (crop, price, location) VALUES
      ('Chickpea', '₹5200/quintal', 'Solapur'),
      ('Wheat', '₹1800/quintal', 'Pune'),
      ('Rice', '₹2500/quintal', 'Nashik'),
      ('Groundnut', '₹4800/quintal', 'Nagpur'),
      ('Maize', '₹4100/quintal', 'Aurangabad'),
      ('Soybean', '₹3800/quintal', 'Pune'),
      ('Cotton', '₹6800/quintal', 'Solapur')`,
    
    `INSERT IGNORE INTO users (name, phone, password, location, soil_type, last_crop) VALUES
      ('Rajesh Kumar', '9876543210', 'password123', 'Solapur', 'black', 'cotton'),
      ('Priya Sharma', '9876543211', 'password123', 'Pune', 'sandy', 'wheat'),
      ('Amit Singh', '9876543212', 'password123', 'Nashik', 'clay', 'rice')`,
    
    `INSERT IGNORE INTO alerts (title, message, alert_type, severity, location, crop_type, expires_at) VALUES
      ('Heavy Rainfall Alert', 'Heavy rainfall expected in next 24 hours. Protect your crops and ensure proper drainage.', 'weather', 'high', 'Maharashtra', 'cotton', DATE_ADD(NOW(), INTERVAL 2 DAY)),
      ('Pest Attack Warning', 'Bollworm attack reported in nearby areas. Check your cotton crops and apply pesticide if needed.', 'pest', 'critical', 'Solapur', 'cotton', DATE_ADD(NOW(), INTERVAL 3 DAY)),
      ('Market Price Drop', 'Wheat prices have dropped by 15% in Pune market. Consider holding your stock.', 'market', 'medium', 'Pune', 'wheat', DATE_ADD(NOW(), INTERVAL 5 DAY)),
      ('Government Subsidy', 'New fertilizer subsidy scheme launched. Apply before 31st March.', 'government', 'low', 'Maharashtra', NULL, DATE_ADD(NOW(), INTERVAL 30 DAY)),
      ('Drought Warning', 'Low rainfall predicted for next month. Plan water conservation measures.', 'weather', 'high', 'Maharashtra', NULL, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
    
    `INSERT IGNORE INTO alert_subscriptions (user_id, alert_type, is_enabled) VALUES
      (1, 'weather', TRUE),
      (1, 'pest', TRUE),
      (1, 'market', TRUE),
      (1, 'government', TRUE),
      (2, 'weather', TRUE),
      (2, 'pest', FALSE),
      (2, 'market', TRUE),
      (2, 'government', TRUE),
      (3, 'weather', TRUE),
      (3, 'pest', TRUE),
      (3, 'market', FALSE),
      (3, 'government', TRUE)`
  ];

  for (const query of seedQueries) {
    await new Promise((resolve, reject) => {
      pool.query(query, (err) => {
        if (err) {
          console.error('Error seeding data:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  console.log('Demo data seeded successfully');
};

module.exports = {
  pool,
  promisePool,
  createDatabase,
  initializeTables,
  seedData
};
