import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Card,
  Title,
  Text,
  Surface,
  Button,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function LanguageSelectionScreen({ onLanguageSelect }) {
  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      icon: '🇺🇸',
      color: '#2196F3',
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी',
      icon: '🇮🇳',
      color: '#FF9800',
    },
    {
      code: 'pa',
      name: 'Punjabi',
      nativeName: 'ਪੰਜਾਬੀ',
      icon: '🇮🇳',
      color: '#4CAF50',
    },
  ];

  const handleLanguageSelect = (languageCode) => {
    onLanguageSelect(languageCode);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Surface style={styles.headerCard} elevation={3}>
        <View style={styles.headerContent}>
          <Ionicons name="language" size={50} color="#4CAF50" />
          <Title style={styles.headerTitle}>Choose Language</Title>
          <Text style={styles.headerSubtitle}>भाषा चुनें | ਭਾਸ਼ਾ ਚੁਣੋ</Text>
        </View>
      </Surface>

      {/* Language Options */}
      <View style={styles.languageContainer}>
        {languages.map((language) => (
          <Card
            key={language.code}
            style={[styles.languageCard, { borderColor: language.color }]}
            elevation={4}
            onPress={() => handleLanguageSelect(language.code)}
          >
            <Card.Content style={styles.cardContent}>
              <Text style={styles.flagIcon}>{language.icon}</Text>
              <Title style={[styles.languageName, { color: language.color }]}>
                {language.name}
              </Title>
              <Text style={styles.nativeName}>{language.nativeName}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* App Info */}
      <Surface style={styles.infoCard} elevation={2}>
        <View style={styles.infoContent}>
          <Ionicons name="leaf" size={24} color="#4CAF50" />
          <Text style={styles.appName}>Krishi</Text>
          <Text style={styles.appDescription}>Smart Farming Solutions</Text>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerCard: {
    borderRadius: 15,
    backgroundColor: '#fff',
    marginBottom: 40,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  languageContainer: {
    marginBottom: 40,
  },
  languageCard: {
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  flagIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  languageName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  nativeName: {
    fontSize: 16,
    color: '#666',
  },
  infoCard: {
    borderRadius: 12,
    backgroundColor: '#E8F5E8',
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 10,
    marginRight: 10,
  },
  appDescription: {
    fontSize: 12,
    color: '#666',
  },
});