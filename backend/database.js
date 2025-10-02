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
      ('Amit Singh', '9876543212', 'password123', 'Nashik', 'clay', 'rice')`
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
  createDatabase,
  initializeTables,
  seedData
};
