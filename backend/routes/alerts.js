const express = require('express');
const router = express.Router();
const { pool } = require('../database');
const notificationService = require('../services/notificationService');

// Get user alerts
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const query = `
      SELECT a.*, ua.is_read, ua.read_at
      FROM alerts a
      LEFT JOIN user_alerts ua ON a.id = ua.alert_id AND ua.user_id = ?
      JOIN users u ON u.id = ?
      JOIN alert_subscriptions sub ON sub.user_id = ? AND sub.alert_type = a.alert_type
      WHERE a.is_active = TRUE 
        AND (a.expires_at IS NULL OR a.expires_at > NOW())
        AND (a.location IS NULL OR a.location = u.location OR a.location = 'Maharashtra')
        AND sub.is_enabled = TRUE
      ORDER BY a.severity DESC, a.created_at DESC
    `;
    
    pool.query(query, [userId, userId, userId], (err, results) => {
      if (err) {
        console.error('Error fetching user alerts:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Error in get user alerts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mark alert as read
router.post('/mark-read', async (req, res) => {
  try {
    const { userId, alertId } = req.body;
    
    if (!userId || !alertId) {
      return res.status(400).json({ error: 'User ID and Alert ID required' });
    }

    const checkQuery = 'SELECT id FROM user_alerts WHERE user_id = ? AND alert_id = ?';
    
    pool.query(checkQuery, [userId, alertId], (err, results) => {
      if (err) {
        console.error('Error checking user alert:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (results.length > 0) {
        const updateQuery = 'UPDATE user_alerts SET is_read = TRUE, read_at = NOW() WHERE user_id = ? AND alert_id = ?';
        pool.query(updateQuery, [userId, alertId], (err) => {
          if (err) {
            console.error('Error updating user alert:', err);
            return res.status(500).json({ error: 'Database error' });
          }
          res.json({ success: true });
        });
      } else {
        const insertQuery = 'INSERT INTO user_alerts (user_id, alert_id, is_read, read_at) VALUES (?, ?, TRUE, NOW())';
        pool.query(insertQuery, [userId, alertId], (err) => {
          if (err) {
            console.error('Error inserting user alert:', err);
            return res.status(500).json({ error: 'Database error' });
          }
          res.json({ success: true });
        });
      }
    });
  } catch (error) {
    console.error('Error in mark alert as read:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new alert and send notification
router.post('/create', async (req, res) => {
  try {
    const { title, message, alert_type, severity, location, crop_type, expires_at } = req.body;
    
    if (!title || !message || !alert_type || !severity) {
      return res.status(400).json({ error: 'Title, message, alert_type, and severity required' });
    }

    const query = `
      INSERT INTO alerts (title, message, alert_type, severity, location, crop_type, expires_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    pool.query(query, [title, message, alert_type, severity, location, crop_type, expires_at], async (err, result) => {
      if (err) {
        console.error('Error creating alert:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      const alertId = result.insertId;
      
      // Send push notification
      try {
        const notificationResult = await notificationService.sendAlertNotification(alertId);
        res.json({ 
          success: true, 
          alertId, 
          notification: notificationResult 
        });
      } catch (notificationError) {
        console.error('Error sending notification:', notificationError);
        res.json({ 
          success: true, 
          alertId, 
          notification: { success: false, error: notificationError.message } 
        });
      }
    });
  } catch (error) {
    console.error('Error in create alert:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get alert statistics
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const query = `
      SELECT 
        COUNT(*) as total_alerts,
        SUM(CASE WHEN ua.is_read = FALSE OR ua.is_read IS NULL THEN 1 ELSE 0 END) as unread_alerts,
        SUM(CASE WHEN a.severity = 'critical' THEN 1 ELSE 0 END) as critical_alerts
      FROM alerts a
      LEFT JOIN user_alerts ua ON a.id = ua.alert_id AND ua.user_id = ?
      JOIN users u ON u.id = ?
      JOIN alert_subscriptions sub ON sub.user_id = ? AND sub.alert_type = a.alert_type
      WHERE a.is_active = TRUE 
        AND (a.expires_at IS NULL OR a.expires_at > NOW())
        AND (a.location IS NULL OR a.location = u.location OR a.location = 'Maharashtra')
        AND sub.is_enabled = TRUE
    `;
    
    pool.query(query, [userId, userId, userId], (err, results) => {
      if (err) {
        console.error('Error fetching alert stats:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results[0]);
    });
  } catch (error) {
    console.error('Error in get alert stats:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;