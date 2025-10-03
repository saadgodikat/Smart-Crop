import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Surface,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { getTranslation } from '../utils/translations';

export default function SoilHealthMethodScreen({ navigation, user, language = 'en' }) {
  const t = (key) => getTranslation(language, key);

  const methods = [
    {
      title: 'Lab Report',
      titleHindi: 'लैब रिपोर्ट',
      icon: 'flask',
      color: '#2196F3',
      description: 'Upload or enter your soil test lab report data',
      descriptionHindi: 'अपनी मिट्टी परीक्षण लैब रिपोर्ट डेटा अपलोड या दर्ज करें',
      action: () => navigation.navigate('Soil'),
    },
    {
      title: 'Soil Kit',
      titleHindi: 'मिट्टी किट',
      icon: 'hardware-chip',
      color: '#4CAF50',
      description: 'Purchase soil testing kit and test at home',
      descriptionHindi: 'मिट्टी परीक्षण किट खरीदें और घर पर परीक्षण करें',
      action: () => navigation.navigate('SoilKitPurchase'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Surface style={styles.headerCard} elevation={2}>
        <View style={styles.headerContent}>
          <Ionicons name="earth" size={40} color="#8BC34A" />
          <View style={styles.headerText}>
            <Title style={styles.headerTitle}>Soil Health Method</Title>
            <Title style={styles.headerTitleHindi}>मिट्टी स्वास्थ्य विधि</Title>
            <Paragraph style={styles.headerSubtitle}>
              Choose your preferred soil testing method
            </Paragraph>
            <Paragraph style={styles.headerSubtitleHindi}>
              अपनी पसंदीदा मिट्टी परीक्षण विधि चुनें
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Method Selection Cards */}
      <View style={styles.methodsContainer}>
        {methods.map((method, index) => (
          <Card
            key={index}
            style={[styles.methodCard, { backgroundColor: method.color + '10' }]}
            onPress={method.action}
          >
            <Card.Content style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Ionicons name={method.icon} size={48} color={method.color} />
              </View>
              <Title style={[styles.methodTitle, { color: method.color }]}>
                {method.title}
              </Title>
              <Title style={[styles.methodTitleHindi, { color: method.color }]}>
                {method.titleHindi}
              </Title>
              <Paragraph style={styles.methodDescription}>
                {method.description}
              </Paragraph>
              <Paragraph style={styles.methodDescriptionHindi}>
                {method.descriptionHindi}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Info Section */}
      <Card style={styles.infoCard}>
        <Card.Content>
          <Title style={styles.infoTitle}>ℹ️ Information</Title>
          <Paragraph style={styles.infoText}>
            • Lab Report: More accurate results from professional testing
          </Paragraph>
          <Paragraph style={styles.infoText}>
            • Soil Kit: Convenient home testing with instant results
          </Paragraph>
          <Paragraph style={styles.infoText}>
            • Both methods provide comprehensive soil health analysis
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
    borderRadius: 12,
    backgroundColor: '#E8F5E8',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    marginLeft: 15,
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8BC34A',
    marginBottom: 2,
  },
  headerTitleHindi: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8BC34A',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  headerSubtitleHindi: {
    fontSize: 11,
    color: '#666',
  },
  methodsContainer: {
    paddingHorizontal: 15,
  },
  methodCard: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 3,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  iconContainer: {
    marginBottom: 15,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  methodTitleHindi: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  methodDescription: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
    lineHeight: 16,
    marginBottom: 3,
  },
  methodDescriptionHindi: {
    fontSize: 11,
    textAlign: 'center',
    color: '#666',
    lineHeight: 15,
  },
  infoCard: {
    margin: 15,
    marginBottom: 30,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    lineHeight: 16,
  },
});