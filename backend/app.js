const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { pool, createDatabase, initializeTables, seedData } = require('./database');
const config = require('./config');

const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database on startup
const initializeApp = async () => {
  try {
    await createDatabase();
    await initializeTables();
    await seedData();
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

// Authentication routes
app.post('/api/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    if (!phone || !password) {
      return res.status(400).json({ error: 'Phone and password are required' });
    }

    console.log('Attempting database query...');
    console.log('Pool status:', pool);
    
    let rows;
    try {
      const result = await new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE phone = ?', [phone], (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve([results, fields]);
          }
        });
      });
      
      console.log('Query result:', result);
      
      if (!result || !result[0]) {
        console.error('Invalid query result:', result);
        return res.status(500).json({ error: 'Database query failed' });
      }
      
      rows = result[0];
    } catch (dbError) {
      console.error('Database query error:', dbError);
      return res.status(500).json({ error: 'Database connection failed', details: dbError.message });
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    
    // Simple password comparison (for demo purposes)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    res.json({ 
      message: 'Login successful', 
      user: userWithoutPassword 
    });
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    const { name, phone, password, location, soil_type, last_crop } = req.body;
    
    if (!name || !phone || !password) {
      return res.status(400).json({ error: 'Name, phone, and password are required' });
    }

    // Check if user already exists
    const existingResult = await pool.execute(
      'SELECT id FROM users WHERE phone = ?',
      [phone]
    );
    const existingUsers = existingResult[0];

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'User with this phone number already exists' });
    }

    // Insert new user
    const insertResult = await pool.execute(
      'INSERT INTO users (name, phone, password, location, soil_type, last_crop) VALUES (?, ?, ?, ?, ?, ?)',
      [name, phone, password, location || null, soil_type || null, last_crop || null]
    );
    const result = insertResult[0];

    res.status(201).json({ 
      message: 'User created successfully', 
      userId: result.insertId 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Crop Advisory route
app.post('/api/advisory', async (req, res) => {
  try {
    const { soil_type, last_crop } = req.body;
    
    if (!soil_type || !last_crop) {
      return res.status(400).json({ error: 'Soil type and last crop are required' });
    }

    const advisoryResult = await pool.execute(
      'SELECT * FROM advisory WHERE soil_type = ? AND last_crop = ?',
      [soil_type, last_crop]
    );
    const rows = advisoryResult[0];

    if (rows.length === 0) {
      // Return a general recommendation if no exact match
      const generalResult = await pool.execute(
        'SELECT * FROM advisory WHERE soil_type = ? LIMIT 1',
        [soil_type]
      );
      const generalRows = generalResult[0];
      
      if (generalRows.length > 0) {
        res.json(generalRows[0]);
      } else {
        res.json({
          crop_recommendation: 'Wheat',
          fertilizer: '20kg urea/acre',
          market_price: '₹1800/quintal',
          weather: 'Moderate conditions'
        });
      }
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Advisory error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Soil Health route
app.get('/api/soil', async (req, res) => {
  try {
    const { soil_type } = req.query;
    
    let query = 'SELECT * FROM soil_health';
    let params = [];
    
    if (soil_type) {
      query += ' WHERE soil_type = ?';
      params.push(soil_type);
    }
    
    const result = await pool.execute(query, params);
    const rows = result[0];
    res.json(rows);
  } catch (error) {
    console.error('Soil health error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Weather route
app.get('/api/weather', async (req, res) => {
  try {
    const { location } = req.query;
    
    let query = 'SELECT * FROM weather';
    let params = [];
    
    if (location) {
      query += ' WHERE location = ?';
      params.push(location);
    }
    
    const result = await pool.execute(query, params);
    const rows = result[0];
    res.json(rows);
  } catch (error) {
    console.error('Weather error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Market Prices route
app.get('/api/market', async (req, res) => {
  try {
    const { location, crop } = req.query;
    
    let query = 'SELECT * FROM market';
    let params = [];
    let conditions = [];
    
    if (location) {
      conditions.push('location = ?');
      params.push(location);
    }
    
    if (crop) {
      conditions.push('crop = ?');
      params.push(crop);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    const result = await pool.execute(query, params);
    const rows = result[0];
    res.json(rows);
  } catch (error) {
    console.error('Market prices error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Profile route
app.get('/api/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const profileResult = await pool.execute(
      'SELECT id, name, phone, location, soil_type, last_crop FROM users WHERE id = ?',
      [userId]
    );
    const rows = profileResult[0];

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Feedback route
app.post('/api/feedback', async (req, res) => {
  try {
    const { user_id, feedback_text } = req.body;
    
    if (!user_id || !feedback_text) {
      return res.status(400).json({ error: 'User ID and feedback text are required' });
    }

    const feedbackResult = await pool.execute(
      'INSERT INTO feedback (user_id, feedback_text) VALUES (?, ?)',
      [user_id, feedback_text]
    );
    const result = feedbackResult[0];

    res.status(201).json({ 
      message: 'Feedback submitted successfully', 
      feedbackId: result.insertId 
    });
  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Smart Crop Advisory API is running' });
});

// Start server
const startServer = async () => {
  await initializeApp();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('API endpoints available:');
    console.log('- POST /api/login');
    console.log('- POST /api/signup');
    console.log('- POST /api/advisory');
    console.log('- GET /api/soil');
    console.log('- GET /api/weather');
    console.log('- GET /api/market');
    console.log('- GET /api/profile/:userId');
    console.log('- POST /api/feedback');
    console.log('- GET /api/health');
  });
};

startServer().catch(console.error);
