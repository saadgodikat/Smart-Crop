import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Surface,
  ActivityIndicator,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { getTranslation } from '../utils/translations';

const API_BASE_URL = 'http://192.168.1.100:3000';

export default function ChatbotScreen({ user, language = 'en' }) {
  const t = (key) => getTranslation(language, key);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('chatbotWelcome'),
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          userId: user?.id,
          language: language,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const botMessage = {
          id: Date.now() + 1,
          text: data.response,
          isBot: true,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: language === 'hi' ? 'माफ़ करें, मुझे अभी जवाब देने में परेशानी हो रही है। कृपया फिर से कोशिश करें।' : 'Sorry, I\'m having trouble responding right now. Please try again.',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const quickQuestions = language === 'hi' ? [
    t('whatCropsPlant'),
    t('howWeather'),
    t('soilHealthTips'),
    t('pestControlAdvice'),
  ] : [
    t('whatCropsPlant'),
    t('howWeather'),
    t('soilHealthTips'),
    t('pestControlAdvice'),
  ];

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.isBot ? styles.botMessageWrapper : styles.userMessageWrapper,
            ]}
          >
            <Card
              style={[
                styles.messageCard,
                message.isBot ? styles.botMessage : styles.userMessage,
              ]}
            >
              <Card.Content style={styles.messageContent}>
                {message.isBot && (
                  <Ionicons
                    name="leaf"
                    size={16}
                    color="#4CAF50"
                    style={styles.botIcon}
                  />
                )}
                <Text
                  style={[
                    styles.messageText,
                    message.isBot ? styles.botText : styles.userText,
                  ]}
                >
                  {message.text}
                </Text>
              </Card.Content>
            </Card>
          </View>
        ))}
        
        {isLoading && (
          <View style={styles.loadingWrapper}>
            <Card style={styles.loadingCard}>
              <Card.Content style={styles.loadingContent}>
                <ActivityIndicator size="small" color="#4CAF50" />
                <Text style={styles.loadingText}>{t('chatbotTyping')}</Text>
              </Card.Content>
            </Card>
          </View>
        )}

        <View style={styles.quickQuestionsContainer}>
          <Text style={styles.quickQuestionsTitle}>{t('quickQuestions')}:</Text>
          {quickQuestions.map((question, index) => (
            <Button
              key={index}
              mode="outlined"
              onPress={() => setInputText(question)}
              style={styles.quickQuestionButton}
              contentStyle={styles.quickQuestionContent}
            >
              {question}
            </Button>
          ))}
        </View>
      </ScrollView>

      <Surface style={styles.inputContainer} elevation={4}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder={t('chatbotPlaceholder')}
          multiline
          maxLength={500}
          disabled={isLoading}
        />
        <Button
          mode="contained"
          onPress={sendMessage}
          disabled={!inputText.trim() || isLoading}
          style={styles.sendButton}
          contentStyle={styles.sendButtonContent}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </Button>
      </Surface>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageWrapper: {
    marginBottom: 10,
  },
  botMessageWrapper: {
    alignItems: 'flex-start',
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  messageCard: {
    maxWidth: '80%',
    borderRadius: 15,
  },
  botMessage: {
    backgroundColor: '#E8F5E8',
  },
  userMessage: {
    backgroundColor: '#4CAF50',
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  botIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  botText: {
    color: '#333',
  },
  userText: {
    color: '#fff',
  },
  loadingWrapper: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  loadingCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 15,
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  loadingText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  quickQuestionsContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  quickQuestionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  quickQuestionButton: {
    marginBottom: 8,
    borderColor: '#4CAF50',
  },
  quickQuestionContent: {
    paddingVertical: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#F5F5F5',
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  sendButtonContent: {
    width: 50,
    height: 50,
  },
});