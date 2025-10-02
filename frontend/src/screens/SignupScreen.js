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
  ActivityIndicator,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../services/api';

export default function SignupScreen({ navigation, onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    soilType: '',
    lastCrop: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    const { name, phone, password, confirmPassword, location, soilType, lastCrop } = formData;

    if (!name || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      await ApiService.signup({
        name,
        phone,
        password,
        location: location || null,
        soil_type: soilType || null,
        last_crop: lastCrop || null,
      });
      
      Alert.alert(
        'Success',
        'Account created successfully! Please login with your credentials.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Ionicons name="person-add" size={60} color="#4CAF50" />
          <Title style={styles.title}>Create Account</Title>
          <Title style={styles.titleHindi}>खाता बनाएं</Title>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Sign Up / साइन अप</Title>
            
            <TextInput
              label="Full Name * / पूरा नाम *"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              mode="outlined"
              style={styles.input}
              placeholder="Enter your full name"
              left={<TextInput.Icon icon="account" />}
            />

            <TextInput
              label="Phone Number * / फोन नंबर *"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
              placeholder="10-digit phone number"
              left={<TextInput.Icon icon="phone" />}
            />

            <TextInput
              label="Password * / पासवर्ड *"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              placeholder="Create a password"
              left={<TextInput.Icon icon="lock" />}
            />

            <TextInput
              label="Confirm Password * / पासवर्ड की पुष्टि करें *"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              placeholder="Confirm your password"
              left={<TextInput.Icon icon="lock-check" />}
            />

            <TextInput
              label="Location / स्थान (Optional)"
              value={formData.location}
              onChangeText={(value) => handleInputChange('location', value)}
              mode="outlined"
              style={styles.input}
              placeholder="e.g., Solapur, Maharashtra"
              left={<TextInput.Icon icon="map-marker" />}
            />

            <TextInput
              label="Soil Type / मिट्टी का प्रकार (Optional)"
              value={formData.soilType}
              onChangeText={(value) => handleInputChange('soilType', value)}
              mode="outlined"
              style={styles.input}
              placeholder="e.g., black, sandy, clay"
              left={<TextInput.Icon icon="earth" />}
            />

            <TextInput
              label="Last Crop / पिछली फसल (Optional)"
              value={formData.lastCrop}
              onChangeText={(value) => handleInputChange('lastCrop', value)}
              mode="outlined"
              style={styles.input}
              placeholder="e.g., cotton, wheat, rice"
              left={<TextInput.Icon icon="seedling" />}
            />

            <Button
              mode="contained"
              onPress={handleSignup}
              style={styles.signupButton}
              disabled={loading}
              contentStyle={styles.buttonContent}
            >
              {loading ? <ActivityIndicator color="#fff" /> : 'Create Account / खाता बनाएं'}
            </Button>

            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
            >
              Already have an account? Login / पहले से खाता है? लॉगिन
            </Button>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  titleHindi: {
    fontSize: 18,
    color: '#4CAF50',
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
    marginBottom: 12,
  },
  signupButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
