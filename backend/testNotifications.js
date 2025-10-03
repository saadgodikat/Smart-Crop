const notificationService = require('./services/notificationService');
const { pool } = require('./database');

// Test script to create alerts and send notifications
async function testNotificationSystem() {
  console.log('🚀 Testing Notification System...\n');

  try {
    // Test 1: Create a weather alert
    console.log('1. Creating weather alert...');
    const weatherAlert = {
      title: 'Heavy Rainfall Alert',
      message: 'Heavy rainfall expected in next 24 hours. Protect your crops and ensure proper drainage.',
      alert_type: 'weather',
      severity: 'high',
      location: 'Maharashtra',
      crop_type: null,
      expires_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')
    };

    const createQuery = `
      INSERT INTO alerts (title, message, alert_type, severity, location, crop_type, expires_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await new Promise((resolve, reject) => {
      pool.query(createQuery, [
        weatherAlert.title,
        weatherAlert.message,
        weatherAlert.alert_type,
        weatherAlert.severity,
        weatherAlert.location,
        weatherAlert.crop_type,
        weatherAlert.expires_at
      ], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    const alertId = result.insertId;
    console.log(`✅ Weather alert created with ID: ${alertId}`);

    // Test 2: Send notification for the alert
    console.log('\n2. Sending push notification...');
    const notificationResult = await notificationService.sendAlertNotification(alertId);
    
    if (notificationResult.success) {
      console.log(`✅ Notification sent successfully to ${notificationResult.sentTo} users`);
      console.log(`📱 Alert: ${notificationResult.alertTitle}`);
    } else {
      console.log(`❌ Notification failed: ${notificationResult.error}`);
    }

    // Test 3: Create a critical pest alert
    console.log('\n3. Creating critical pest alert...');
    const pestAlert = {
      title: 'Bollworm Attack Warning',
      message: 'Bollworm attack reported in nearby areas. Check your cotton crops immediately and apply pesticide.',
      alert_type: 'pest',
      severity: 'critical',
      location: 'Solapur',
      crop_type: 'cotton',
      expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')
    };

    const pestResult = await new Promise((resolve, reject) => {
      pool.query(createQuery, [
        pestAlert.title,
        pestAlert.message,
        pestAlert.alert_type,
        pestAlert.severity,
        pestAlert.location,
        pestAlert.crop_type,
        pestAlert.expires_at
      ], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    const pestAlertId = pestResult.insertId;
    console.log(`✅ Pest alert created with ID: ${pestAlertId}`);

    // Send notification for pest alert
    const pestNotificationResult = await notificationService.sendAlertNotification(pestAlertId);
    
    if (pestNotificationResult.success) {
      console.log(`✅ Critical notification sent to ${pestNotificationResult.sentTo} users`);
    } else {
      console.log(`❌ Critical notification failed: ${pestNotificationResult.error}`);
    }

    // Test 4: Show alert statistics
    console.log('\n4. Alert Statistics:');
    const statsQuery = `
      SELECT 
        alert_type,
        severity,
        COUNT(*) as count
      FROM alerts 
      WHERE is_active = TRUE 
      GROUP BY alert_type, severity
      ORDER BY alert_type, severity
    `;

    const stats = await new Promise((resolve, reject) => {
      pool.query(statsQuery, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    console.log('📊 Current alerts in system:');
    stats.forEach(stat => {
      console.log(`   ${stat.alert_type} (${stat.severity}): ${stat.count}`);
    });

    console.log('\n✅ Notification system test completed successfully!');
    console.log('\n📱 To test on mobile:');
    console.log('1. Install Expo Go app on your phone');
    console.log('2. Run "expo start" in frontend directory');
    console.log('3. Scan QR code to open app');
    console.log('4. Login and check notifications permission');
    console.log('5. Navigate to Alerts screen to see alerts');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    process.exit(0);
  }
}

// Run the test
testNotificationSystem();