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
  Text,
  ActivityIndicator,
  Menu,
  Button,
  TextInput,
} from 'react-native-paper';
import { getTranslation } from '../utils/translations';

export default function MarketPricesScreen({ user, language = 'en' }) {
  const t = (key) => getTranslation(language, key);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [vegetable, setVegetable] = useState('');
  const [stateMenuVisible, setStateMenuVisible] = useState(false);
  const [cityMenuVisible, setCityMenuVisible] = useState(false);

  const API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
  
  const states = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 
    'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  const citiesByState = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati', 'Kadapa'],
    'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Korba', 'Bilaspur', 'Durg', 'Rajnandgaon'],
    'Delhi': ['New Delhi', 'Central Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar'],
    'Haryana': ['Gurgaon', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Hisar', 'Rohtak', 'Sonipat'],
    'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Kullu', 'Hamirpur'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davangere', 'Bellary'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Dewas', 'Satna'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Brahmapur', 'Sambalpur', 'Puri', 'Balasore'],
    'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Firozpur'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Udaipur', 'Ajmer', 'Bhilwara', 'Alwar'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Tirunelveli', 'Erode', 'Vellore'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Bareilly', 'Ghaziabad'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Malda', 'Bardhaman']
  };

  const searchPrices = async () => {
    if (!selectedState || !vegetable.trim()) {
      Alert.alert('Error', 'Please select state and enter vegetable');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[state]=${selectedState}&filters[commodity]=${vegetable}&limit=10`
      );
      
      const data = await response.json();
      setPrices(data.records || []);
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch prices');
      setPrices([]);
    } finally {
      setLoading(false);
    }
  };



  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>{t('marketPrices')}</Title>
      
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.dropdownContainer}>
            <Menu
              visible={stateMenuVisible}
              onDismiss={() => setStateMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setStateMenuVisible(true)}
                  style={styles.dropdown}
                  contentStyle={styles.dropdownContent}
                >
                  {selectedState || 'Select State'}
                </Button>
              }
            >
              {states.map((state) => (
                <Menu.Item
                  key={state}
                  onPress={() => {
                    setSelectedState(state);
                    setSelectedCity('');
                    setStateMenuVisible(false);
                  }}
                  title={state}
                />
              ))}
            </Menu>

            <Menu
              visible={cityMenuVisible}
              onDismiss={() => setCityMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setCityMenuVisible(true)}
                  style={[styles.dropdown, !selectedState && styles.disabledDropdown]}
                  contentStyle={styles.dropdownContent}
                  disabled={!selectedState}
                >
                  {selectedCity || (selectedState ? 'Select City' : 'Select State First')}
                </Button>
              }
            >
              {(citiesByState[selectedState] || []).map((city) => (
                <Menu.Item
                  key={city}
                  onPress={() => {
                    setSelectedCity(city);
                    setCityMenuVisible(false);
                  }}
                  title={city}
                />
              ))}
            </Menu>
          </View>

          <TextInput
            label="Vegetable"
            value={vegetable}
            onChangeText={setVegetable}
            mode="outlined"
            style={styles.input}
            placeholder="e.g., Tomato, Onion"
          />
          
          <Button
            mode="contained"
            onPress={searchPrices}
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Card.Content>
      </Card>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {prices.map((price, index) => (
        <Card key={index} style={styles.priceCard}>
          <Card.Content>
            <View style={styles.priceRow}>
              <Text style={styles.commodity}>{price.commodity}</Text>
              <Text style={styles.price}>₹{price.modal_price}</Text>
            </View>
            <Text style={styles.market}>{price.market}</Text>
            <Text style={styles.range}>Min: ₹{price.min_price} | Max: ₹{price.max_price}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 15,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdown: {
    marginBottom: 12,
    justifyContent: 'flex-start',
  },
  dropdownContent: {
    justifyContent: 'flex-start',
  },
  disabledDropdown: {
    opacity: 0.6,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
  },
  loading: {
    alignItems: 'center',
    padding: 20,
  },
  priceCard: {
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  commodity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  market: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  range: {
    fontSize: 12,
    color: '#999',
  },
});