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
import { getTranslation } from '../utils/translations';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

export default function DashboardScreen({ navigation, user, language = 'en' }) {
  const t = (key) => getTranslation(language, key);
  const menuItems = [
    {
      title: t('cropAdvisory'),
      icon: 'leaf',
      color: '#4CAF50',
      screen: 'Advisory',
      description: 'Get crop recommendations based on soil and previous crops',
    },
    {
      title: t('soilHealth'),
      icon: 'earth',
      color: '#8BC34A',
      screen: 'SoilHealthMethod',
      description: 'Check soil health and get improvement suggestions',
    },
    {
      title: t('weather'),
      icon: 'cloud',
      color: '#2196F3',
      screen: 'Weather',
      description: 'Current weather conditions and forecasts',
    },
    {
      title: t('marketPrices'),
      icon: 'trending-up',
      color: '#FF9800',
      screen: 'Market',
      description: 'Latest crop prices in your area',
    },
    {
      title: 'Pest Detection',
      icon: 'bug',
      color: '#FF5722',
      screen: 'PestDetection',
      description: 'Identify crop diseases and pests using camera',
    },
  ];

  const additionalItems = [
    {
      title: t('feedback'),
      icon: 'chatbubble',
      color: '#9C27B0',
      screen: 'Feedback',
    },
    {
      title: t('help'),
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
      {/* Header with App Name and Profile */}
      <Surface style={styles.headerCard} elevation={3}>
        <View style={styles.headerContent}>
          <View style={styles.appNameContainer}>
            <Ionicons name="leaf" size={28} color="#4CAF50" />
            <Title style={styles.appName}>{t('appName')}</Title>
          </View>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Profile')}
            style={styles.profileButton}
            contentStyle={styles.profileButtonContent}
          >
            <Ionicons name="person-circle" size={32} color="#4CAF50" />
          </Button>
        </View>
      </Surface>

      {/* Welcome Section */}
      <Surface style={styles.welcomeCard} elevation={2}>
        <View style={styles.welcomeContent}>
          <Ionicons name="leaf" size={40} color="#4CAF50" />
          <View style={styles.welcomeText}>
            <Title style={styles.welcomeTitle}>
              {t('welcome')}, {user?.name || 'Farmer'}!
            </Title>
            <Paragraph style={styles.welcomeSubtitle}>
              {t('smartFarmingSolutions')}
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Main Features Grid */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>{t('mainFeatures')}</Title>
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
        <Title style={styles.sectionTitle}>{t('moreOptions')}</Title>
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
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>



      {/* Tips Section */}
      <Card style={styles.tipsCard}>
        <Card.Content>
          <Title style={styles.tipsTitle}>💡 {t('farmingTips')}</Title>
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
  headerCard: {
    margin: 15,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  appNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 10,
    marginRight: 5,
  },
  appNameHindi: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 5,
  },
  profileButton: {
    margin: 0,
    padding: 0,
  },
  profileButtonContent: {
    margin: 0,
    padding: 0,
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
