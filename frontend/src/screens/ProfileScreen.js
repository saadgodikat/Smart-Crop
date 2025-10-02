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

export default function ProfileScreen({ user, navigation }) {
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);

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
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // This would be handled by the parent component
            // For now, we'll just show an alert
            Alert.alert('Logged Out', 'You have been logged out successfully');
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
        <Text style={styles.loadingText}>Loading profile...</Text>
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
            <Text style={styles.userRole}>Smart Farmer / स्मार्ट किसान</Text>
          </View>
        </View>
      </Surface>

      {/* Profile Details */}
      <Card style={styles.detailsCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Profile Information / प्रोफाइल जानकारी</Title>
          
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="person" size={20} color="#4CAF50" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Full Name</Text>
              <Text style={styles.detailValue}>{profile?.name || 'Not provided'}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="call" size={20} color="#4CAF50" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Phone Number</Text>
              <Text style={styles.detailValue}>{profile?.phone || 'Not provided'}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="location" size={20} color="#4CAF50" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{profile?.location || 'Not provided'}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="earth" size={20} color="#4CAF50" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Soil Type</Text>
              <Text style={styles.detailValue}>{profile?.soil_type || 'Not specified'}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="leaf" size={20} color="#4CAF50" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Last Crop</Text>
              <Text style={styles.detailValue}>{profile?.last_crop || 'Not specified'}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Farming Statistics */}
      <Card style={styles.statsCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Farming Statistics / कृषि आंकड़े</Title>
          
          <View style={styles.statsGrid}>
            <Surface style={styles.statItem} elevation={1}>
              <Ionicons name="leaf" size={24} color="#4CAF50" />
              <Text style={styles.statValue}>5+</Text>
              <Text style={styles.statLabel}>Crops Grown</Text>
            </Surface>

            <Surface style={styles.statItem} elevation={1}>
              <Ionicons name="calendar" size={24} color="#2196F3" />
              <Text style={styles.statValue}>2+</Text>
              <Text style={styles.statLabel}>Years Active</Text>
            </Surface>

            <Surface style={styles.statItem} elevation={1}>
              <Ionicons name="trending-up" size={24} color="#FF9800" />
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </Surface>

            <Surface style={styles.statItem} elevation={1}>
              <Ionicons name="star" size={24} color="#9C27B0" />
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </Surface>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.actionsCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Quick Actions / त्वरित कार्य</Title>
          
          <Button
            mode="contained"
            onPress={handleFeedback}
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
            icon="chat"
          >
            Send Feedback / प्रतिक्रिया भेजें
          </Button>

          <Button
            mode="outlined"
            onPress={handleHelp}
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
            icon="help-circle"
          >
            Help & Support / सहायता और समर्थन
          </Button>

          <Button
            mode="text"
            onPress={handleLogout}
            style={[styles.actionButton, styles.logoutButton]}
            contentStyle={styles.buttonContent}
            icon="log-out"
            textColor="#F44336"
          >
            Logout / लॉगआउट
          </Button>
        </Card.Content>
      </Card>

      {/* App Information */}
      <Card style={styles.infoCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>App Information / ऐप की जानकारी</Title>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>App Version:</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Updated:</Text>
            <Text style={styles.infoValue}>December 2024</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Developer:</Text>
            <Text style={styles.infoValue}>Smart Crop Advisory Team</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Tips */}
      <Card style={styles.tipsCard} elevation={2}>
        <Card.Content>
          <Title style={styles.tipsTitle}>💡 Profile Tips / प्रोफाइल सुझाव</Title>
          <Paragraph style={styles.tipText}>
            • Keep your profile updated with current farming information
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Accurate soil type helps in better crop recommendations
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Share feedback to help improve the app
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Use help section for any queries or support
          </Paragraph>
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
