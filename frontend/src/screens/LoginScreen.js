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

export default function LoginScreen({ navigation, onLogin }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
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
              label="Phone Number / फोन नंबर"
              value={phone}
              onChangeText={setPhone}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
              placeholder="Enter your phone number"
              left={<TextInput.Icon icon="phone" />}
            />

            <TextInput
              label="Password / पासवर्ड"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              placeholder="Enter your password"
              left={<TextInput.Icon icon="lock" />}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              disabled={loading}
              contentStyle={styles.buttonContent}
            >
              {loading ? <ActivityIndicator color="#fff" /> : 'Login / लॉगिन'}
            </Button>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>
                Don't have an account? / खाता नहीं है?
              </Text>
              <Button
                mode="text"
                onPress={navigateToSignup}
                style={styles.signupButton}
              >
                Sign Up / साइन अप
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
});
