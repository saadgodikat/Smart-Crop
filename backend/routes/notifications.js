const express = require('express');
const router = express.Router();
const notificationService = require('../services/notificationService');

// Register push token
router.post('/register-token', async (req, res) => {
  try {
    const { userId, pushToken } = req.body;
    
    if (!userId || !pushToken) {
      return res.status(400).json({ error: 'User ID and push token required' });
    }

    const result = await notificationService.registerPushToken(userId, pushToken);
    res.json(result);
  } catch (error) {
    console.error('Error registering push token:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send test notification
router.post('/test', async (req, res) => {
  try {
    const { pushToken } = req.body;
    
    if (!pushToken) {
      return res.status(400).json({ error: 'Push token required' });
    }

    const result = await notificationService.sendTestNotification(pushToken);
    res.json(result);
  } catch (error) {
    console.error('Error sending test notification:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send alert notification
router.post('/send-alert/:alertId', async (req, res) => {
  try {
    const { alertId } = req.params;
    
    if (!alertId) {
      return res.status(400).json({ error: 'Alert ID required' });
    }

    const result = await notificationService.sendAlertNotification(alertId);
    res.json(result);
  } catch (error) {
    console.error('Error sending alert notification:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;