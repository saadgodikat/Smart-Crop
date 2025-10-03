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
  const [stateSearch, setStateSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');

  // Safe getter functions
  const getFilteredStates = () => {
    try {
      return states.filter(state => {
        if (!state || typeof state !== 'string') return false;
        const searchTerm = (stateSearch || '').toLowerCase();
        return state.toLowerCase().includes(searchTerm);
      });
    } catch (error) {
      console.error('Error filtering states:', error);
      return states;
    }
  };

  const getFilteredCities = () => {
    try {
      const cities = citiesByState[selectedState] || [];
      return cities.filter(city => {
        if (!city || typeof city !== 'string') return false;
        const searchTerm = (citySearch || '').toLowerCase();
        return city.toLowerCase().includes(searchTerm);
      });
    } catch (error) {
      console.error('Error filtering cities:', error);
      return citiesByState[selectedState] || [];
    }
  };

  const API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
  
  // Test API connectivity on component mount
  React.useEffect(() => {
    const testAPI = async () => {
      try {
        const testUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=1`;
        console.log('🧪 Testing API connectivity:', testUrl);
        const response = await fetch(testUrl);
        console.log('🧪 API Test Status:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('✅ API is working. Sample data:', data);
        } else {
          console.error('❌ API test failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('❌ API connectivity test failed:', error);
      }
    };
    testAPI();
  }, []);
  
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
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Sholapur', 'Amravati', 'Kolhapur'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Brahmapur', 'Sambalpur', 'Puri', 'Balasore'],
    'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Firozpur'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Udaipur', 'Ajmer', 'Bhilwara', 'Alwar'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Tirunelveli', 'Erode', 'Vellore'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Bareilly', 'Ghaziabad'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Malda', 'Bardhaman']
  };

  const searchPrices = async () => {
    console.log('=== MARKET PRICE API DEBUG ===');
    console.log('Selected State:', selectedState);
    console.log('Selected City:', selectedCity);
    console.log('Vegetable:', vegetable);
    
    if (!selectedState || !vegetable.trim()) {
      Alert.alert('Error', 'Please select state and enter vegetable');
      return;
    }

    setLoading(true);
    try {
      // Build API URL with proper encoding
      const stateFilter = encodeURIComponent(selectedState);
      const commodityFilter = encodeURIComponent(vegetable.trim());
      
      const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[state]=${stateFilter}&filters[commodity]=${commodityFilter}&limit=50`;
      
      console.log('🔗 API URL:', apiUrl);
      console.log('📤 Making API request...');
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📥 Response Status:', response.status);
      console.log('📥 Response Headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ API Response Data:', JSON.stringify(data, null, 2));
      console.log('📊 Total Records:', data.records?.length || 0);
      
      let filteredPrices = data.records || [];
      console.log('🔍 Before city filtering:', filteredPrices.length, 'records');
      
      // Debug: Show sample record structure
      if (filteredPrices.length > 0) {
        console.log('📋 Sample Record:', JSON.stringify(filteredPrices[0], null, 2));
      }
      
      // Client-side filtering by city if selected
      if (selectedCity && filteredPrices.length > 0) {
        console.log('🏙️ Filtering by city:', selectedCity);
        const beforeFilter = filteredPrices.length;
        
        filteredPrices = filteredPrices.filter(price => {
          const market = (price.market || '').toLowerCase();
          const district = (price.district || '').toLowerCase();
          const searchCity = selectedCity.toLowerCase();
          
          // Handle common spelling variations
          const cityVariations = {
            'solapur': ['sholapur', 'solapur'],
            'mumbai': ['mumbai', 'bombay'],
            'pune': ['pune', 'poona'],
            'bengaluru': ['bengaluru', 'bangalore'],
            'kolkata': ['kolkata', 'calcutta']
          };
          
          const searchVariations = cityVariations[searchCity] || [searchCity];
          
          const cityMatch = searchVariations.some(variation => 
            market.includes(variation) || district.includes(variation)
          );
          
          if (cityMatch) {
            console.log('✅ City match found:', price.market, price.district, 'for search:', selectedCity);
          }
          return cityMatch;
        });
        
        console.log(`🔍 City filtering: ${beforeFilter} → ${filteredPrices.length} records`);
      }
      
      console.log('📈 Final Results:', filteredPrices.length, 'records');
      
      if (filteredPrices.length === 0) {
        // Try to get data for the state without city filter
        console.log('🔄 No data found, trying state-wide search...');
        
        const stateWideUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[state]=${stateFilter}&limit=20`;
        
        try {
          const stateResponse = await fetch(stateWideUrl);
          const stateData = await stateResponse.json();
          const availableCommodities = [...new Set((stateData.records || []).map(r => r.commodity))].slice(0, 5);
          
          console.log('📊 Available commodities in', selectedState, ':', availableCommodities);
          
          const suggestions = availableCommodities.length > 0 
            ? `\n\nAvailable in ${selectedState}:\n• ${availableCommodities.join('\n• ')}`
            : '';
            
          const message = `No prices found for "${vegetable}" in ${selectedCity || selectedState}.\n\nTry:\n• Different spelling (Tomato, Onion, Potato)\n• Different state (Maharashtra, Punjab, Gujarat)\n• Remove city filter${suggestions}`;
          
          Alert.alert('No Data Found', message);
        } catch (error) {
          console.error('Error fetching state-wide data:', error);
          const message = `No prices found for "${vegetable}" in ${selectedCity || selectedState}.\n\nTry:\n• Different spelling (Tomato, Onion, Potato)\n• Different state (Maharashtra, Punjab, Gujarat)\n• Remove city filter`;
          Alert.alert('No Data Found', message);
        }
      }
      
      setPrices(filteredPrices);
    } catch (error) {
      console.error('❌ Market API Error:', error);
      console.error('❌ Error Stack:', error.stack);
      
      let errorMessage = 'Unable to fetch market prices. ';
      if (error.message.includes('Network')) {
        errorMessage += 'Check your internet connection.';
      } else if (error.message.includes('404')) {
        errorMessage += 'API endpoint not found.';
      } else if (error.message.includes('403')) {
        errorMessage += 'API access denied. Check API key.';
      } else {
        errorMessage += error.message;
      }
      
      Alert.alert('API Error', errorMessage);
      setPrices([]);
    } finally {
      setLoading(false);
      console.log('=== API DEBUG END ===');
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
              onDismiss={() => {
                setStateMenuVisible(false);
                setStateSearch('');
              }}
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
              <View style={styles.searchContainer}>
                <TextInput
                  placeholder="Search states..."
                  value={stateSearch || ''}
                  onChangeText={(text) => setStateSearch(text || '')}
                  style={styles.searchInput}
                  mode="outlined"
                  dense
                  autoCapitalize="none"
                />
              </View>
              {getFilteredStates().map((state) => (
                <Menu.Item
                  key={state}
                  onPress={() => {
                    setSelectedState(state);
                    setSelectedCity('');
                    setStateMenuVisible(false);
                    setStateSearch('');
                  }}
                  title={state}
                />
              ))}
              {getFilteredStates().length === 0 && (
                <Menu.Item title="No states found" disabled />
              )}
            </Menu>

            <Menu
              visible={cityMenuVisible}
              onDismiss={() => {
                setCityMenuVisible(false);
                setCitySearch('');
              }}
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
              {selectedState && (
                <View style={styles.searchContainer}>
                  <TextInput
                    placeholder="Search cities..."
                    value={citySearch || ''}
                    onChangeText={(text) => setCitySearch(text || '')}
                    style={styles.searchInput}
                    mode="outlined"
                    dense
                    autoCapitalize="none"
                  />
                </View>
              )}
              {getFilteredCities().map((city) => (
                <Menu.Item
                  key={city}
                  onPress={() => {
                    setSelectedCity(city);
                    setCityMenuVisible(false);
                    setCitySearch('');
                  }}
                  title={city}
                />
              ))}
              {selectedState && getFilteredCities().length === 0 && (
                <Menu.Item title="No cities found" disabled />
              )}
            </Menu>
          </View>

          <TextInput
            label="Commodity"
            value={vegetable}
            onChangeText={setVegetable}
            mode="outlined"
            style={styles.input}
            placeholder="Try: Potato, Onion, Tomato, Rice, Wheat"
          />
          
          <Text style={styles.suggestionText}>
            💡 Popular: Potato, Onion, Tomato, Rice, Wheat, Maize, Cotton
          </Text>
          
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

      {prices.length > 0 && (
        <Card style={styles.resultsHeader} elevation={1}>
          <Card.Content>
            <Text style={styles.resultsTitle}>
              📊 Found {prices.length} results for {vegetable} in {selectedCity || selectedState}
            </Text>
          </Card.Content>
        </Card>
      )}

      {prices.map((price, index) => (
        <Card key={index} style={styles.priceCard}>
          <Card.Content>
            <View style={styles.priceRow}>
              <Text style={styles.commodity}>{price.commodity}</Text>
              <Text style={styles.price}>₹{price.modal_price || 'N/A'}</Text>
            </View>
            <Text style={styles.market}>{price.market || 'Market not specified'}</Text>
            <Text style={styles.state}>State: {price.state}</Text>
            <Text style={styles.range}>
              Min: ₹{price.min_price || 'N/A'} | Max: ₹{price.max_price || 'N/A'}
            </Text>
            <Text style={styles.date}>Date: {price.arrival_date || 'Not specified'}</Text>
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
  resultsHeader: {
    marginBottom: 10,
    backgroundColor: '#E8F5E8',
  },
  resultsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
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
  state: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  date: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
  },
  searchContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    height: 40,
    fontSize: 14,
  },
  suggestionText: {
    fontSize: 11,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
});