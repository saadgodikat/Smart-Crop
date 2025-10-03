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
  Text,
  Surface,
  Button,
  List,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { getTranslation } from '../utils/translations';

export default function HelpScreen({ navigation, language = 'en' }) {
  const t = (key) => getTranslation(language, key);
  
  const getFontFamily = () => {
    return language === 'hi' ? 'NotoSansDevanagari-Regular' : 
           language === 'pa' ? 'NotoSansGurmukhi-Regular' : 'Roboto-Regular';
  };
  
  const getFontFamilyBold = () => {
    return language === 'hi' ? 'NotoSansDevanagari-Bold' : 
           language === 'pa' ? 'NotoSansGurmukhi-Bold' : 'Roboto-Bold';
  };
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@smartcropadvisory.com');
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:+919876543210');
  };

  const handleVisitWebsite = () => {
    Linking.openURL('https://smartcropadvisory.com');
  };

  const faqItems = language === 'hi' ? [
    {
      question: 'मुझे फसल की सिफारिशें कैसे मिलती हैं?',
      answer: 'फसल सलाहकार स्क्रीन पर जाएं, अपनी मिट्टी का प्रकार और पिछली फसल चुनें, फिर व्यक्तिगत सिफारिशें प्राप्त करने के लिए "सलाह प्राप्त करें" पर टैप करें।',
    },
    {
      question: 'मौसम डेटा कितनी बार अपडेट होता है?',
      answer: 'मौसम डेटा आपके स्थान के लिए वर्तमान स्थितियों और पूर्वानुमानों के साथ दैनिक अपडेट किया जाता है।',
    },
    {
      question: 'क्या बाजार की कीमतें वास्तविक समय की हैं?',
      answer: 'बाजार की कीमतें स्थानीय मंडियों और कृषि बाजारों से नियमित रूप से अपडेट की जाती हैं।',
    },
    {
      question: 'मैं अपनी प्रोफ़ाइल कैसे अपडेट करूं?',
      answer: 'प्रोफ़ाइल स्क्रीन पर जाएं और अपनी जानकारी संपादित करने के लिए किसी भी फ़ील्ड पर टैप करें।',
    },
    {
      question: 'क्या ऐप ऑफ़लाइन उपलब्ध है?',
      answer: 'ऐप को नवीनतम डेटा और सिफारिशें प्राप्त करने के लिए इंटरनेट कनेक्शन की आवश्यकता होती है।',
    },
  ] : language === 'pa' ? [
    {
      question: 'ਮੈਨੂੰ ਫਸਲ ਦੀਆਂ ਸਿਫਾਰਸ਼ਾਂ ਕਿਵੇਂ ਮਿਲਦੀਆਂ ਹਨ?',
      answer: 'ਫਸਲ ਸਲਾਹਕਾਰ ਸਕ੍ਰੀਨ ਤੇ ਜਾਓ, ਆਪਣੀ ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਅਤੇ ਪਿਛਲੀ ਫਸਲ ਚੁਣੋ, ਫਿਰ ਵਿਅਕਤੀਗਤ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ "ਸਲਾਹ ਪ੍ਰਾਪਤ ਕਰੋ" ਤੇ ਟੈਪ ਕਰੋ।',
    },
    {
      question: 'ਮੌਸਮ ਡੇਟਾ ਕਿੰਨੀ ਵਾਰ ਅਪਡੇਟ ਹੁੰਦਾ ਹੈ?',
      answer: 'ਮੌਸਮ ਡੇਟਾ ਤੁਹਾਡੇ ਸਥਾਨ ਲਈ ਮੌਜੂਦਾ ਸਥਿਤੀਆਂ ਅਤੇ ਪੂਰਵ-ਅਨੁਮਾਨਾਂ ਦੇ ਨਾਲ ਰੋਜ਼ਾਨਾ ਅਪਡੇਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।',
    },
    {
      question: 'ਕੀ ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ ਅਸਲ ਸਮੇਂ ਦੀਆਂ ਹਨ?',
      answer: 'ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ ਸਥਾਨਕ ਮੰਡੀਆਂ ਅਤੇ ਖੇਤੀਬਾੜੀ ਬਾਜ਼ਾਰਾਂ ਤੋਂ ਨਿਯਮਿਤ ਰੂਪ ਵਿੱਚ ਅਪਡੇਟ ਕੀਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।',
    },
    {
      question: 'ਮੈਂ ਆਪਣੀ ਪ੍ਰੋਫਾਈਲ ਕਿਵੇਂ ਅਪਡੇਟ ਕਰਾਂ?',
      answer: 'ਪ੍ਰੋਫਾਈਲ ਸਕ੍ਰੀਨ ਤੇ ਜਾਓ ਅਤੇ ਆਪਣੀ ਜਾਣਕਾਰੀ ਸੰਪਾਦਿਤ ਕਰਨ ਲਈ ਕਿਸੇ ਵੀ ਫੀਲਡ ਤੇ ਟੈਪ ਕਰੋ।',
    },
    {
      question: 'ਕੀ ਐਪ ਔਫਲਾਈਨ ਉਪਲਬਧ ਹੈ?',
      answer: 'ਐਪ ਨੂੰ ਨਵੀਨਤਮ ਡੇਟਾ ਅਤੇ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਇੰਟਰਨੈਟ ਕਨੈਕਸ਼ਨ ਦੀ ਲੋੜ ਹੈ।',
    },
  ] : [
    {
      question: 'How do I get crop recommendations?',
      answer: 'Go to Crop Advisory screen, select your soil type and last crop, then tap "Get Advisory" to receive personalized recommendations.',
    },
    {
      question: 'How often is weather data updated?',
      answer: 'Weather data is updated daily with current conditions and forecasts for your location.',
    },
    {
      question: 'Are market prices real-time?',
      answer: 'Market prices are updated regularly from local mandis and agricultural markets.',
    },
    {
      question: 'How do I update my profile?',
      answer: 'Go to Profile screen and tap on any field to edit your information.',
    },
    {
      question: 'Is the app available offline?',
      answer: 'The app requires internet connection to fetch latest data and recommendations.',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Surface style={styles.headerCard} elevation={2}>
        <View style={styles.headerContent}>
          <Ionicons name="help-circle" size={40} color="#607D8B" />
          <View style={styles.headerText}>
            <Title style={[styles.headerTitle, { fontFamily: getFontFamilyBold() }]}>{t('help')}</Title>
            <Paragraph style={[styles.headerSubtitle, { fontFamily: getFontFamily() }]}>
              {language === 'hi' ? 'जवाब खोजें और सहायता प्राप्त करें' : 
               language === 'pa' ? 'ਜਵਾਬ ਲੱਭੋ ਅਤੇ ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਕਰੋ' : 
               'Find answers and get support'}
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Quick Help */}
      <Card style={styles.quickHelpCard} elevation={2}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'त्वरित सहायता' : language === 'pa' ? 'ਤੁਰੰਤ ਸਹਾਇਤਾ' : 'Quick Help'}</Title>
          
          <Button
            mode="contained"
            onPress={handleContactSupport}
            style={styles.helpButton}
            contentStyle={styles.buttonContent}
            icon="email"
          >
            {t('contactSupport')}
          </Button>

          <Button
            mode="outlined"
            onPress={handleCallSupport}
            style={styles.helpButton}
            contentStyle={styles.buttonContent}
            icon="phone"
          >
            {language === 'hi' ? 'कॉल सहायता' : language === 'pa' ? 'ਕਾਲ ਸਹਾਇਤਾ' : 'Call Support'}
          </Button>

          <Button
            mode="text"
            onPress={handleVisitWebsite}
            style={styles.helpButton}
            contentStyle={styles.buttonContent}
            icon="web"
          >
            {language === 'hi' ? 'वेबसाइट देखें' : language === 'pa' ? 'ਵੈਬਸਾਈਟ ਦੇਖੋ' : 'Visit Website'}
          </Button>
        </Card.Content>
      </Card>

      {/* App Features Guide */}
      <Card style={styles.featuresCard} elevation={2}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { fontFamily: getFontFamilyBold() }]}>{t('userGuide')}</Title>
          
          <View style={styles.featureItem}>
            <Ionicons name="leaf" size={24} color="#4CAF50" />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'फसल सलाहकार' : language === 'pa' ? 'ਫਸਲ ਸਲਾਹਕਾਰ' : 'Crop Advisory'}</Text>
              <Text style={[styles.featureDescription, { fontFamily: getFontFamily() }]}>
                {language === 'hi' ? 'अपनी मिट्टी के प्रकार और पिछली फसलों के आधार पर व्यक्तिगत फसल सिफारिशें प्राप्त करें।' : 
                 language === 'pa' ? 'ਆਪਣੀ ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਅਤੇ ਪਿਛਲੀਆਂ ਫਸਲਾਂ ਦੇ ਆਧਾਰ ਤੇ ਵਿਅਕਤੀਗਤ ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।' : 
                 'Get personalized crop recommendations based on your soil type and previous crops.'}
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="earth" size={24} color="#8BC34A" />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'मिट्टी का स्वास्थ्य' : language === 'pa' ? 'ਮਿੱਟੀ ਦੀ ਸਿਹਤ' : 'Soil Health'}</Text>
              <Text style={[styles.featureDescription, { fontFamily: getFontFamily() }]}>
                {language === 'hi' ? 'मिट्टी के स्वास्थ्य मापदंडों की निगरानी करें और सुधार के सुझाव प्राप्त करें।' : 
                 language === 'pa' ? 'ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਦੇ ਮਾਪਦੰਡਾਂ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ ਅਤੇ ਸੁਧਾਰ ਦੇ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ।' : 
                 'Monitor soil health parameters and get improvement suggestions.'}
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="cloud" size={24} color="#2196F3" />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'मौसम की जानकारी' : language === 'pa' ? 'ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ' : 'Weather Information'}</Text>
              <Text style={[styles.featureDescription, { fontFamily: getFontFamily() }]}>
                {language === 'hi' ? 'वर्तमान मौसम स्थितियों और कृषि सलाह तक पहुंचें।' : 
                 language === 'pa' ? 'ਮੌਜੂਦਾ ਮੌਸਮ ਸਥਿਤੀਆਂ ਅਤੇ ਖੇਤੀਬਾੜੀ ਸਲਾਹ ਤੱਕ ਪਹੁੰਚ ਕਰੋ।' : 
                 'Access current weather conditions and farming advice.'}
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="trending-up" size={24} color="#FF9800" />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'बाजार की कीमतें' : language === 'pa' ? 'ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ' : 'Market Prices'}</Text>
              <Text style={[styles.featureDescription, { fontFamily: getFontFamily() }]}>
                {language === 'hi' ? 'बेहतर बिक्री निर्णयों के लिए अपने क्षेत्र में नवीनतम फसल की कीमतों को ट्रैक करें।' : 
                 language === 'pa' ? 'ਬਿਹਤਰ ਵਿਕਰੀ ਫੈਸਲਿਆਂ ਲਈ ਆਪਣੇ ਖੇਤਰ ਵਿੱਚ ਨਵੀਨਤਮ ਫਸਲ ਦੀਆਂ ਕੀਮਤਾਂ ਨੂੰ ਟਰੈਕ ਕਰੋ।' : 
                 'Track latest crop prices in your area for better selling decisions.'}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* FAQ */}
      <Card style={styles.faqCard} elevation={2}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { fontFamily: getFontFamilyBold() }]}>{t('frequentlyAsked')}</Title>
          
          {faqItems.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={[styles.faqQuestion, { fontFamily: getFontFamilyBold() }]}>Q: {item.question}</Text>
              <Text style={[styles.faqAnswer, { fontFamily: getFontFamily() }]}>A: {item.answer}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Troubleshooting */}
      <Card style={styles.troubleshootingCard} elevation={2}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'समस्या निवारण' : language === 'pa' ? 'ਸਮੱਸਿਆ ਨਿਵਾਰਣ' : 'Troubleshooting'}</Title>
          
          <View style={styles.troubleshootItem}>
            <Text style={[styles.troubleshootTitle, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'ऐप डेटा लोड नहीं कर रहा?' : language === 'pa' ? 'ਐਪ ਡੇਟਾ ਲੋਡ ਨਹੀਂ ਕਰ ਰਿਹਾ?' : 'App not loading data?'}</Text>
            <Text style={[styles.troubleshootSolution, { fontFamily: getFontFamily() }]}>
              {language === 'hi' ? '• अपना इंटरनेट कनेक्शन जांचें\n• ऐप को पुनः आरंभ करें\n• ऐप कैश साफ़ करें और पुनः आरंभ करें' : 
               language === 'pa' ? '• ਆਪਣਾ ਇੰਟਰਨੈਟ ਕਨੈਕਸ਼ਨ ਜਾਂਚੋ\n• ਐਪ ਨੂੰ ਮੁੜ ਸ਼ੁਰੂ ਕਰੋ\n• ਐਪ ਕੈਸ਼ ਸਾਫ਼ ਕਰੋ ਅਤੇ ਮੁੜ ਸ਼ੁਰੂ ਕਰੋ' : 
               '• Check your internet connection\n• Restart the app\n• Clear app cache and restart'}
            </Text>
          </View>

          <View style={styles.troubleshootItem}>
            <Text style={[styles.troubleshootTitle, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'लॉगिन समस्याएं?' : language === 'pa' ? 'ਲਾਗਇਨ ਸਮੱਸਿਆਵਾਂ?' : 'Login issues?'}</Text>
            <Text style={[styles.troubleshootSolution, { fontFamily: getFontFamily() }]}>
              {language === 'hi' ? '• फोन नंबर और पासवर्ड सत्यापित करें\n• नया खाता बनाने का प्रयास करें\n• सहायता के लिए सपोर्ट से संपर्क करें' : 
               language === 'pa' ? '• ਫੋਨ ਨੰਬਰ ਅਤੇ ਪਾਸਵਰਡ ਦੀ ਤਸਦੀਕ ਕਰੋ\n• ਨਵਾਂ ਖਾਤਾ ਬਣਾਉਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ\n• ਸਹਾਇਤਾ ਲਈ ਸਪੋਰਟ ਨਾਲ ਸੰਪਰਕ ਕਰੋ' : 
               '• Verify phone number and password\n• Try creating a new account\n• Contact support for assistance'}
            </Text>
          </View>

          <View style={styles.troubleshootItem}>
            <Text style={[styles.troubleshootTitle, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'सिफारिशें सटीक नहीं हैं?' : language === 'pa' ? 'ਸਿਫਾਰਸ਼ਾਂ ਸਹੀ ਨਹੀਂ ਹਨ?' : 'Recommendations not accurate?'}</Text>
            <Text style={[styles.troubleshootSolution, { fontFamily: getFontFamily() }]}>
              {language === 'hi' ? '• अपनी मिट्टी का प्रकार और पिछली फसल अपडेट करें\n• अधिक विशिष्ट स्थान विवरण प्रदान करें\n• अपने विशिष्ट मामले के साथ सपोर्ट से संपर्क करें' : 
               language === 'pa' ? '• ਆਪਣੀ ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਅਤੇ ਪਿਛਲੀ ਫਸਲ ਅਪਡੇਟ ਕਰੋ\n• ਵਧੇਰੇ ਖਾਸ ਸਥਾਨ ਵੇਰਵੇ ਦਿਓ\n• ਆਪਣੇ ਖਾਸ ਮਾਮਲੇ ਦੇ ਨਾਲ ਸਪੋਰਟ ਨਾਲ ਸੰਪਰਕ ਕਰੋ' : 
               '• Update your soil type and last crop\n• Provide more specific location details\n• Contact support with your specific case'}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Contact Information */}
      <Card style={styles.contactCard} elevation={2}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'संपर्क जानकारी' : language === 'pa' ? 'ਸੰਪਰਕ ਜਾਣਕਾਰੀ' : 'Contact Information'}</Title>
          
          <View style={styles.contactItem}>
            <Ionicons name="mail" size={20} color="#4CAF50" />
            <View style={styles.contactContent}>
              <Text style={[styles.contactLabel, { fontFamily: getFontFamily() }]}>{language === 'hi' ? 'ईमेल' : language === 'pa' ? 'ਈਮੇਲ' : 'Email'}</Text>
              <Text style={[styles.contactValue, { fontFamily: getFontFamilyBold() }]}>support@smartcropadvisory.com</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Ionicons name="call" size={20} color="#4CAF50" />
            <View style={styles.contactContent}>
              <Text style={[styles.contactLabel, { fontFamily: getFontFamily() }]}>{language === 'hi' ? 'फोन' : language === 'pa' ? 'ਫੋਨ' : 'Phone'}</Text>
              <Text style={[styles.contactValue, { fontFamily: getFontFamilyBold() }]}>+91 98765 43210</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Ionicons name="time" size={20} color="#4CAF50" />
            <View style={styles.contactContent}>
              <Text style={[styles.contactLabel, { fontFamily: getFontFamily() }]}>{language === 'hi' ? 'सहायता समय' : language === 'pa' ? 'ਸਹਾਇਤਾ ਸਮਾਂ' : 'Support Hours'}</Text>
              <Text style={[styles.contactValue, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'सोम-शुक्र: सुबह 9 - शाम 6 IST' : language === 'pa' ? 'ਸੋਮ-ਸ਼ੁੱਕਰ: ਸਵੇਰੇ 9 - ਸ਼ਾਮ 6 IST' : 'Mon-Fri: 9 AM - 6 PM IST'}</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Ionicons name="location" size={20} color="#4CAF50" />
            <View style={styles.contactContent}>
              <Text style={[styles.contactLabel, { fontFamily: getFontFamily() }]}>{language === 'hi' ? 'कार्यालय' : language === 'pa' ? 'ਦਫਤਰ' : 'Office'}</Text>
              <Text style={[styles.contactValue, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'पुणे, महाराष्ट्र, भारत' : language === 'pa' ? 'ਪੁਣੇ, ਮਹਾਰਾਸ਼ਟਰ, ਭਾਰਤ' : 'Pune, Maharashtra, India'}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* App Information */}
      <Card style={styles.appInfoCard} elevation={2}>
        <Card.Content>
          <Title style={[styles.sectionTitle, { fontFamily: getFontFamilyBold() }]}>{t('aboutApp')}</Title>
          
          <View style={styles.appInfoItem}>
            <Text style={[styles.appInfoLabel, { fontFamily: getFontFamily() }]}>{language === 'hi' ? 'संस्करण:' : language === 'pa' ? 'ਵਰਜ਼ਨ:' : 'Version:'}</Text>
            <Text style={[styles.appInfoValue, { fontFamily: getFontFamilyBold() }]}>1.0.0</Text>
          </View>
          
          <View style={styles.appInfoItem}>
            <Text style={[styles.appInfoLabel, { fontFamily: getFontFamily() }]}>{language === 'hi' ? 'अंतिम अपडेट:' : language === 'pa' ? 'ਆਖਰੀ ਅਪਡੇਟ:' : 'Last Updated:'}</Text>
            <Text style={[styles.appInfoValue, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'दिसंबर 2024' : language === 'pa' ? 'ਦਸੰਬਰ 2024' : 'December 2024'}</Text>
          </View>
          
          <View style={styles.appInfoItem}>
            <Text style={[styles.appInfoLabel, { fontFamily: getFontFamily() }]}>{language === 'hi' ? 'प्लेटफॉर्म:' : language === 'pa' ? 'ਪਲੇਟਫਾਰਮ:' : 'Platform:'}</Text>
            <Text style={[styles.appInfoValue, { fontFamily: getFontFamilyBold() }]}>React Native (Expo)</Text>
          </View>
          
          <View style={styles.appInfoItem}>
            <Text style={[styles.appInfoLabel, { fontFamily: getFontFamily() }]}>{language === 'hi' ? 'डेवलपर:' : language === 'pa' ? 'ਡੇਵਲਪਰ:' : 'Developer:'}</Text>
            <Text style={[styles.appInfoValue, { fontFamily: getFontFamilyBold() }]}>{language === 'hi' ? 'स्मार्ट क्रॉप एडवाइजरी टीम' : language === 'pa' ? 'ਸਮਾਰਟ ਕਰਾਪ ਐਡਵਾਇਜਰੀ ਟੀਮ' : 'Smart Crop Advisory Team'}</Text>
          </View>
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
    backgroundColor: '#ECEFF1',
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
    color: '#607D8B',
    marginBottom: 2,
  },
  headerTitleHindi: {
    fontSize: 16,
    color: '#607D8B',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  quickHelpCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  helpButton: {
    marginBottom: 10,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  featuresCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureContent: {
    marginLeft: 15,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  faqCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  faqItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  troubleshootingCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
  },
  troubleshootItem: {
    marginBottom: 20,
  },
  troubleshootTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 8,
  },
  troubleshootSolution: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  contactCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
    backgroundColor: '#E8F5E8',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactContent: {
    marginLeft: 15,
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  appInfoCard: {
    margin: 15,
    marginBottom: 30,
    borderRadius: 12,
  },
  appInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  appInfoLabel: {
    fontSize: 14,
    color: '#666',
  },
  appInfoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
