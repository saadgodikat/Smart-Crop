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
  
  const isPunjabi = language === 'pa';
  const isHindi = language === 'hi';
  const fontFamily = isPunjabi ? 'NotoSansGurmukhi-Regular' : isHindi ? 'NotoSansDevanagari-Regular' : 'System';

  const content = {
    en: {
      headerTitle: 'Soil Health Method',
      headerSubtitle: 'Choose your preferred soil testing method',
      infoTitle: 'ℹ️ Information',
      infoTexts: [
        '• Lab Report: More accurate results from professional testing',
        '• Soil Kit: Convenient home testing with instant results',
        '• Both methods provide comprehensive soil health analysis'
      ],
      methods: [
        {
          title: 'Lab Report',
          icon: 'flask',
          color: '#2196F3',
          description: 'Upload or enter your soil test lab report data',
          action: () => navigation.navigate('Soil'),
        },
        {
          title: 'Soil Kit',
          icon: 'hardware-chip',
          color: '#4CAF50',
          description: 'Purchase soil testing kit and test at home',
          action: () => navigation.navigate('SoilKitPurchase'),
        },
      ]
    },
    hi: {
      headerTitle: 'मिट्टी स्वास्थ्य विधि',
      headerSubtitle: 'अपनी पसंदीदा मिट्टी परीक्षण विधि चुनें',
      infoTitle: 'ℹ️ जानकारी',
      infoTexts: [
        '• लैब रिपोर्ट: पेशेवर परीक्षण से अधिक सटीक परिणाम',
        '• मिट्टी किट: तत्काल परिणामों के साथ सुविधाजनक घरेलू परीक्षण',
        '• दोनों विधियां व्यापक मिट्टी स्वास्थ्य विश्लेषण प्रदान करती हैं'
      ],
      methods: [
        {
          title: 'लैब रिपोर्ट',
          icon: 'flask',
          color: '#2196F3',
          description: 'अपनी मिट्टी परीक्षण लैब रिपोर्ट डेटा अपलोड या दर्ज करें',
          action: () => navigation.navigate('Soil'),
        },
        {
          title: 'मिट्टी किट',
          icon: 'hardware-chip',
          color: '#4CAF50',
          description: 'मिट्टी परीक्षण किट खरीदें और घर पर परीक्षण करें',
          action: () => navigation.navigate('SoilKitPurchase'),
        },
      ]
    },
    pa: {
      headerTitle: 'ਮਿੱਟੀ ਸਿਹਤ ਵਿਧੀ',
      headerSubtitle: 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਮਿੱਟੀ ਜਾਂਚ ਵਿਧੀ ਚੁਣੋ',
      infoTitle: 'ℹ️ ਜਾਣਕਾਰੀ',
      infoTexts: [
        '• ਲੈਬ ਰਿਪੋਰਟ: ਪੇਸ਼ੇਵਰ ਜਾਂਚ ਤੋਂ ਵਧੇਰੇ ਸਟੀਕ ਨਤੀਜੇ',
        '• ਮਿੱਟੀ ਕਿੱਟ: ਤੁਰੰਤ ਨਤੀਜਿਆਂ ਦੇ ਨਾਲ ਸੁਵਿਧਾਜਨਕ ਘਰੇਲੂ ਜਾਂਚ',
        '• ਦੋਵੇਂ ਵਿਧੀਆਂ ਵਿਆਪਕ ਮਿੱਟੀ ਸਿਹਤ ਵਿਸ਼ਲੇਸ਼ਣ ਪ੍ਰਦਾਨ ਕਰਦੀਆਂ ਹਨ'
      ],
      methods: [
        {
          title: 'ਲੈਬ ਰਿਪੋਰਟ',
          icon: 'flask',
          color: '#2196F3',
          description: 'ਆਪਣੀ ਮਿੱਟੀ ਜਾਂਚ ਲੈਬ ਰਿਪੋਰਟ ਡੇਟਾ ਅਪਲੋਡ ਜਾਂ ਦਰਜ ਕਰੋ',
          action: () => navigation.navigate('Soil'),
        },
        {
          title: 'ਮਿੱਟੀ ਕਿੱਟ',
          icon: 'hardware-chip',
          color: '#4CAF50',
          description: 'ਮਿੱਟੀ ਜਾਂਚ ਕਿੱਟ ਖਰੀਦੋ ਅਤੇ ਘਰ ਵਿੱਚ ਜਾਂਚ ਕਰੋ',
          action: () => navigation.navigate('SoilKitPurchase'),
        },
      ]
    }
  };

  const currentContent = content[isPunjabi ? 'pa' : isHindi ? 'hi' : 'en'];
  const methods = currentContent.methods;


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Surface style={styles.headerCard} elevation={2}>
        <View style={styles.headerContent}>
          <Ionicons name="earth" size={40} color="#8BC34A" />
          <View style={styles.headerText}>
            <Title style={[styles.headerTitle, { fontFamily }]}>{currentContent.headerTitle}</Title>
            <Paragraph style={[styles.headerSubtitle, { fontFamily }]}>
              {currentContent.headerSubtitle}
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
              <Title style={[styles.methodTitle, { color: method.color, fontFamily }]}>
                {method.title}
              </Title>
              <Paragraph style={[styles.methodDescription, { fontFamily }]}>
                {method.description}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Info Section */}
      <Card style={styles.infoCard}>
        <Card.Content>
          <Title style={[styles.infoTitle, { fontFamily }]}>{currentContent.infoTitle}</Title>
          {currentContent.infoTexts.map((text, index) => (
            <Paragraph key={index} style={[styles.infoText, { fontFamily }]}>
              {text}
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

  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
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

  methodDescription: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
    lineHeight: 16,
    marginBottom: 3,
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