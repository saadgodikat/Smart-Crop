import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Text,
  Surface,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

export default function DashboardScreen({ navigation, user }) {
  const menuItems = [
    {
      title: 'Crop Advisory',
      titleHindi: 'फसल सलाह',
      icon: 'leaf',
      color: '#4CAF50',
      screen: 'Advisory',
      description: 'Get crop recommendations based on soil and previous crops',
    },
    {
      title: 'Soil Health',
      titleHindi: 'मिट्टी स्वास्थ्य',
      icon: 'earth',
      color: '#8BC34A',
      screen: 'Soil',
      description: 'Check soil health and get improvement suggestions',
    },
    {
      title: 'Weather',
      titleHindi: 'मौसम',
      icon: 'cloud',
      color: '#2196F3',
      screen: 'Weather',
      description: 'Current weather conditions and forecasts',
    },
    {
      title: 'Market Prices',
      titleHindi: 'बाजार मूल्य',
      icon: 'trending-up',
      color: '#FF9800',
      screen: 'Market',
      description: 'Latest crop prices in your area',
    },
  ];

  const additionalItems = [
    {
      title: 'Feedback',
      titleHindi: 'प्रतिक्रिया',
      icon: 'chatbubble',
      color: '#9C27B0',
      screen: 'Feedback',
    },
    {
      title: 'Help',
      titleHindi: 'सहायता',
      icon: 'help-circle',
      color: '#607D8B',
      screen: 'Help',
    },
  ];

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <Surface style={styles.welcomeCard} elevation={2}>
        <View style={styles.welcomeContent}>
          <Ionicons name="leaf" size={40} color="#4CAF50" />
          <View style={styles.welcomeText}>
            <Title style={styles.welcomeTitle}>
              Welcome, {user?.name || 'Farmer'}!
            </Title>
            <Paragraph style={styles.welcomeSubtitle}>
              नमस्ते, {user?.name || 'किसान'}! Smart farming solutions at your fingertips.
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Main Features Grid */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Main Features / मुख्य सुविधाएं</Title>
        <View style={styles.grid}>
          {menuItems.map((item, index) => (
            <Card
              key={index}
              style={[styles.menuCard, { backgroundColor: item.color + '10' }]}
              onPress={() => navigateToScreen(item.screen)}
            >
              <Card.Content style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={32} color={item.color} />
                </View>
                <Title style={[styles.cardTitle, { color: item.color }]}>
                  {item.title}
                </Title>
                <Text style={styles.cardTitleHindi}>{item.titleHindi}</Text>
                <Paragraph style={styles.cardDescription}>
                  {item.description}
                </Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>

      {/* Additional Options */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>More Options / अधिक विकल्प</Title>
        <View style={styles.additionalGrid}>
          {additionalItems.map((item, index) => (
            <Card
              key={index}
              style={[styles.additionalCard, { backgroundColor: item.color + '10' }]}
              onPress={() => navigateToScreen(item.screen)}
            >
              <Card.Content style={styles.additionalCardContent}>
                <Ionicons name={item.icon} size={24} color={item.color} />
                <Text style={[styles.additionalTitle, { color: item.color }]}>
                  {item.title}
                </Text>
                <Text style={styles.additionalTitleHindi}>{item.titleHindi}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>

      {/* User Info Card */}
      {user && (
        <Card style={styles.userInfoCard}>
          <Card.Content>
            <Title style={styles.userInfoTitle}>Your Profile / आपकी प्रोफाइल</Title>
            <View style={styles.userInfoRow}>
              <Ionicons name="person" size={20} color="#666" />
              <Text style={styles.userInfoText}>Name: {user.name}</Text>
            </View>
            <View style={styles.userInfoRow}>
              <Ionicons name="call" size={20} color="#666" />
              <Text style={styles.userInfoText}>Phone: {user.phone}</Text>
            </View>
            {user.location && (
              <View style={styles.userInfoRow}>
                <Ionicons name="location" size={20} color="#666" />
                <Text style={styles.userInfoText}>Location: {user.location}</Text>
              </View>
            )}
            {user.soil_type && (
              <View style={styles.userInfoRow}>
                <Ionicons name="earth" size={20} color="#666" />
                <Text style={styles.userInfoText}>Soil Type: {user.soil_type}</Text>
              </View>
            )}
          </Card.Content>
        </Card>
      )}

      {/* Tips Section */}
      <Card style={styles.tipsCard}>
        <Card.Content>
          <Title style={styles.tipsTitle}>💡 Farming Tips / कृषि सुझाव</Title>
          <Paragraph style={styles.tipText}>
            • Monitor soil health regularly for better crop yields
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Check weather forecasts before planting
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Compare market prices to maximize profits
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
  welcomeCard: {
    margin: 15,
    borderRadius: 12,
    backgroundColor: '#E8F5E8',
  },
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    marginLeft: 15,
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: cardWidth,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  iconContainer: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  cardTitleHindi: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
    lineHeight: 14,
  },
  additionalGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  additionalCard: {
    width: cardWidth,
    borderRadius: 12,
    elevation: 2,
  },
  additionalCardContent: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  additionalTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 2,
  },
  additionalTitleHindi: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  userInfoCard: {
    margin: 15,
    borderRadius: 12,
    elevation: 2,
  },
  userInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  tipsCard: {
    margin: 15,
    marginBottom: 30,
    borderRadius: 12,
    elevation: 2,
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
