// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
// import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { API_BASE_URL } from './api';

// Configure notification behavior
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

class NotificationService {
  constructor() {
    this.expoPushToken = null;
    this.notificationListener = null;
    this.responseListener = null;
  }

  // Request notification permissions and get push token
  async registerForPushNotifications() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return null;
      }
      
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId,
      })).data;
      
      console.log('Push token:', token);
    } else {
      alert('Must use physical device for Push Notifications');
      return null;
    }

    this.expoPushToken = token;
    return token;
  }

  // Register push token with backend
  async registerTokenWithBackend(userId, pushToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/register-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          pushToken,
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Push token registered successfully');
        return result;
      } else {
        console.error('Failed to register push token:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error registering push token:', error);
      return { success: false, error: error.message };
    }
  }

  // Setup notification listeners
  setupNotificationListeners(navigation) {
    // Listen for notifications received while app is running
    this.notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
      // You can show in-app notification here
    });

    // Listen for user tapping on notification
    this.responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification tapped:', response);
      
      const data = response.notification.request.content.data;
      
      // Navigate to appropriate screen based on notification data
      if (data.screen) {
        navigation.navigate(data.screen, data);
      } else if (data.alertId) {
        navigation.navigate('Alerts', { alertId: data.alertId });
      }
    });
  }

  // Remove notification listeners
  removeNotificationListeners() {
    if (this.notificationListener) {
      Notifications.removeNotificationSubscription(this.notificationListener);
    }
    if (this.responseListener) {
      Notifications.removeNotificationSubscription(this.responseListener);
    }
  }

  // Send test notification
  async sendTestNotification(pushToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pushToken,
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending test notification:', error);
      return { success: false, error: error.message };
    }
  }

  // Get notification badge count
  async getBadgeCount() {
    return await Notifications.getBadgeCountAsync();
  }

  // Set notification badge count
  async setBadgeCount(count) {
    await Notifications.setBadgeCountAsync(count);
  }

  // Clear all notifications
  async clearAllNotifications() {
    await Notifications.dismissAllNotificationsAsync();
    await this.setBadgeCount(0);
  }

  // Schedule local notification (for testing)
  async scheduleLocalNotification(title, body, data = {}) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: 'default',
      },
      trigger: { seconds: 1 },
    });
  }
}

export default new NotificationService();