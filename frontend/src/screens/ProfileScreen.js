import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Text,
  Surface,
  ActivityIndicator,
  Button,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../services/api';

export default function ProfileScreen({ user, navigation, onLogout, language = 'en' }) {
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);

  const isPunjabi = language === 'pa';
  const isHindi = language === 'hi';
  const fontFamily = isPunjabi ? 'NotoSansGurmukhi-Regular' : isHindi ? 'NotoSansDevanagari-Regular' : 'System';

  const content = {
    en: {
      loadingText: 'Loading profile...',
      userRole: 'Smart Farmer',
      profileInfo: 'Profile Information',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      location: 'Location',
      notProvided: 'Not provided',
      farmingStats: 'Farming Statistics',
      cropsGrown: 'Crops Grown',
      yearsActive: 'Years Active',
      successRate: 'Success Rate',
      rating: 'Rating',
      quickActions: 'Quick Actions',
      sendFeedback: 'Send Feedback',
      helpSupport: 'Help & Support',
      logout: 'Logout',
      appInfo: 'App Information',
      appVersion: 'App Version:',
      lastUpdated: 'Last Updated:',
      developer: 'Developer:',
      profileTips: '💡 Profile Tips',
      tips: [
        '• Keep your profile updated with current farming information',
        '• Share feedback to help improve the app',
        '• Use help section for any queries or support'
      ],
      logoutTitle: 'Logout',
      logoutMessage: 'Are you sure you want to logout?',
      cancel: 'Cancel',
      error: 'Error',
      logoutError: 'Logout function not available'
    },
    hi: {
      loadingText: 'प्रोफाइल लोड हो रहा है...',
      userRole: 'स्मार्ट किसान',
      profileInfo: 'प्रोफाइल जानकारी',
      fullName: 'पूरा नाम',
      phoneNumber: 'फोन नंबर',
      location: 'स्थान',
      notProvided: 'प्रदान नहीं किया गया',
      farmingStats: 'कृषि आंकड़े',
      cropsGrown: 'उगाई गई फसलें',
      yearsActive: 'सक्रिय वर्ष',
      successRate: 'सफलता दर',
      rating: 'रेटिंग',
      quickActions: 'त्वरित कार्य',
      sendFeedback: 'प्रतिक्रिया भेजें',
      helpSupport: 'सहायता और समर्थन',
      logout: 'लॉगआउट',
      appInfo: 'ऐप की जानकारी',
      appVersion: 'ऐप संस्करण:',
      lastUpdated: 'अंतिम अपडेट:',
      developer: 'डेवलपर:',
      profileTips: '💡 प्रोफाइल सुझाव',
      tips: [
        '• अपनी प्रोफाइल को वर्तमान कृषि जानकारी के साथ अपडेट रखें',
        '• ऐप को बेहतर बनाने में मदद के लिए फीडबैक साझा करें',
        '• किसी भी प्रश्न या सहायता के लिए सहायता अनुभाग का उपयोग करें'
      ],
      logoutTitle: 'लॉगआउट',
      logoutMessage: 'क्या आप वाकई लॉगआउट करना चाहते हैं?',
      cancel: 'रद्द करें',
      error: 'त्रुटि',
      logoutError: 'लॉगआउट फ़ंक्शन उपलब्ध नहीं है'
    },
    pa: {
      loadingText: 'ਪ੍ਰੋਫਾਈਲ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
      userRole: 'ਸਮਾਰਟ ਕਿਸਾਨ',
      profileInfo: 'ਪ੍ਰੋਫਾਈਲ ਜਾਣਕਾਰੀ',
      fullName: 'ਪੂਰਾ ਨਾਮ',
      phoneNumber: 'ਫੋਨ ਨੰਬਰ',
      location: 'ਸਥਾਨ',
      notProvided: 'ਪ੍ਰਦਾਨ ਨਹੀਂ ਕੀਤਾ ਗਿਆ',
      farmingStats: 'ਖੇਤੀ ਅੰਕੜੇ',
      cropsGrown: 'ਉਗਾਈਆਂ ਫਸਲਾਂ',
      yearsActive: 'ਸਰਗਰਮ ਸਾਲ',
      successRate: 'ਸਫਲਤਾ ਦਰ',
      rating: 'ਰੇਟਿੰਗ',
      quickActions: 'ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ',
      sendFeedback: 'ਫੀਡਬੈਕ ਭੇਜੋ',
      helpSupport: 'ਮਦਦ ਅਤੇ ਸਹਾਇਤਾ',
      logout: 'ਲਾਗਆਉਟ',
      appInfo: 'ਐਪ ਜਾਣਕਾਰੀ',
      appVersion: 'ਐਪ ਵਰਜ਼ਨ:',
      lastUpdated: 'ਆਖਰੀ ਅਪਡੇਟ:',
      developer: 'ਡਿਵੈਲਪਰ:',
      profileTips: '💡 ਪ੍ਰੋਫਾਈਲ ਸੁਝਾਅ',
      tips: [
        '• ਆਪਣੀ ਪ੍ਰੋਫਾਈਲ ਨੂੰ ਮੌਜੂਦਾ ਖੇਤੀ ਜਾਣਕਾਰੀ ਨਾਲ ਅਪਡੇਟ ਰੱਖੋ',
        '• ਐਪ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਲਈ ਫੀਡਬੈਕ ਸਾਂਝਾ ਕਰੋ',
        '• ਕਿਸੇ ਵੀ ਸਵਾਲ ਜਾਂ ਸਹਾਇਤਾ ਲਈ ਮਦਦ ਸੈਕਸ਼ਨ ਦਾ ਵਰਤੋਂ ਕਰੋ'
      ],
      logoutTitle: 'ਲਾਗਆਉਟ',
      logoutMessage: 'ਕੀ ਤੁਸੀਂ ਸੱਚਮੁੱਚ ਲਾਗਆਉਟ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
      cancel: 'ਰੱਦ ਕਰੋ',
      error: 'ਗਲਤੀ',
      logoutError: 'ਲਾਗਆਉਟ ਫੰਕਸ਼ਨ ਉਪਲਬਧ ਨਹੀਂ ਹੈ'
    }
  };

  const t = content[isPunjabi ? 'pa' : isHindi ? 'hi' : 'en'];

  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user?.id]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const response = await ApiService.getProfile(user.id);
      setProfile(response);
    } catch (error) {
      Alert.alert(t.error, error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      t.logoutTitle,
      t.logoutMessage,
      [
        { text: t.cancel, style: 'cancel' },
        { 
          text: t.logout, 
          style: 'destructive',
          onPress: () => {
            console.log('Logout button pressed, onLogout:', typeof onLogout);
            if (onLogout) {
              onLogout();
            } else {
              Alert.alert(t.error, t.logoutError);
            }
          }
        }
      ]
    );
  };

  const handleFeedback = () => {
    navigation.navigate('Feedback');
  };

  const handleHelp = () => {
    navigation.navigate('Help');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={[styles.loadingText, { fontFamily }]}>{t.loadingText}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <Surface style={styles.headerCard} elevation={3}>
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={50} color="#4CAF50" />
          </View>
          <View style={styles.userInfo}>
            <Title style={styles.userName}>{profile?.name || 'Farmer'}</Title>
            <Text style={styles.userPhone}>{profile?.phone || 'N/A'}</Text>
            <Text style={[styles.userRole, { fontFamily }]}>{t.userRole}</Text>
          </View>
        </View>
      </Surface>

      {/* Profile Details */}
      <Card style={styles.detailsCard} elevation={2}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { fontFamily }]}>{t.profileInfo}</Title>
          
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="person" size={20} color="#4CAF50" />
            </View>
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { fontFamily }]}>{t.fullName}</Text>
              <Text style={styles.detailValue}>{profile?.name || t.notProvided}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="call" size={20} color="#4CAF50" />
            </View>
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { fontFamily }]}>{t.phoneNumber}</Text>
              <Text style={styles.detailValue}>{profile?.phone || t.notProvided}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="location" size={20} color="#4CAF50" />
            </View>
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { fontFamily }]}>{t.location}</Text>
              <Text style={styles.detailValue}>{profile?.location || t.notProvided}</Text>
            </View>
          </View>


        </Card.Content>
      </Card>

      {/* Farming Statistics */}
      <Card style={styles.statsCard} elevation={2}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { fontFamily }]}>{t.farmingStats}</Title>
          
          <View style={styles.statsGrid}>
            <Surface style={styles.statItem} elevation={1}>
              <Ionicons name="leaf" size={24} color="#4CAF50" />
              <Text style={styles.statValue}>5+</Text>
              <Text style={[styles.statLabel, { fontFamily }]}>{t.cropsGrown}</Text>
            </Surface>

            <Surface style={styles.statItem} elevation={1}>
              <Ionicons name="calendar" size={24} color="#2196F3" />
              <Text style={styles.statValue}>2+</Text>
              <Text style={[styles.statLabel, { fontFamily }]}>{t.yearsActive}</Text>
            </Surface>

            <Surface style={styles.statItem} elevation={1}>
              <Ionicons name="trending-up" size={24} color="#FF9800" />
              <Text style={styles.statValue}>85%</Text>
              <Text style={[styles.statLabel, { fontFamily }]}>{t.successRate}</Text>
            </Surface>

            <Surface style={styles.statItem} elevation={1}>
              <Ionicons name="star" size={24} color="#9C27B0" />
              <Text style={styles.statValue}>4.8</Text>
              <Text style={[styles.statLabel, { fontFamily }]}>{t.rating}</Text>
            </Surface>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.actionsCard} elevation={2}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { fontFamily }]}>{t.quickActions}</Title>
          
          <Button
            mode="contained"
            onPress={handleFeedback}
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
            icon="chat"
          >
            <Text style={{ fontFamily, color: '#fff', fontWeight: 'bold' }}>{t.sendFeedback}</Text>
          </Button>

          <Button
            mode="outlined"
            onPress={handleHelp}
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
            icon="help-circle"
          >
            <Text style={{ fontFamily, color: '#4CAF50', fontWeight: 'bold' }}>{t.helpSupport}</Text>
          </Button>

          <Button
            mode="text"
            onPress={handleLogout}
            style={[styles.actionButton, styles.logoutButton]}
            contentStyle={styles.buttonContent}
            icon="log-out"
            textColor="#F44336"
          >
            <Text style={{ fontFamily, color: '#F44336', fontWeight: 'bold' }}>{t.logout}</Text>
          </Button>
        </Card.Content>
      </Card>

      {/* App Information */}
      <Card style={styles.infoCard} elevation={2}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { fontFamily }]}>{t.appInfo}</Title>
          
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { fontFamily }]}>{t.appVersion}</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { fontFamily }]}>{t.lastUpdated}</Text>
            <Text style={styles.infoValue}>December 2024</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { fontFamily }]}>{t.developer}</Text>
            <Text style={styles.infoValue}>Smart Crop Advisory Team</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Tips */}
      <Card style={styles.tipsCard} elevation={2}>
        <Card.Content>
          <Title style={[styles.tipsTitle, { fontFamily }]}>{t.profileTips}</Title>
          {t.tips.map((tip, index) => (
            <Paragraph key={index} style={[styles.tipText, { fontFamily }]}>
              {tip}
            </Paragraph>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  headerCard: {
    margin: 15,
    borderRadius: 12,
    backgroundColor: '#E8F5E8',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    color: '#4CAF50',
    fontStyle: 'italic',
  },
  detailsCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statsCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F8F9FA',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  actionsCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  actionButton: {
    marginBottom: 10,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  logoutButton: {
    marginTop: 10,
  },
  infoCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  tipsCard: {
    margin: 15,
    marginBottom: 30,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    lineHeight: 16,
  },
});
