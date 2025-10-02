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

export default function HelpScreen({ navigation }) {
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@smartcropadvisory.com');
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:+919876543210');
  };

  const handleVisitWebsite = () => {
    Linking.openURL('https://smartcropadvisory.com');
  };

  const faqItems = [
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
            <Title style={styles.headerTitle}>Help & Support</Title>
            <Title style={styles.headerTitleHindi}>सहायता और समर्थन</Title>
            <Paragraph style={styles.headerSubtitle}>
              Find answers and get support
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Quick Help */}
      <Card style={styles.quickHelpCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Quick Help / त्वरित सहायता</Title>
          
          <Button
            mode="contained"
            onPress={handleContactSupport}
            style={styles.helpButton}
            contentStyle={styles.buttonContent}
            icon="email"
          >
            Email Support / ईमेल सहायता
          </Button>

          <Button
            mode="outlined"
            onPress={handleCallSupport}
            style={styles.helpButton}
            contentStyle={styles.buttonContent}
            icon="phone"
          >
            Call Support / कॉल सहायता
          </Button>

          <Button
            mode="text"
            onPress={handleVisitWebsite}
            style={styles.helpButton}
            contentStyle={styles.buttonContent}
            icon="web"
          >
            Visit Website / वेबसाइट देखें
          </Button>
        </Card.Content>
      </Card>

      {/* App Features Guide */}
      <Card style={styles.featuresCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>App Features Guide / ऐप सुविधा गाइड</Title>
          
          <View style={styles.featureItem}>
            <Ionicons name="leaf" size={24} color="#4CAF50" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Crop Advisory</Text>
              <Text style={styles.featureDescription}>
                Get personalized crop recommendations based on your soil type and previous crops.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="earth" size={24} color="#8BC34A" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Soil Health</Text>
              <Text style={styles.featureDescription}>
                Monitor soil health parameters and get improvement suggestions.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="cloud" size={24} color="#2196F3" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Weather Information</Text>
              <Text style={styles.featureDescription}>
                Access current weather conditions and farming advice.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="trending-up" size={24} color="#FF9800" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Market Prices</Text>
              <Text style={styles.featureDescription}>
                Track latest crop prices in your area for better selling decisions.
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* FAQ */}
      <Card style={styles.faqCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Frequently Asked Questions / अक्सर पूछे जाने वाले प्रश्न</Title>
          
          {faqItems.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Q: {item.question}</Text>
              <Text style={styles.faqAnswer}>A: {item.answer}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Troubleshooting */}
      <Card style={styles.troubleshootingCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Troubleshooting / समस्या निवारण</Title>
          
          <View style={styles.troubleshootItem}>
            <Text style={styles.troubleshootTitle}>App not loading data?</Text>
            <Text style={styles.troubleshootSolution}>
              • Check your internet connection{'\n'}
              • Restart the app{'\n'}
              • Clear app cache and restart
            </Text>
          </View>

          <View style={styles.troubleshootItem}>
            <Text style={styles.troubleshootTitle}>Login issues?</Text>
            <Text style={styles.troubleshootSolution}>
              • Verify phone number and password{'\n'}
              • Try creating a new account{'\n'}
              • Contact support for assistance
            </Text>
          </View>

          <View style={styles.troubleshootItem}>
            <Text style={styles.troubleshootTitle}>Recommendations not accurate?</Text>
            <Text style={styles.troubleshootSolution}>
              • Update your soil type and last crop{'\n'}
              • Provide more specific location details{'\n'}
              • Contact support with your specific case
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Contact Information */}
      <Card style={styles.contactCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Contact Information / संपर्क जानकारी</Title>
          
          <View style={styles.contactItem}>
            <Ionicons name="mail" size={20} color="#4CAF50" />
            <View style={styles.contactContent}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>support@smartcropadvisory.com</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Ionicons name="call" size={20} color="#4CAF50" />
            <View style={styles.contactContent}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>+91 98765 43210</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Ionicons name="time" size={20} color="#4CAF50" />
            <View style={styles.contactContent}>
              <Text style={styles.contactLabel}>Support Hours</Text>
              <Text style={styles.contactValue}>Mon-Fri: 9 AM - 6 PM IST</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Ionicons name="location" size={20} color="#4CAF50" />
            <View style={styles.contactContent}>
              <Text style={styles.contactLabel}>Office</Text>
              <Text style={styles.contactValue}>Pune, Maharashtra, India</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* App Information */}
      <Card style={styles.appInfoCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>App Information / ऐप की जानकारी</Title>
          
          <View style={styles.appInfoItem}>
            <Text style={styles.appInfoLabel}>Version:</Text>
            <Text style={styles.appInfoValue}>1.0.0</Text>
          </View>
          
          <View style={styles.appInfoItem}>
            <Text style={styles.appInfoLabel}>Last Updated:</Text>
            <Text style={styles.appInfoValue}>December 2024</Text>
          </View>
          
          <View style={styles.appInfoItem}>
            <Text style={styles.appInfoLabel}>Platform:</Text>
            <Text style={styles.appInfoValue}>React Native (Expo)</Text>
          </View>
          
          <View style={styles.appInfoItem}>
            <Text style={styles.appInfoLabel}>Developer:</Text>
            <Text style={styles.appInfoValue}>Smart Crop Advisory Team</Text>
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
