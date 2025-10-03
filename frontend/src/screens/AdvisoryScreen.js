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
  Paragraph,
  TextInput,
  Button,
  Text,
  Surface,
  ActivityIndicator,
  Chip,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../services/api';

export default function AdvisoryScreen({ user }) {
  const [soilType, setSoilType] = useState(user?.soil_type || '');
  const [lastCrop, setLastCrop] = useState(user?.last_crop || '');
  const [loading, setLoading] = useState(false);
  const [advisory, setAdvisory] = useState(null);

  // New recommendation inputs
  const seasons = ['Kharif', 'Rabi', 'Zaid', 'Summer', 'Monsoon'];
  const [selectedSeason, setSelectedSeason] = useState('Kharif');
  const [inputPH, setInputPH] = useState('');
  const [region, setRegion] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const soilTypes = ['black', 'sandy', 'clay', 'loamy', 'red'];
  const commonCrops = ['cotton', 'wheat', 'rice', 'maize', 'sugarcane', 'groundnut', 'soybean'];

  const handleGetAdvisory = async () => {
    if (!soilType || !lastCrop) {
      Alert.alert('Error', 'Please select soil type and last crop');
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.getAdvisory(soilType, lastCrop);
      setAdvisory(response);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Local recommendation generator (season, pH, region)
  const generateRecommendations = () => {
    const ph = parseFloat(inputPH);
    if (Number.isNaN(ph) || ph <= 0) {
      return [];
    }

    const isAcidic = ph < 6.5;
    const isNeutral = ph >= 6.5 && ph <= 7.5;
    const isAlkaline = ph > 7.5;

    const cropPool = [
      { name: 'Wheat', seasons: ['Rabi'], ph: 'neutral', water: 'Moderate', fertilizer: 'NPK 120:60:40', sow: 'Nov-Dec', harvest: 'Mar-Apr' },
      { name: 'Rice', seasons: ['Kharif'], ph: 'acidic', water: 'High', fertilizer: 'NPK 100:50:50', sow: 'Jun-Jul', harvest: 'Oct-Nov' },
      { name: 'Maize', seasons: ['Kharif', 'Rabi'], ph: 'neutral', water: 'Moderate', fertilizer: 'NPK 120:60:40', sow: 'Jun-Jul', harvest: 'Sep-Oct' },
      { name: 'Cotton', seasons: ['Kharif'], ph: 'alkaline', water: 'Low', fertilizer: 'NPK 90:45:45', sow: 'Apr-May', harvest: 'Oct-Dec' },
      { name: 'Sorghum', seasons: ['Kharif', 'Rabi'], ph: 'alkaline', water: 'Low', fertilizer: 'NPK 80:40:40', sow: 'Jun-Jul', harvest: 'Sep-Oct' },
      { name: 'Chickpea', seasons: ['Rabi'], ph: 'neutral', water: 'Low', fertilizer: 'NPK 20:40:0', sow: 'Oct-Nov', harvest: 'Feb-Mar' },
      { name: 'Groundnut', seasons: ['Kharif'], ph: 'neutral', water: 'Moderate', fertilizer: 'NPK 20:40:40', sow: 'Jun-Jul', harvest: 'Oct-Nov' },
      { name: 'Sugarcane', seasons: ['Summer'], ph: 'alkaline', water: 'High', fertilizer: 'NPK 250:115:115', sow: 'Feb-Mar', harvest: 'Jan-Feb' },
    ];

    const seasonFiltered = cropPool.filter(c => c.seasons.includes(selectedSeason));
    const scored = seasonFiltered.map(crop => {
      let score = 0;
      if (isNeutral && crop.ph === 'neutral') score += 2;
      if (isAcidic && crop.ph === 'acidic') score += 2;
      if (isAlkaline && crop.ph === 'alkaline') score += 2;
      if (region && crop.name.toLowerCase().includes('rice') && region.toLowerCase().includes('coastal')) score += 1;
      return { ...crop, score };
    });
    const sorted = scored.sort((a, b) => b.score - a.score).slice(0, 5);
    return sorted.map(c => ({ ...c, rating: c.score >= 2 ? 'High' : c.score === 1 ? 'Moderate' : 'Low' }));
  };

  const handleRecommend = () => {
    const result = generateRecommendations();
    setRecommendations(result);
  };

  const renderAdvisoryCard = () => {
    if (!advisory) return null;

    return (
      <Card style={styles.advisoryCard} elevation={4}>
        <Card.Content>
          <Title style={styles.advisoryTitle}>🌱 Crop Recommendation</Title>
          <Title style={styles.advisoryTitleHindi}>फसल सिफारिश</Title>
          
          <View style={styles.recommendationContainer}>
            <Surface style={styles.recommendationCard} elevation={2}>
              <View style={styles.recommendationHeader}>
                <Ionicons name="leaf" size={24} color="#4CAF50" />
                <Text style={styles.recommendationTitle}>Recommended Crop</Text>
              </View>
              <Text style={styles.recommendationValue}>{advisory.crop_recommendation}</Text>
            </Surface>
          </View>

          <View style={styles.infoGrid}>
            <Surface style={styles.infoCard} elevation={2}>
              <View style={styles.infoHeader}>
                <Ionicons name="flask" size={20} color="#FF9800" />
                <Text style={styles.infoTitle}>Fertilizer</Text>
              </View>
              <Text style={styles.infoValue}>{advisory.fertilizer}</Text>
            </Surface>

            <Surface style={styles.infoCard} elevation={2}>
              <View style={styles.infoHeader}>
                <Ionicons name="trending-up" size={20} color="#4CAF50" />
                <Text style={styles.infoTitle}>Market Price</Text>
              </View>
              <Text style={styles.infoValue}>{advisory.market_price}</Text>
            </Surface>

            <Surface style={styles.infoCard} elevation={2}>
              <View style={styles.infoHeader}>
                <Ionicons name="cloud" size={20} color="#2196F3" />
                <Text style={styles.infoTitle}>Weather</Text>
              </View>
              <Text style={styles.infoValue}>{advisory.weather}</Text>
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
          <Ionicons name="leaf" size={40} color="#4CAF50" />
          <View style={styles.headerText}>
            <Title style={styles.headerTitle}>Crop Advisory</Title>
            <Title style={styles.headerTitleHindi}>फसल सलाह</Title>
            <Paragraph style={styles.headerSubtitle}>
              Get personalized crop recommendations based on your soil and previous crops
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Input Form */}
      <Card style={styles.formCard} elevation={2}>
        <Card.Content>
          <Title style={styles.formTitle}>Enter Your Details / अपना विवरण दर्ज करें</Title>
          
          {/* Soil Type Selection */}
          <Text style={styles.inputLabel}>Soil Type / मिट्टी का प्रकार *</Text>
          <View style={styles.chipContainer}>
            {soilTypes.map((type) => (
              <Chip
                key={type}
                selected={soilType === type}
                onPress={() => setSoilType(type)}
                style={[
                  styles.chip,
                  soilType === type && styles.selectedChip
                ]}
                textStyle={soilType === type && styles.selectedChipText}
              >
                {type}
              </Chip>
            ))}
          </View>

          {/* Last Crop Selection */}
          <Text style={styles.inputLabel}>Last Crop / पिछली फसल *</Text>
          <View style={styles.chipContainer}>
            {commonCrops.map((crop) => (
              <Chip
                key={crop}
                selected={lastCrop === crop}
                onPress={() => setLastCrop(crop)}
                style={[
                  styles.chip,
                  lastCrop === crop && styles.selectedChip
                ]}
                textStyle={lastCrop === crop && styles.selectedChipText}
              >
                {crop}
              </Chip>
            ))}
          </View>

          {/* Recommendation Inputs */}
          <Text style={styles.inputLabel}>Season / मौसम</Text>
          <View style={styles.chipContainer}>
            {seasons.map((s) => (
              <Chip
                key={s}
                selected={selectedSeason === s}
                onPress={() => setSelectedSeason(s)}
                style={[styles.chip, selectedSeason === s && styles.selectedChip]}
                textStyle={selectedSeason === s && styles.selectedChipText}
              >
                {s}
              </Chip>
            ))}
          </View>
          <TextInput
            label="pH Value (e.g., 6.8)"
            value={inputPH}
            onChangeText={setInputPH}
            mode="outlined"
            keyboardType="decimal-pad"
            style={{ marginBottom: 12 }}
            placeholder="Enter soil pH"
            left={<TextInput.Icon icon="flask" />}
          />
          <TextInput
            label="Region / क्षेत्र"
            value={region}
            onChangeText={setRegion}
            mode="outlined"
            style={{ marginBottom: 12 }}
            placeholder="e.g., Solapur, Maharashtra"
            left={<TextInput.Icon icon="map-marker" />}
          />

          <Button
            mode="contained"
            onPress={handleGetAdvisory}
            style={styles.getAdvisoryButton}
            disabled={loading}
            contentStyle={styles.buttonContent}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              'Get Advisory / सलाह प्राप्त करें'
            )}
          </Button>

          <Button
            mode="outlined"
            onPress={handleRecommend}
            style={{ marginTop: 10 }}
          >
            Get Crop Recommendations
          </Button>
        </Card.Content>
      </Card>

      {/* Results */}
      {renderAdvisoryCard()}

      {/* Recommendation Results */}
      {recommendations.length > 0 && (
        <Card style={styles.advisoryCard} elevation={2}>
          <Card.Content>
            <Title style={{ marginBottom: 10 }}>Top 5 Crop Recommendations</Title>
            {recommendations.map((rec, idx) => (
              <Surface key={idx} style={styles.recoItem} elevation={1}>
                <View style={styles.recoRow}>
                  <Text style={styles.recoName}>{rec.name}</Text>
                  <Text style={styles.recoRating}>Rating: {rec.rating}</Text>
                </View>
                <Text style={styles.recoDetail}>Fertilizer: {rec.fertilizer}</Text>
                <Text style={styles.recoDetail}>Water: {rec.water}</Text>
                <Text style={styles.recoDetail}>Sowing: {rec.sow}</Text>
                <Text style={styles.recoDetail}>Harvesting: {rec.harvest}</Text>
              </Surface>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Tips */}
      <Card style={styles.tipsCard} elevation={2}>
        <Card.Content>
          <Title style={styles.tipsTitle}>💡 Advisory Tips / सलाह सुझाव</Title>
          <Paragraph style={styles.tipText}>
            • Consider local weather conditions before planting
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Test soil pH and nutrient levels regularly
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Follow recommended fertilizer application rates
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Monitor market prices for better timing
          </Paragraph>
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
    backgroundColor: '#E8F5E8',
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
    color: '#4CAF50',
    marginBottom: 2,
  },
  headerTitleHindi: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  formCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#E0E0E0',
  },
  selectedChip: {
    backgroundColor: '#4CAF50',
  },
  selectedChipText: {
    color: '#fff',
  },
  getAdvisoryButton: {
    marginTop: 20,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  advisoryCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  advisoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  advisoryTitleHindi: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 20,
  },
  recommendationContainer: {
    marginBottom: 20,
  },
  recommendationCard: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#E8F5E8',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 8,
  },
  recommendationValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoCard: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 5,
  },
  infoValue: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  tipsCard: {
    margin: 15,
    marginBottom: 30,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    lineHeight: 16,
  },
});
