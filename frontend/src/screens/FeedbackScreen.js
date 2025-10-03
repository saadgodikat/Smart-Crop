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
  TextInput,
  Button,
  Text,
  Surface,
  ActivityIndicator,
  Divider,
  Chip,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../services/api';
import storageService from '../services/storageService';

export default function FeedbackScreen({ route, navigation }) {
  const { user } = route.params || {};
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [storedFeedback, setStoredFeedback] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadStoredFeedback();
  }, []);

  const loadStoredFeedback = async () => {
    try {
      const stored = await storageService.getFeedback();
      setStoredFeedback(stored);
    } catch (error) {
      console.error('Error loading stored feedback:', error);
    }
  };

  const clearFeedbackHistory = async () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all feedback history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await storageService.clearFeedback();
              await loadStoredFeedback();
              Alert.alert('Success', 'Feedback history cleared');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear history');
            }
          }
        }
      ]
    );
  };

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }

    setLoading(true);
    try {
      // Save to local storage first
      const feedbackData = {
        userId: user?.id || 'anonymous',
        userName: user?.name || 'Anonymous User',
        feedback: feedback.trim(),
      };
      
      const savedFeedback = await storageService.saveFeedback(feedbackData);
      
      // Try to sync with server if user is available
      if (user?.id) {
        try {
          await ApiService.submitFeedback(user.id, feedback.trim());
          await storageService.markFeedbackSynced(savedFeedback.id);
        } catch (serverError) {
          console.log('Server sync failed, feedback saved locally:', serverError);
        }
      }
      
      // Reload stored feedback
      await loadStoredFeedback();
      
      Alert.alert(
        'Success',
        'Thank you for your feedback! It has been saved and will be synced when possible.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              setFeedback('');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save feedback: ' + error.message);
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

      {/* Feedback History */}
      {storedFeedback.length > 0 && (
        <Card style={styles.historyCard} elevation={2}>
          <Card.Content>
            <View style={styles.historyHeader}>
              <Title style={styles.sectionTitle}>Your Feedback History ({storedFeedback.length})</Title>
              <Button 
                mode="text" 
                onPress={() => setShowHistory(!showHistory)}
                compact
              >
                {showHistory ? 'Hide' : 'Show'}
              </Button>
            </View>
            
            {showHistory && (
              <View>
                {storedFeedback.slice(0, 5).map((item) => (
                  <View key={item.id} style={styles.historyItem}>
                    <View style={styles.historyItemHeader}>
                      <Text style={styles.historyDate}>
                        {new Date(item.timestamp).toLocaleDateString()}
                      </Text>
                      <Chip 
                        mode="outlined" 
                        style={styles.syncChip}
                        textStyle={{ fontSize: 10 }}
                      >
                        {item.synced ? '✓ Synced' : '⏳ Local'}
                      </Chip>
                    </View>
                    <Text style={styles.historyText} numberOfLines={2}>
                      {item.feedback}
                    </Text>
                    <Divider style={styles.historyDivider} />
                  </View>
                ))}
                
                {storedFeedback.length > 5 && (
                  <Text style={styles.moreText}>
                    ... and {storedFeedback.length - 5} more
                  </Text>
                )}
                
                <Button 
                  mode="outlined" 
                  onPress={clearFeedbackHistory}
                  style={styles.clearButton}
                  compact
                >
                  Clear History
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>
      )}

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
    backgroundColor: '#f8f9fa',
  },
  headerCard: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    elevation: 4,
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  headerText: {
    marginLeft: 16,
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#9C27B0',
    marginBottom: 4,
  },
  headerTitleHindi: {
    fontSize: 16,
    color: '#7B1FA2',
    marginBottom: 8,
    fontWeight: '500',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  categoriesCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    elevation: 1,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 14,
  },
  formCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: '#ffffff',
  },
  feedbackInput: {
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
  },
  characterCount: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'right',
    marginBottom: 20,
    fontWeight: '500',
  },
  submitButton: {
    marginTop: 12,
    borderRadius: 12,
    elevation: 2,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  guidelinesCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: '#e8f5e8',
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  guidelinesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 12,
  },
  guidelineText: {
    fontSize: 13,
    color: '#424242',
    marginBottom: 8,
    lineHeight: 18,
    paddingLeft: 4,
  },
  contactCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: '#e3f2fd',
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1565c0',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#424242',
    marginLeft: 12,
    fontWeight: '500',
  },
  updatesCard: {
    margin: 16,
    marginBottom: 32,
    borderRadius: 16,
    backgroundColor: '#fff3e0',
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  updatesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e65100',
    marginBottom: 12,
  },
  updateText: {
    fontSize: 13,
    color: '#424242',
    marginBottom: 8,
    lineHeight: 18,
    paddingLeft: 4,
  },
  historyCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: '#fff3e0',
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ffe0b2',
  },
  historyItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#ffe0b2',
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 12,
    color: '#e65100',
    fontWeight: '600',
  },
  syncChip: {
    height: 26,
    backgroundColor: '#e8f5e8',
  },
  historyText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
    fontWeight: '400',
  },
  historyDivider: {
    marginTop: 12,
    backgroundColor: '#ffe0b2',
  },
  moreText: {
    fontSize: 12,
    color: '#9e9e9e',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 12,
    marginBottom: 8,
    fontWeight: '500',
  },
  clearButton: {
    marginTop: 16,
    borderColor: '#f44336',
    borderRadius: 8,
    borderWidth: 1.5,
  },
});
