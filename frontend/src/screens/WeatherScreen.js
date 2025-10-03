
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
  Text,
  Surface,
  ActivityIndicator,
  TextInput,
  Button,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../services/api';
import { getTranslation } from '../utils/translations';

export default function WeatherScreen({ user, language = 'en' }) {
  const t = (key) => getTranslation(language, key);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  const API_KEY = 'b6ca262dc1d56e9480c61a34cad13d46';

  
  useEffect(() => {
    // Load default location weather on component mount
    if (user?.location) {
      setSearchQuery(user.location);
      fetchWeatherData(user.location);
    } else {
      // Default to a major city if no user location
      setSearchQuery('Mumbai');
      fetchWeatherData('Mumbai');
    }
  }, []);

  const fetchWeatherData = async (cityName) => {
    if (!cityName.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching weather for:', cityName);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );
      
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.log('API Error:', errorData);
        throw new Error(errorData.message || 'City not found. Please check the spelling and try again.');
      }
      
      const data = await response.json();
      
      // Transform API data to our format
      const weatherData = {
        id: data.id,
        location: data.name,
        temperature: `${Math.round(data.main.temp)}°C`,
        humidity: `${data.main.humidity}%`,
        rainfall: data.rain ? `${data.rain['1h'] || 0}mm` : '0mm',
        description: data.weather[0].description,
        windSpeed: `${data.wind.speed} m/s`,
        pressure: `${data.main.pressure} hPa`,
        visibility: `${data.visibility / 1000} km`,
        country: data.sys.country,
        icon: data.weather[0].icon
      };
      
      setWeather(weatherData);
      setCurrentLocation(cityName);
      console.log('Weather data updated for:', cityName);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeatherData(searchQuery);
  };

  const getTemperatureColor = (temp) => {
    const tempNum = parseInt(temp);
    if (tempNum < 20) return '#2196F3'; // Cold - Blue
    if (tempNum < 30) return '#4CAF50'; // Moderate - Green
    if (tempNum < 35) return '#FF9800'; // Warm - Orange
    return '#F44336'; // Hot - Red
  };

  const getHumidityColor = (humidity) => {
    const humidityNum = parseInt(humidity);
    if (humidityNum < 40) return '#FF9800'; // Low - Orange
    if (humidityNum < 70) return '#4CAF50'; // Moderate - Green
    return '#2196F3'; // High - Blue
  };

  const getRainfallColor = (rainfall) => {
    const rainfallNum = parseInt(rainfall);
    if (rainfallNum === 0) return '#F44336'; // No rain - Red
    if (rainfallNum < 10) return '#FF9800'; // Light rain - Orange
    if (rainfallNum < 25) return '#4CAF50'; // Moderate rain - Green
    return '#2196F3'; // Heavy rain - Blue
  };

  const getWeatherIcon = (iconCode) => {
    // Map OpenWeatherMap icon codes to Ionicons
    const iconMap = {
      '01d': 'sunny',
      '01n': 'moon',
      '02d': 'partly-sunny',
      '02n': 'cloudy-night',
      '03d': 'cloudy',
      '03n': 'cloudy',
      '04d': 'cloudy',
      '04n': 'cloudy',
      '09d': 'rainy',
      '09n': 'rainy',
      '10d': 'rainy',
      '10n': 'rainy',
      '11d': 'thunderstorm',
      '11n': 'thunderstorm',
      '13d': 'snow',
      '13n': 'snow',
      '50d': 'cloudy',
      '50n': 'cloudy'
    };
    return iconMap[iconCode] || 'cloudy';
  };

  const getWeatherAdvice = (temp, rainfall, humidity) => {
    const tempNum = parseInt(temp);
    const rainfallNum = parseInt(rainfall);
    const humidityNum = parseInt(humidity);

    let advice = [];
    
    if (tempNum > 35) {
      advice.push('• Avoid field work during peak heat hours');
      advice.push('• Ensure adequate irrigation');
    } else if (tempNum < 20) {
      advice.push('• Protect sensitive crops from cold');
      advice.push('• Consider covering young plants');
    }

    if (rainfallNum > 20) {
      advice.push('• Avoid field operations during heavy rain');
      advice.push('• Check drainage systems');
    } else if (rainfallNum === 0 && humidityNum < 40) {
      advice.push('• Increase irrigation frequency');
      advice.push('• Monitor soil moisture levels');
    }

    if (humidityNum > 80) {
      advice.push('• Watch for fungal diseases');
      advice.push('• Ensure good air circulation');
    }

    return advice.length > 0 ? advice : ['• Weather conditions are favorable for farming activities'];
  };

  const renderWeatherCard = (weatherData) => (
    <Card key={weatherData.id} style={styles.weatherCard} elevation={3}>
      <Card.Content>
        <View style={styles.weatherHeader}>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={20} color="#4CAF50" />
            <Text style={styles.locationText}>{weatherData.location}, {weatherData.country}</Text>
          </View>
          <Ionicons 
            name={getWeatherIcon(weatherData.icon)} 
            size={40} 
            color="#2196F3" 
          />
        </View>

        <View style={styles.weatherDescription}>
          <Text style={styles.descriptionText}>{weatherData.description}</Text>
        </View>

        <View style={styles.weatherMetrics}>
          {/* Temperature */}
          <Surface style={styles.metricCard} elevation={2}>
            <View style={styles.metricHeader}>
              <Ionicons name="thermometer" size={20} color={getTemperatureColor(weatherData.temperature)} />
              <Text style={styles.metricTitle}>{t('temperature')}</Text>
            </View>
            <Text style={[styles.metricValue, { color: getTemperatureColor(weatherData.temperature) }]}>
              {weatherData.temperature}
            </Text>
          </Surface>

          {/* Humidity */}
          <Surface style={styles.metricCard} elevation={2}>
            <View style={styles.metricHeader}>
              <Ionicons name="water" size={20} color={getHumidityColor(weatherData.humidity)} />
              <Text style={styles.metricTitle}>{t('humidity')}</Text>
            </View>
            <Text style={[styles.metricValue, { color: getHumidityColor(weatherData.humidity) }]}>
              {weatherData.humidity}
            </Text>
          </Surface>

          {/* Wind Speed */}
          <Surface style={styles.metricCard} elevation={2}>
            <View style={styles.metricHeader}>
              <Ionicons name="leaf" size={20} color="#4CAF50" />
              <Text style={styles.metricTitle}>{t('windSpeed')}</Text>
            </View>
            <Text style={[styles.metricValue, { color: '#4CAF50' }]}>
              {weatherData.windSpeed}
            </Text>
          </Surface>
        </View>

        <View style={styles.additionalMetrics}>
          <Surface style={styles.additionalCard} elevation={1}>
            <Text style={styles.additionalLabel}>{t('pressure')}</Text>
            <Text style={styles.additionalValue}>{weatherData.pressure}</Text>
          </Surface>
          <Surface style={styles.additionalCard} elevation={1}>
            <Text style={styles.additionalLabel}>{t('visibility')}</Text>
            <Text style={styles.additionalValue}>{weatherData.visibility}</Text>
          </Surface>
        </View>

        {/* Weather Advice */}
        <Surface style={styles.adviceCard} elevation={1}>
          <View style={styles.adviceHeader}>
            <Ionicons name="bulb" size={20} color="#FF9800" />
            <Text style={styles.adviceTitle}>{t('farmingAdvice')}</Text>
          </View>
          {getWeatherAdvice(weatherData.temperature, weatherData.rainfall, weatherData.humidity).map((tip, index) => (
            <Text key={index} style={styles.adviceText}>{tip}</Text>
          ))}
        </Surface>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Surface style={styles.headerCard} elevation={2}>
        <View style={styles.headerContent}>
          <Ionicons name="cloud" size={40} color="#2196F3" />
          <View style={styles.headerText}>
            <Title style={styles.headerTitle}>Weather Information</Title>
            <Title style={styles.headerTitleHindi}>मौसम की जानकारी</Title>
            <Paragraph style={styles.headerSubtitle}>
              Current weather conditions and farming advice
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Search Location */}
      <Card style={styles.filterCard} elevation={2}>
        <Card.Content>
          <Title style={styles.filterTitle}>Search City / शहर खोजें</Title>
          <TextInput
            label="Enter city name"
            value={searchQuery}
            onChangeText={setSearchQuery}
            mode="outlined"
            style={styles.searchInput}
            placeholder="e.g., Mumbai, Delhi, Pune"
            left={<TextInput.Icon icon="magnify" />}
            right={
              <TextInput.Icon 
                icon="crosshairs-gps" 
                onPress={() => {
                  if (searchQuery.trim()) {
                    fetchWeatherData(searchQuery);
                  }
                }}
              />
            }
          />
          <Button
            mode="contained"
            onPress={handleSearch}
            style={styles.searchButton}
            disabled={loading || !searchQuery.trim()}
            contentStyle={styles.buttonContent}
          >
            {loading ? <ActivityIndicator color="#fff" /> : 'Get Weather'}
          </Button>
        </Card.Content>
      </Card>

      {/* Loading State */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Loading weather data...</Text>
        </View>
      )}

      {/* Weather Card */}
      {!loading && weather && renderWeatherCard(weather)}

      {/* General Weather Tips */}
      <Card style={styles.tipsCard} elevation={2}>
        <Card.Content>
          <Title style={styles.tipsTitle}>🌤️ Weather Tips / मौसम सुझाव</Title>
          <Paragraph style={styles.tipText}>
            • Monitor weather forecasts before planning field activities
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Adjust irrigation based on rainfall predictions
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Protect crops during extreme weather conditions
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Use weather data for optimal planting and harvesting times
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • High humidity increases disease risk - monitor crops closely
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Temperature Guide */}
      <Card style={styles.temperatureGuideCard} elevation={2}>
        <Card.Content>
          <Title style={styles.temperatureGuideTitle}>Temperature Guide / तापमान गाइड</Title>
          <View style={styles.temperatureGuideContainer}>
            <View style={styles.temperatureRange}>
              <View style={[styles.temperatureBar, { backgroundColor: '#2196F3' }]} />
              <Text style={styles.temperatureRangeText}>Below 20°C - Cold</Text>
            </View>
            <View style={styles.temperatureRange}>
              <View style={[styles.temperatureBar, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.temperatureRangeText}>20-30°C - Moderate</Text>
            </View>
            <View style={styles.temperatureRange}>
              <View style={[styles.temperatureBar, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.temperatureRangeText}>30-35°C - Warm</Text>
            </View>
            <View style={styles.temperatureRange}>
              <View style={[styles.temperatureBar, { backgroundColor: '#F44336' }]} />
              <Text style={styles.temperatureRangeText}>Above 35°C - Hot</Text>
            </View>
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
    backgroundColor: '#E3F2FD',
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
    color: '#2196F3',
    marginBottom: 2,
  },
  headerTitleHindi: {
    fontSize: 16,
    color: '#2196F3',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  filterCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  searchInput: {
    marginBottom: 15,
  },
  searchButton: {
    marginTop: 5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  weatherDescription: {
    alignItems: 'center',
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    textTransform: 'capitalize',
  },
  additionalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  additionalCard: {
    width: '48%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  additionalLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  additionalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  weatherCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  weatherMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  metricCard: {
    width: '30%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  adviceCard: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF3E0',
  },
  adviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  adviceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
    marginLeft: 5,
  },
  adviceText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
    lineHeight: 16,
  },
  tipsCard: {
    margin: 15,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#E8F5E8',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    lineHeight: 16,
  },
  temperatureGuideCard: {
    margin: 15,
    marginBottom: 30,
    borderRadius: 12,
  },
  temperatureGuideTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  temperatureGuideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  temperatureRange: {
    alignItems: 'center',
    width: '22%',
  },
  temperatureBar: {
    height: 20,
    width: '100%',
    borderRadius: 4,
    marginBottom: 5,
  },
  temperatureRangeText: {
    fontSize: 8,
    textAlign: 'center',
    color: '#666',
  },
});
