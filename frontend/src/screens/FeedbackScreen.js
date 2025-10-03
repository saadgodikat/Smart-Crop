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
import { getTranslation } from '../utils/translations';

export default function FeedbackScreen({ route, navigation, user, language = 'en' }) {
  const t = (key) => getTranslation(language, key);
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
      t('clearHistory'),
      t('clearHistoryConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('clear'),
          style: 'destructive',
          onPress: async () => {
            try {
              await storageService.clearFeedback();
              await loadStoredFeedback();
              Alert.alert(t('success'), t('historyCleared'));
            } catch (error) {
              Alert.alert(t('error'), t('failedToClear'));
            }
          }
        }
      ]
    );
  };

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      Alert.alert(t('error'), t('enterFeedback'));
      return;
    }

    setLoading(true);
    try {
      const feedbackData = {
        userId: user?.id || 'anonymous',
        userName: user?.name || 'Anonymous User',
        feedback: feedback.trim(),
      };
      
      const savedFeedback = await storageService.saveFeedback(feedbackData);
      
      if (user?.id) {
        try {
          await ApiService.submitFeedback(user.id, feedback.trim());
          await storageService.markFeedbackSynced(savedFeedback.id);
        } catch (serverError) {
          console.log('Server sync failed, feedback saved locally:', serverError);
        }
      }
      
      await loadStoredFeedback();
      
      Alert.alert(
        t('success'),
        t('feedbackSubmitted'),
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
      Alert.alert(t('error'), t('feedbackFailed') + ': ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const feedbackCategories = language === 'hi' ? [
    { id: 'general', title: 'सामान्य प्रतिक्रिया', icon: 'chatbubble', color: '#4CAF50' },
    { id: 'bug', title: 'बग रिपोर्ट', icon: 'bug', color: '#F44336' },
    { id: 'feature', title: 'फीचर अनुरोध', icon: 'lightbulb', color: '#2196F3' },
    { id: 'improvement', title: 'सुधार सुझाव', icon: 'trending-up', color: '#FF9800' },
  ] : language === 'pa' ? [
    { id: 'general', title: 'ਆਮ ਫੀਡਬੈਕ', icon: 'chatbubble', color: '#4CAF50' },
    { id: 'bug', title: 'ਬੱਗ ਰਿਪੋਰਟ', icon: 'bug', color: '#F44336' },
    { id: 'feature', title: 'ਫੀਚਰ ਬੇਨਤੀ', icon: 'lightbulb', color: '#2196F3' },
    { id: 'improvement', title: 'ਸੁਧਾਰ ਸੁਝਾਅ', icon: 'trending-up', color: '#FF9800' },
  ] : [
    { id: 'general', title: 'General Feedback', icon: 'chatbubble', color: '#4CAF50' },
    { id: 'bug', title: 'Bug Report', icon: 'bug', color: '#F44336' },
    { id: 'feature', title: 'Feature Request', icon: 'lightbulb', color: '#2196F3' },
    { id: 'improvement', title: 'Improvement Suggestion', icon: 'trending-up', color: '#FF9800' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Surface style={styles.headerCard} elevation={2}>
        <View style={styles.headerContent}>
          <Ionicons name="chatbubble" size={40} color="#9C27B0" />
          <View style={styles.headerText}>
            <Title style={styles.headerTitle}>{t('yourFeedback')}</Title>
            <Paragraph style={styles.headerSubtitle}>
              {language === 'hi' ? 'अपने विचार साझा करें और हमें सुधारने में मदद करें' : 
               language === 'pa' ? 'ਆਪਣੇ ਵਿਚਾਰ ਸਾਂਝੇ ਕਰੋ ਅਤੇ ਸਾਨੂੰ ਸੁਧਾਰਨ ਵਿੱਚ ਮਦਦ ਕਰੋ' : 
               'Share your thoughts and help us improve'}
            </Paragraph>
          </View>
        </View>
      </Surface>

      <Card style={styles.categoriesCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>{language === 'hi' ? 'प्रतिक्रिया श्रेणियां' : language === 'pa' ? 'ਫੀਡਬੈਕ ਸ਼੍ਰੇਣੀਆਂ' : 'Feedback Categories'}</Title>
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

      <Card style={styles.formCard} elevation={2}>
        <Card.Content>
          <Title style={styles.sectionTitle}>{language === 'hi' ? 'अपनी प्रतिक्रिया साझा करें' : language === 'pa' ? 'ਆਪਣਾ ਫੀਡਬੈਕ ਸਾਂਝਾ ਕਰੋ' : 'Share Your Feedback'}</Title>
          
          <TextInput
            label={t('yourFeedback')}
            value={feedback}
            onChangeText={setFeedback}
            mode="outlined"
            multiline
            numberOfLines={6}
            style={styles.feedbackInput}
            placeholder={t('feedbackPlaceholder')}
            left={<TextInput.Icon icon="message-text" />}
          />

          <Text style={styles.characterCount}>
            {feedback.length} {t('characters')}
          </Text>

          <Button
            mode="contained"
            onPress={handleSubmitFeedback}
            style={styles.submitButton}
            disabled={loading || !feedback.trim()}
            contentStyle={styles.buttonContent}
          >
            {loading ? <ActivityIndicator color="#fff" /> : t('submitFeedback')}
          </Button>
        </Card.Content>
      </Card>

      {storedFeedback.length > 0 && (
        <Card style={styles.historyCard} elevation={2}>
          <Card.Content>
            <View style={styles.historyHeader}>
              <Title style={styles.sectionTitle}>{language === 'hi' ? `आपका प्रतिक्रिया इतिहास (${storedFeedback.length})` : language === 'pa' ? `ਤੁਹਾਡਾ ਫੀਡਬੈਕ ਇਤਿਹਾਸ (${storedFeedback.length})` : `Your Feedback History (${storedFeedback.length})`}</Title>
              <Button 
                mode="text" 
                onPress={() => setShowHistory(!showHistory)}
                compact
              >
                {showHistory ? t('hide') : t('show')}
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
                        {item.synced ? `✓ ${t('synced')}` : `⏳ ${t('local')}`}
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
                    {language === 'hi' ? `... और ${storedFeedback.length - 5} और` : 
                     language === 'pa' ? `... ਅਤੇ ${storedFeedback.length - 5} ਹੋਰ` : 
                     `... and ${storedFeedback.length - 5} more`}
                  </Text>
                )}
                
                <Button 
                  mode="outlined" 
                  onPress={clearFeedbackHistory}
                  style={styles.clearButton}
                  compact
                >
                  {t('clearHistoryButton')}
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>
      )}

      <Card style={styles.guidelinesCard} elevation={2}>
        <Card.Content>
          <Title style={styles.guidelinesTitle}>📝 {language === 'hi' ? 'प्रतिक्रिया दिशानिर्देश' : language === 'pa' ? 'ਫੀਡਬੈਕ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼' : 'Feedback Guidelines'}</Title>
          <Paragraph style={styles.guidelineText}>
            {language === 'hi' ? '• अपने अनुभव या समस्या के बारे में विशिष्ट रहें' : 
             language === 'pa' ? '• ਆਪਣੇ ਤਜਰਬੇ ਜਾਂ ਸਮੱਸਿਆ ਬਾਰੇ ਖਾਸ ਰਹੋ' : 
             '• Be specific about your experience or issue'}
          </Paragraph>
          <Paragraph style={styles.guidelineText}>
            {language === 'hi' ? '• स्क्रीन या फीचर का उल्लेख करें जिसका आप जिक्र कर रहे हैं' : 
             language === 'pa' ? '• ਸਕ੍ਰੀਨ ਜਾਂ ਫੀਚਰ ਦਾ ਜ਼ਿਕਰ ਕਰੋ ਜਿਸ ਬਾਰੇ ਤੁਸੀਂ ਗੱਲ ਕਰ ਰਹੇ ਹੋ' : 
             '• Mention the screen or feature you\'re referring to'}
          </Paragraph>
          <Paragraph style={styles.guidelineText}>
            {language === 'hi' ? '• किसी भी बग को दोहराने के लिए चरण शामिल करें' : 
             language === 'pa' ? '• ਕਿਸੇ ਵੀ ਬੱਗ ਨੂੰ ਦੁਹਰਾਉਣ ਲਈ ਕਦਮ ਸ਼ਾਮਲ ਕਰੋ' : 
             '• Include steps to reproduce any bugs'}
          </Paragraph>
          <Paragraph style={styles.guidelineText}>
            {language === 'hi' ? '• सुधार या नई सुविधाओं का सुझाव दें' : 
             language === 'pa' ? '• ਸੁਧਾਰ ਜਾਂ ਨਵੀਆਂ ਸੁਵਿਧਾਵਾਂ ਦਾ ਸੁਝਾਅ ਦਿਓ' : 
             '• Suggest improvements or new features'}
          </Paragraph>
          <Paragraph style={styles.guidelineText}>
            {language === 'hi' ? '• रचनात्मक और सम्मानजनक रहें' : 
             language === 'pa' ? '• ਰਚਨਾਤਮਕ ਅਤੇ ਸਤਿਕਾਰਜਨਕ ਰਹੋ' : 
             '• Be constructive and respectful'}
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
    elevation: 4,
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
    elevation: 1,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  formCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    elevation: 3,
  },
  feedbackInput: {
    marginBottom: 12,
  },
  characterCount: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'right',
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 12,
    borderRadius: 12,
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
  },
  historyCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    elevation: 3,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  historyItem: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    elevation: 1,
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 12,
    fontWeight: '600',
  },
  syncChip: {
    height: 26,
  },
  historyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  historyDivider: {
    marginTop: 12,
  },
  moreText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 12,
    marginBottom: 8,
  },
  clearButton: {
    marginTop: 16,
    borderRadius: 8,
  },
});