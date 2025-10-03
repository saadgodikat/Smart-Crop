import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Surface,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

export default function SoilKitPurchaseScreen({ navigation, user, language = 'en' }) {
  const amazonUrl = 'https://www.amazon.in/HASTHIP%C2%AE-Fertility-Moisture-Precison-Agriculture/dp/B0F66WZY3V/ref=pd_sbs_d_sccl_1_4/262-6989169-6832119';

  const isPunjabi = language === 'pa';
  const isHindi = language === 'hi';
  const fontFamily = isPunjabi ? 'NotoSansGurmukhi-Regular' : isHindi ? 'NotoSansDevanagari-Regular' : 'System';

  const content = {
    en: {
      headerTitle: 'Soil Testing Kit',
      headerSubtitle: 'Purchase professional soil testing kit',
      kitTitle: '🧪 HASTHIP® Soil Testing Kit',
      kitDescription: 'Professional 4-in-1 soil fertility testing kit for pH, Nitrogen, Phosphorus, and Potassium measurement with precision agriculture tools.',
      features: [
        'pH Level Testing',
        'Nitrogen (N) Analysis',
        'Phosphorus (P) Testing',
        'Potassium (K) Measurement',
        'Moisture Content Analysis'
      ],
      instructionsTitle: '📋 How to Take Soil Sample',
      steps: [
        'Select 5-6 different spots in your field randomly',
        'Dig 6-8 inches deep and collect soil from each spot',
        'Mix all soil samples thoroughly in a clean container',
        'Remove stones, roots, and debris from the sample',
        'Use the testing kit as per instructions to analyze'
      ],
      buyButton: 'Buy on Amazon',
      nextButton: 'Next - Enter Soil Data',
      tipsTitle: '💡 Tips',
      tips: [
        '• Best time to collect soil: After harvest, before planting',
        '• Avoid collecting soil immediately after rain or irrigation',
        '• Store soil sample in clean, dry container',
        '• Test soil every 2-3 years for optimal crop management'
      ]
    },
    hi: {
      headerTitle: 'मिट्टी परीक्षण किट',
      headerSubtitle: 'पेशेवर मिट्टी परीक्षण किट खरीदें',
      kitTitle: '🧪 HASTHIP® मिट्टी परीक्षण किट',
      kitDescription: 'pH, नाइट्रोजन, फास्फोरस और पोटेशियम माप के लिए पेशेवर 4-इन-1 मिट्टी उर्वरता परीक्षण किट।',
      features: [
        'pH स्तर परीक्षण',
        'नाइट्रोजन (N) विश्लेषण',
        'फास्फोरस (P) परीक्षण',
        'पोटेशियम (K) माप',
        'नमी सामग्री विश्लेषण'
      ],
      instructionsTitle: '📋 मिट्टी का नमूना कैसे लें',
      steps: [
        'अपने खेत में यादृच्छिक रूप से 5-6 अलग स्थान चुनें',
        '6-8 इंच गहरी खुदाई करें और प्रत्येक स्थान से मिट्टी एकत्र करें',
        'सभी मिट्टी के नमूनों को एक साफ कंटेनर में अच्छी तरह मिलाएं',
        'नमूने से पत्थर, जड़ें और मलबा हटा दें',
        'विश्लेषण के लिए निर्देशों के अनुसार परीक्षण किट का उपयोग करें'
      ],
      buyButton: 'अमेज़न पर खरीदें',
      nextButton: 'अगला - मिट्टी डेटा दर्ज करें',
      tipsTitle: '💡 सुझाव',
      tips: [
        '• मिट्टी एकत्र करने का सबसे अच्छा समय: फसल के बाद, रोपण से पहले',
        '• बारिश या सिंचाई के तुरंत बाद मिट्टी एकत्र करने से बचें',
        '• मिट्टी का नमूना साफ, सूखे कंटेनर में स्टोर करें',
        '• इष्टतम फसल प्रबंधन के लिए हर 2-3 साल में मिट्टी का परीक्षण करें'
      ]
    },
    pa: {
      headerTitle: 'ਮਿੱਟੀ ਜਾਂਚ ਕਿੱਟ',
      headerSubtitle: 'ਪੇਸ਼ੇਵਰ ਮਿੱਟੀ ਜਾਂਚ ਕਿੱਟ ਖਰੀਦੋ',
      kitTitle: '🧪 HASTHIP® ਮਿੱਟੀ ਜਾਂਚ ਕਿੱਟ',
      kitDescription: 'pH, ਨਾਇਟਰੋਜਨ, ਫਾਸਫੋਰਸ ਅਤੇ ਪੋਟਾਸ਼ੀਅਮ ਮਾਪ ਲਈ ਪੇਸ਼ੇਵਰ 4-ਇਨ-1 ਮਿੱਟੀ ਉਰਵਰਤਾ ਜਾਂਚ ਕਿੱਟ।',
      features: [
        'pH ਸਤਹ ਜਾਂਚ',
        'ਨਾਇਟਰੋਜਨ (N) ਵਿਸ਼ਲੇਸ਼ਣ',
        'ਫਾਸਫੋਰਸ (P) ਜਾਂਚ',
        'ਪੋਟਾਸ਼ੀਅਮ (K) ਮਾਪ',
        'ਨਮੀ ਸਾਮਗਰੀ ਵਿਸ਼ਲੇਸ਼ਣ'
      ],
      instructionsTitle: '📋 ਮਿੱਟੀ ਦਾ ਨਮੂਨਾ ਕਿਵੇਂ ਲੈਣਾ',
      steps: [
        'ਆਪਣੇ ਖੇਤ ਵਿੱਚ ਬੇਤਰਤੀਬ ਤਰੀਕੇ ਨਾਲ 5-6 ਵੱਖਰੇ ਸਥਾਨ ਚੁਣੋ',
        '6-8 ਇੰਚ ਡੂੰਘੀ ਖੁਦਾਈ ਕਰੋ ਅਤੇ ਹਰ ਸਥਾਨ ਤੋਂ ਮਿੱਟੀ ਇਕੱਠੀ ਕਰੋ',
        'ਸਾਰੇ ਮਿੱਟੀ ਦੇ ਨਮੂਨਿਆਂ ਨੂੰ ਇਕ ਸਾਫ ਕੰਟੇਨਰ ਵਿੱਚ ਚੰਗੀ ਤਰਾਂ ਮਿਲਾਓ',
        'ਨਮੂਨੇ ਵਿੱਚੋਂ ਪਤਥਰ, ਜੜ੍ਹਾਂ ਅਤੇ ਮਲਬਾ ਹਟਾ ਦਿਓ',
        'ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਹਦਾਇਤਾਂ ਦੇ ਅਨੁਸਾਰ ਜਾਂਚ ਕਿੱਟ ਦਾ ਵਰਤੋਂ ਕਰੋ'
      ],
      buyButton: 'ਅਮੇਜ਼ਨ ਤੇ ਖਰੀਦੋ',
      nextButton: 'ਅਗਲਾ - ਮਿੱਟੀ ਡੇਟਾ ਦਰਜ ਕਰੋ',
      tipsTitle: '💡 ਸੁਝਾਅ',
      tips: [
        '• ਮਿੱਟੀ ਇਕੱਠੀ ਕਰਨ ਦਾ ਸਭ ਤੋਂ ਚੰਗਾ ਸਮਾਂ: ਫਸਲ ਦੇ ਬਾਅਦ, ਬੀਜਾਈ ਤੋਂ ਪਹਿਲਾਂ',
        '• ਮੀਂਹ ਜਾਂ ਸਿੰਚਾਈ ਦੇ ਤੁਰੰਤ ਬਾਅਦ ਮਿੱਟੀ ਇਕੱਠੀ ਕਰਨ ਤੋਂ ਬਚੋ',
        '• ਮਿੱਟੀ ਦਾ ਨਮੂਨਾ ਸਾਫ, ਸੁੱਕੇ ਕੰਟੇਨਰ ਵਿੱਚ ਸਟੋਰ ਕਰੋ',
        '• ਸਰਵੋਤਮ ਫਸਲ ਪ੍ਰਬੰਧਨ ਲਈ ਹਰ 2-3 ਸਾਲ ਵਿੱਚ ਮਿੱਟੀ ਦੀ ਜਾਂਚ ਕਰੋ'
      ]
    }
  };

  const t = content[isPunjabi ? 'pa' : isHindi ? 'hi' : 'en'];

  const openAmazonLink = () => {
    Linking.openURL(amazonUrl);
  };

  const proceedToSoilHealth = () => {
    navigation.navigate('Soil');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Surface style={styles.headerCard} elevation={2}>
        <View style={styles.headerContent}>
          <Ionicons name="hardware-chip" size={40} color="#4CAF50" />
          <View style={styles.headerText}>
            <Title style={[styles.headerTitle, { fontFamily }]}>{t.headerTitle}</Title>
            <Paragraph style={[styles.headerSubtitle, { fontFamily }]}>
              {t.headerSubtitle}
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Kit Information */}
      <Card style={styles.kitCard}>
        <Card.Content>
          <Title style={[styles.kitTitle, { fontFamily }]}>{t.kitTitle}</Title>
          <Paragraph style={[styles.kitDescription, { fontFamily }]}>
            {t.kitDescription}
          </Paragraph>
          <View style={styles.featuresContainer}>
            {t.features.map((feature, index) => (
              <View key={index} style={styles.feature}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Paragraph style={[styles.featureText, { fontFamily }]}>{feature}</Paragraph>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Sampling Instructions */}
      <Card style={styles.instructionsCard}>
        <Card.Content>
          <Title style={[styles.instructionsTitle, { fontFamily }]}>{t.instructionsTitle}</Title>
          
          <View style={styles.stepContainer}>
            {t.steps.map((step, index) => (
              <View key={index} style={styles.step}>
                <View style={styles.stepNumber}>
                  <Paragraph style={styles.stepNumberText}>{index + 1}</Paragraph>
                </View>
                <View style={styles.stepContent}>
                  <Paragraph style={[styles.stepText, { fontFamily }]}>
                    {step}
                  </Paragraph>
                </View>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={openAmazonLink}
          style={styles.amazonButton}
          contentStyle={styles.buttonContent}
          icon="cart"
        >
          <Paragraph style={{ fontFamily, color: '#fff', fontWeight: 'bold' }}>{t.buyButton}</Paragraph>
        </Button>
        
        <Button
          mode="outlined"
          onPress={proceedToSoilHealth}
          style={styles.nextButton}
          contentStyle={styles.buttonContent}
          icon="arrow-right"
        >
          <Paragraph style={{ fontFamily, color: '#4CAF50', fontWeight: 'bold' }}>{t.nextButton}</Paragraph>
        </Button>
      </View>

      {/* Tips */}
      <Card style={styles.tipsCard}>
        <Card.Content>
          <Title style={[styles.tipsTitle, { fontFamily }]}>{t.tipsTitle}</Title>
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
    color: '#4CAF50',
    marginBottom: 2,
  },

  headerSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  kitCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  kitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  kitDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 15,
  },
  featuresContainer: {
    marginTop: 10,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 8,
  },
  instructionsCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 5,
  },

  stepContainer: {
    marginTop: 10,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepContent: {
    flex: 1,
  },
  stepText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 16,
    marginBottom: 2,
  },

  buttonContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  amazonButton: {
    backgroundColor: '#FF9800',
    marginBottom: 10,
  },
  nextButton: {
    borderColor: '#4CAF50',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  tipsCard: {
    margin: 15,
    marginBottom: 30,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    lineHeight: 16,
  },
});