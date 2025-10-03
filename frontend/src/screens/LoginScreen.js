import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';

export default function LoginScreen({ navigation, onLogin }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const { currentLanguage } = useLanguage();
  
  const t = (key) => getTranslation(key, currentLanguage);

  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^[6-9][0-9]{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handlePhoneChange = (text) => {
    // Only allow numbers and limit to 10 digits
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(numericText);
    
    if (numericText.length > 0 && numericText.length < 10) {
      setPhoneError('Phone number must be exactly 10 digits');
    } else if (numericText.length === 10) {
      if (!validatePhone(numericText)) {
        setPhoneError('Phone number must start with 6, 7, 8, or 9');
      } else {
        setPhoneError('');
      }
    } else {
      setPhoneError('');
    }
  };

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert('Error', 'Please enter a valid phone number starting with 6, 7, 8, or 9');
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.login(phone, password);
      onLogin(response.user);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={80} color="#4CAF50" />
          <Title style={styles.title}>Smart Crop Advisory</Title>
          <Paragraph style={styles.subtitle}>
            फसल सलाहकार / किसानों के लिए स्मार्ट समाधान
          </Paragraph>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Login / लॉगिन</Title>
            
            <TextInput
              label={t('phoneNumber')}
              value={phone}
              onChangeText={handlePhoneChange}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
              placeholder={t('enterPhoneNumber')}
              left={<TextInput.Icon icon="phone" />}
              maxLength={10}
              error={phoneError !== ''}
            />
            {phoneError !== '' && (
              <Text style={styles.errorText}>{phoneError}</Text>
            )}

            <TextInput
              label={t('password')}
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              placeholder={t('enterPassword')}
              left={<TextInput.Icon icon="lock" />}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              disabled={loading}
              contentStyle={styles.buttonContent}
            >
              {loading ? <ActivityIndicator color="#fff" /> : t('login')}
            </Button>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>
                {t('dontHaveAccount')}
              </Text>
              <Button
                mode="text"
                onPress={navigateToSignup}
                style={styles.signupButton}
              >
                {t('signUp')}
              </Button>
            </View>

           {/* // <View style={styles.demoCredentials}> */}
           {/* //   <Text style={styles.demoTitle}>Demo Credentials / डेमो क्रेडेंशियल्स:</Text> */}
           {/* //   <Text style={styles.demoText}>Phone: 9876543210</Text> */}
           {/* //   <Text style={styles.demoText}>Password: password123</Text> */}
           {/* // </View> */} 
          </Card.Content>
        </Card>
      </ScrollView> 
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  card: {
    elevation: 4,
    borderRadius: 12,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#4CAF50',
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  signupContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  signupText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  signupButton: {
    marginTop: 5,
  },
  demoCredentials: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  errorText: {
    fontSize: 12,
    color: '#d32f2f',
    marginTop: -12,
    marginBottom: 8,
    marginLeft: 12,
  },
});
