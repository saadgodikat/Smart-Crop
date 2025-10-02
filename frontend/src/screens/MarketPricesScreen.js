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
  Chip,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../services/api';

export default function MarketPricesScreen({ user }) {
  const [marketPrices, setMarketPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');

  const locations = ['Solapur', 'Pune', 'Nashik', 'Nagpur', 'Aurangabad'];
  const crops = ['Chickpea', 'Wheat', 'Rice', 'Maize', 'Groundnut', 'Soybean', 'Cotton'];

  useEffect(() => {
    loadMarketPrices();
  }, []);

  const loadMarketPrices = async (location = null, crop = null) => {
    setLoading(true);
    try {
      const response = await ApiService.getMarketPrices(location, crop);
      setMarketPrices(response);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location) => {
    const newLocation = selectedLocation === location ? '' : location;
    setSelectedLocation(newLocation);
    loadMarketPrices(newLocation, selectedCrop);
  };

  const handleCropSelect = (crop) => {
    const newCrop = selectedCrop === crop ? '' : crop;
    setSelectedCrop(newCrop);
    loadMarketPrices(selectedLocation, newCrop);
  };

  const getPriceColor = (price) => {
    // Extract numeric value from price string (e.g., "₹5200/quintal" -> 5200)
    const priceNum = parseInt(price.replace(/[^\d]/g, ''));
    if (priceNum > 4000) return '#4CAF50'; // High price - Green
    if (priceNum > 2500) return '#FF9800'; // Medium price - Orange
    return '#F44336'; // Low price - Red
  };

  const getCropIcon = (crop) => {
    switch (crop.toLowerCase()) {
      case 'chickpea':
      case 'groundnut':
      case 'soybean':
        return 'leaf';
      case 'wheat':
      case 'rice':
      case 'maize':
        return 'grain';
      case 'cotton':
        return 'flower';
      default:
        return 'seedling';
    }
  };

  const renderMarketPriceCard = (price) => (
    <Card key={price.id} style={styles.priceCard} elevation={3}>
      <Card.Content>
        <View style={styles.priceHeader}>
          <View style={styles.cropContainer}>
            <Ionicons name={getCropIcon(price.crop)} size={24} color="#4CAF50" />
            <Text style={styles.cropText}>{price.crop}</Text>
          </View>
          <Surface style={[styles.priceBadge, { backgroundColor: getPriceColor(price.price) + '20' }]} elevation={1}>
            <Text style={[styles.priceText, { color: getPriceColor(price.price) }]}>
              {price.price}
            </Text>
          </Surface>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={styles.locationText}>{price.location}</Text>
        </View>

        <View style={styles.priceAnalysis}>
          <Text style={styles.analysisLabel}>Price Analysis:</Text>
          <Text style={[styles.analysisText, { color: getPriceColor(price.price) }]}>
            {getPriceAnalysis(price.price)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  const getPriceAnalysis = (price) => {
    const priceNum = parseInt(price.replace(/[^\d]/g, ''));
    if (priceNum > 4000) return 'High Market Price';
    if (priceNum > 2500) return 'Moderate Market Price';
    return 'Lower Market Price';
  };

  const getMarketSummary = () => {
    if (marketPrices.length === 0) return null;

    const totalPrices = marketPrices.length;
    const avgPrice = marketPrices.reduce((sum, price) => {
      const priceNum = parseInt(price.price.replace(/[^\d]/g, ''));
      return sum + priceNum;
    }, 0) / totalPrices;

    const highestPrice = Math.max(...marketPrices.map(price => 
      parseInt(price.price.replace(/[^\d]/g, ''))
    ));

    const lowestPrice = Math.min(...marketPrices.map(price => 
      parseInt(price.price.replace(/[^\d]/g, ''))
    ));

    return { totalPrices, avgPrice, highestPrice, lowestPrice };
  };

  const renderMarketSummary = () => {
    const summary = getMarketSummary();
    if (!summary) return null;

    return (
      <Card style={styles.summaryCard} elevation={3}>
        <Card.Content>
          <Title style={styles.summaryTitle}>Market Summary / बाजार सारांश</Title>
          <View style={styles.summaryGrid}>
            <Surface style={styles.summaryItem} elevation={1}>
              <Text style={styles.summaryLabel}>Total Crops</Text>
              <Text style={styles.summaryValue}>{summary.totalPrices}</Text>
            </Surface>
            <Surface style={styles.summaryItem} elevation={1}>
              <Text style={styles.summaryLabel}>Avg Price</Text>
              <Text style={styles.summaryValue}>₹{Math.round(summary.avgPrice)}</Text>
            </Surface>
            <Surface style={styles.summaryItem} elevation={1}>
              <Text style={styles.summaryLabel}>Highest</Text>
              <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>₹{summary.highestPrice}</Text>
            </Surface>
            <Surface style={styles.summaryItem} elevation={1}>
              <Text style={styles.summaryLabel}>Lowest</Text>
              <Text style={[styles.summaryValue, { color: '#F44336' }]}>₹{summary.lowestPrice}</Text>
            </Surface>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Surface style={styles.headerCard} elevation={2}>
        <View style={styles.headerContent}>
          <Ionicons name="trending-up" size={40} color="#FF9800" />
          <View style={styles.headerText}>
            <Title style={styles.headerTitle}>Market Prices</Title>
            <Title style={styles.headerTitleHindi}>बाजार मूल्य</Title>
            <Paragraph style={styles.headerSubtitle}>
              Latest crop prices in your area
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Filters */}
      <Card style={styles.filterCard} elevation={2}>
        <Card.Content>
          <Title style={styles.filterTitle}>Filter Prices / मूल्य फ़िल्टर करें</Title>
          
          {/* Location Filter */}
          <Text style={styles.filterSubtitle}>Location / स्थान:</Text>
          <View style={styles.chipContainer}>
            <Chip
              selected={selectedLocation === ''}
              onPress={() => handleLocationSelect('')}
              style={[
                styles.chip,
                selectedLocation === '' && styles.selectedChip
              ]}
              textStyle={selectedLocation === '' && styles.selectedChipText}
            >
              All Locations
            </Chip>
            {locations.map((location) => (
              <Chip
                key={location}
                selected={selectedLocation === location}
                onPress={() => handleLocationSelect(location)}
                style={[
                  styles.chip,
                  selectedLocation === location && styles.selectedChip
                ]}
                textStyle={selectedLocation === location && styles.selectedChipText}
              >
                {location}
              </Chip>
            ))}
          </View>

          {/* Crop Filter */}
          <Text style={styles.filterSubtitle}>Crop / फसल:</Text>
          <View style={styles.chipContainer}>
            <Chip
              selected={selectedCrop === ''}
              onPress={() => handleCropSelect('')}
              style={[
                styles.chip,
                selectedCrop === '' && styles.selectedChip
              ]}
              textStyle={selectedCrop === '' && styles.selectedChipText}
            >
              All Crops
            </Chip>
            {crops.map((crop) => (
              <Chip
                key={crop}
                selected={selectedCrop === crop}
                onPress={() => handleCropSelect(crop)}
                style={[
                  styles.chip,
                  selectedCrop === crop && styles.selectedChip
                ]}
                textStyle={selectedCrop === crop && styles.selectedChipText}
              >
                {crop}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Loading State */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF9800" />
          <Text style={styles.loadingText}>Loading market prices...</Text>
        </View>
      )}

      {/* Market Summary */}
      {!loading && renderMarketSummary()}

      {/* Price Cards */}
      {!loading && marketPrices.map(renderMarketPriceCard)}

      {/* Market Tips */}
      <Card style={styles.tipsCard} elevation={2}>
        <Card.Content>
          <Title style={styles.tipsTitle}>💰 Market Tips / बाजार सुझाव</Title>
          <Paragraph style={styles.tipText}>
            • Monitor price trends before selling your crops
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Compare prices across different locations
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Consider storage options during low prices
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Plan crop selection based on market demand
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Network with other farmers for better deals
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Price Range Guide */}
      <Card style={styles.priceGuideCard} elevation={2}>
        <Card.Content>
          <Title style={styles.priceGuideTitle}>Price Range Guide / मूल्य रेंज गाइड</Title>
          <View style={styles.priceGuideContainer}>
            <View style={styles.priceRange}>
              <View style={[styles.priceBar, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.priceRangeText}>Above ₹4000 - High Value</Text>
            </View>
            <View style={styles.priceRange}>
              <View style={[styles.priceBar, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.priceRangeText}>₹2500-4000 - Moderate</Text>
            </View>
            <View style={styles.priceRange}>
              <View style={[styles.priceBar, { backgroundColor: '#F44336' }]} />
              <Text style={styles.priceRangeText}>Below ₹2500 - Lower Value</Text>
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
    backgroundColor: '#FFF3E0',
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
    color: '#FF9800',
    marginBottom: 2,
  },
  headerTitleHindi: {
    fontSize: 16,
    color: '#FF9800',
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
  filterSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    marginTop: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#E0E0E0',
  },
  selectedChip: {
    backgroundColor: '#FF9800',
  },
  selectedChipText: {
    color: '#fff',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  summaryCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  priceCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cropContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cropText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  priceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  priceAnalysis: {
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 6,
  },
  analysisLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  analysisText: {
    fontSize: 12,
    fontWeight: 'bold',
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
  priceGuideCard: {
    margin: 15,
    marginBottom: 30,
    borderRadius: 12,
  },
  priceGuideTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  priceGuideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceRange: {
    alignItems: 'center',
    width: '30%',
  },
  priceBar: {
    height: 20,
    width: '100%',
    borderRadius: 4,
    marginBottom: 5,
  },
  priceRangeText: {
    fontSize: 8,
    textAlign: 'center',
    color: '#666',
  },
});
