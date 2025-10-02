import React, { useState } from 'react';
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
  TextInput,
  Button,
  Text,
  Surface,
  ActivityIndicator,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../services/api';

export default function FeedbackScreen({ route, navigation }) {
  const { user } = route.params || {};
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }

    if (!user?.id) {
      Alert.alert('Error', 'User information not available');
      return;
    }

    setLoading(true);
    try {
      await ApiService.submitFeedback(user.id, feedback.trim());
      Alert.alert(
        'Success',
        'Thank you for your feedback! We appreciate your input.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              setFeedback('');
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const feedbackCategories = [
    { id: 'general', title: 'General Feedback', icon: 'chatbubble', color: '#4CAF50' },
    { id: 'bug', title: 'Bug Report', icon: 'bug', color: '#F44336' },
    { id: 'feature', title: 'Feature Request', icon: 'lightbulb', color: '#2196F3' },
    { id: 'improvement', title: 'Improvement Suggestion', icon: 'trending-up', color: '#FF9800' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Surface style={styles.headerCard} elevation={2}>
        <View style={styles.headerContent}>
          <Ionicons name="chatbubble" size={40} color="#9C27B0" />
          <View style={styles.headerText}>
            <Title style={styles.headerTitle}>Feedback</Title>
            <Title style={styles.headerTitleHindi}>प्रतिक्रिया</Title>
            <Paragraph style={styles.headerSubtitle}>
              Share your thoughts and help us improve
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Feedback Categories */}
      <Card style={styles.categoriesCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Feedback Categories / प्रतिक्रिया श्रेणियां</Title>
          <View style={styles.categoriesGrid}>
            {feedbackCategories.map((category) => (
              <Surface key={category.id} style={styles.categoryItem} elevation={1}>
                <Ionicons name={category.icon} size={24} color={category.color} />
                <Text style={[styles.categoryText, { color: category.color }]}>
                  {category.title}
                </Text>
              </Surface>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Feedback Form */}
      <Card style={styles.formCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Share Your Feedback / अपनी प्रतिक्रिया साझा करें</Title>
          
          <TextInput
            label="Your Feedback / आपकी प्रतिक्रिया"
            value={feedback}
            onChangeText={setFeedback}
            mode="outlined"
            multiline
            numberOfLines={6}
            style={styles.feedbackInput}
            placeholder="Tell us about your experience, suggestions, or any issues you encountered..."
            left={<TextInput.Icon icon="message-text" />}
          />

          <Text style={styles.characterCount}>
            {feedback.length} characters
          </Text>

          <Button
            mode="contained"
            onPress={handleSubmitFeedback}
            style={styles.submitButton}
            disabled={loading || !feedback.trim()}
            contentStyle={styles.buttonContent}
          >
            {loading ? <ActivityIndicator color="#fff" /> : 'Submit Feedback / प्रतिक्रिया भेजें'}
          </Button>
        </Card.Content>
      </Card>

      {/* Guidelines */}
      <Card style={styles.guidelinesCard} elevation={2}>
        <Card.Content>
          <Title style={styles.guidelinesTitle}>📝 Feedback Guidelines / प्रतिक्रिया दिशानिर्देश</Title>
          <Paragraph style={styles.guidelineText}>
            • Be specific about your experience or issue
          </Paragraph>
          <Paragraph style={styles.guidelineText}>
            • Mention the screen or feature you're referring to
          </Paragraph>
          <Paragraph style={styles.guidelineText}>
            • Include steps to reproduce any bugs
          </Paragraph>
          <Paragraph style={styles.guidelineText}>
            • Suggest improvements or new features
          </Paragraph>
          <Paragraph style={styles.guidelineText}>
            • Be constructive and respectful
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Contact Information */}
      <Card style={styles.contactCard} elevation={2}>
        <Card.Content>
          <Title style={styles.contactTitle}>📞 Alternative Contact / वैकल्पिक संपर्क</Title>
          <View style={styles.contactItem}>
            <Ionicons name="mail" size={20} color="#4CAF50" />
            <Text style={styles.contactText}>support@smartcropadvisory.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call" size={20} color="#4CAF50" />
            <Text style={styles.contactText}>+91 98765 43210</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="time" size={20} color="#4CAF50" />
            <Text style={styles.contactText}>Mon-Fri: 9 AM - 6 PM</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Recent Updates */}
      <Card style={styles.updatesCard} elevation={2}>
        <Card.Content>
          <Title style={styles.updatesTitle}>🔄 Recent Updates / हाल के अपडेट</Title>
          <Paragraph style={styles.updateText}>
            • Improved crop advisory accuracy
          </Paragraph>
          <Paragraph style={styles.updateText}>
            • Added weather forecasting features
          </Paragraph>
          <Paragraph style={styles.updateText}>
            • Enhanced market price tracking
          </Paragraph>
          <Paragraph style={styles.updateText}>
            • Better soil health recommendations
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
    backgroundColor: '#F3E5F5',
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
    color: '#9C27B0',
    marginBottom: 2,
  },
  headerTitleHindi: {
    fontSize: 16,
    color: '#9C27B0',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  categoriesCard: {
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F8F9FA',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  formCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  feedbackInput: {
    marginBottom: 10,
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 10,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  guidelinesCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
    backgroundColor: '#E8F5E8',
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  guidelineText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    lineHeight: 16,
  },
  contactCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  updatesCard: {
    margin: 15,
    marginBottom: 30,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
  },
  updatesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 10,
  },
  updateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    lineHeight: 16,
  },
});
