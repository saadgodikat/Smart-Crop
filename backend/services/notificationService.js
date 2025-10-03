const { Expo } = require('expo-server-sdk');
const { pool } = require('../database');

class NotificationService {
  constructor() {
    this.expo = new Expo();
  }

  // Register push token for user
  async registerPushToken(userId, pushToken) {
    if (!Expo.isExpoPushToken(pushToken)) {
      throw new Error('Invalid push token');
    }

    const query = 'UPDATE users SET push_token = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      pool.query(query, [pushToken, userId], (err) => {
        if (err) reject(err);
        else resolve({ success: true });
      });
    });
  }

  // Send notification to specific user
  async sendNotificationToUser(userId, title, message, data = {}) {
    const query = 'SELECT push_token FROM users WHERE id = ?';
    
    return new Promise((resolve, reject) => {
      pool.query(query, [userId], async (err, results) => {
        if (err) return reject(err);
        
        if (results.length === 0 || !results[0].push_token) {
          return resolve({ success: false, error: 'No push token found' });
        }

        const pushToken = results[0].push_token;
        
        if (!Expo.isExpoPushToken(pushToken)) {
          return resolve({ success: false, error: 'Invalid push token' });
        }

        const messages = [{
          to: pushToken,
          sound: 'default',
          title: title,
          body: message,
          data: data,
        }];

        try {
          const chunks = this.expo.chunkPushNotifications(messages);
          const tickets = [];

          for (let chunk of chunks) {
            const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
          }

          resolve({ success: true, tickets });
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  // Send notification to multiple users by location
  async sendNotificationByLocation(location, title, message, data = {}) {
    const query = 'SELECT push_token FROM users WHERE location = ? AND push_token IS NOT NULL';
    
    return new Promise((resolve, reject) => {
      pool.query(query, [location], async (err, results) => {
        if (err) return reject(err);
        
        const validTokens = results
          .map(row => row.push_token)
          .filter(token => Expo.isExpoPushToken(token));

        if (validTokens.length === 0) {
          return resolve({ success: false, error: 'No valid push tokens found' });
        }

        const messages = validTokens.map(token => ({
          to: token,
          sound: 'default',
          title: title,
          body: message,
          data: data,
        }));

        try {
          const chunks = this.expo.chunkPushNotifications(messages);
          const tickets = [];

          for (let chunk of chunks) {
            const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
          }

          resolve({ success: true, tickets, sentTo: validTokens.length });
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  // Send alert notification based on alert data
  async sendAlertNotification(alertId) {
    const alertQuery = `
      SELECT a.*, u.id as user_id, u.push_token, u.location
      FROM alerts a
      JOIN users u ON (a.location IS NULL OR a.location = u.location OR a.location = 'Maharashtra')
      JOIN alert_subscriptions sub ON sub.user_id = u.id AND sub.alert_type = a.alert_type
      WHERE a.id = ? AND a.is_active = TRUE AND sub.is_enabled = TRUE AND u.push_token IS NOT NULL
    `;

    return new Promise((resolve, reject) => {
      pool.query(alertQuery, [alertId], async (err, results) => {
        if (err) return reject(err);
        
        if (results.length === 0) {
          return resolve({ success: false, error: 'No users to notify' });
        }

        const alert = results[0];
        const validTokens = results
          .map(row => row.push_token)
          .filter(token => Expo.isExpoPushToken(token));

        if (validTokens.length === 0) {
          return resolve({ success: false, error: 'No valid push tokens' });
        }

        const messages = validTokens.map(token => ({
          to: token,
          sound: alert.severity === 'critical' ? 'default' : 'default',
          title: alert.title,
          body: alert.message,
          data: {
            alertId: alert.id,
            alertType: alert.alert_type,
            severity: alert.severity,
            screen: 'Alerts'
          },
          priority: alert.severity === 'critical' ? 'high' : 'normal',
        }));

        try {
          const chunks = this.expo.chunkPushNotifications(messages);
          const tickets = [];

          for (let chunk of chunks) {
            const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
          }

          // Create user_alerts entries
          const userIds = [...new Set(results.map(row => row.user_id))];
          const insertPromises = userIds.map(userId => {
            return new Promise((resolve, reject) => {
              const insertQuery = 'INSERT IGNORE INTO user_alerts (user_id, alert_id) VALUES (?, ?)';
              pool.query(insertQuery, [userId, alertId], (err) => {
                if (err) reject(err);
                else resolve();
              });
            });
          });

          await Promise.all(insertPromises);

          resolve({ 
            success: true, 
            tickets, 
            sentTo: validTokens.length,
            alertTitle: alert.title 
          });
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  // Test notification
  async sendTestNotification(pushToken) {
    if (!Expo.isExpoPushToken(pushToken)) {
      throw new Error('Invalid push token');
    }

    const message = {
      to: pushToken,
      sound: 'default',
      title: 'Test Notification',
      body: 'Your push notifications are working!',
      data: { test: true },
    };

    try {
      const tickets = await this.expo.sendPushNotificationsAsync([message]);
      return { success: true, tickets };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new NotificationService();