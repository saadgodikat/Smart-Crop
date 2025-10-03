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
  const [inputPH, setInputPH] = useState('');
  const [region, setRegion] = useState('');
  const [recommendations, setRecommendations] = useState([]);



  // Local recommendation generator based on pH and region
  const generateRecommendations = () => {
    const ph = parseFloat(inputPH);
    if (Number.isNaN(ph) || ph <= 0) {
      Alert.alert('Error', 'Please enter a valid pH value');
      return [];
    }

    const isAcidic = ph < 6.5;
    const isNeutral = ph >= 6.5 && ph <= 7.5;
    const isAlkaline = ph > 7.5;

    const cropPool = [
      { name: 'Wheat', ph: 'neutral', water: 'Moderate', fertilizer: 'NPK 120:60:40', sow: 'Nov-Dec', harvest: 'Mar-Apr' },
      { name: 'Rice', ph: 'acidic', water: 'High', fertilizer: 'NPK 100:50:50', sow: 'Jun-Jul', harvest: 'Oct-Nov' },
      { name: 'Maize', ph: 'neutral', water: 'Moderate', fertilizer: 'NPK 120:60:40', sow: 'Jun-Jul', harvest: 'Sep-Oct' },
      { name: 'Cotton', ph: 'alkaline', water: 'Low', fertilizer: 'NPK 90:45:45', sow: 'Apr-May', harvest: 'Oct-Dec' },
      { name: 'Sorghum', ph: 'alkaline', water: 'Low', fertilizer: 'NPK 80:40:40', sow: 'Jun-Jul', harvest: 'Sep-Oct' },
      { name: 'Chickpea', ph: 'neutral', water: 'Low', fertilizer: 'NPK 20:40:0', sow: 'Oct-Nov', harvest: 'Feb-Mar' },
      { name: 'Groundnut', ph: 'neutral', water: 'Moderate', fertilizer: 'NPK 20:40:40', sow: 'Jun-Jul', harvest: 'Oct-Nov' },
      { name: 'Sugarcane', ph: 'alkaline', water: 'High', fertilizer: 'NPK 250:115:115', sow: 'Feb-Mar', harvest: 'Jan-Feb' },
      { name: 'Soybean', ph: 'neutral', water: 'Moderate', fertilizer: 'NPK 30:60:40', sow: 'Jun-Jul', harvest: 'Oct-Nov' },
      { name: 'Barley', ph: 'alkaline', water: 'Low', fertilizer: 'NPK 80:40:20', sow: 'Nov-Dec', harvest: 'Mar-Apr' },
    ];

    const scored = cropPool.map(crop => {
      let score = 0;
      if (isNeutral && crop.ph === 'neutral') score += 3;
      if (isAcidic && crop.ph === 'acidic') score += 3;
      if (isAlkaline && crop.ph === 'alkaline') score += 3;
      if (region && crop.name.toLowerCase().includes('rice') && region.toLowerCase().includes('coastal')) score += 1;
      if (region && crop.name.toLowerCase().includes('cotton') && region.toLowerCase().includes('maharashtra')) score += 1;
      return { ...crop, score };
    });
    const sorted = scored.sort((a, b) => b.score - a.score).slice(0, 6);
    return sorted.map(c => ({ ...c, rating: c.score >= 3 ? 'Excellent' : c.score >= 2 ? 'Good' : c.score === 1 ? 'Fair' : 'Poor' }));
  };

  const handleRecommend = () => {
    const result = generateRecommendations();
    setRecommendations(result);
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
            onPress={handleRecommend}
            style={styles.recommendButton}
            contentStyle={styles.buttonContent}
            disabled={!inputPH.trim()}
          >
            Get Crop Recommendations / फसल सिफारिश प्राप्त करें
          </Button>
        </Card.Content>
      </Card>

      {/* Recommendation Results */}
      {recommendations.length > 0 && (
        <Card style={styles.advisoryCard} elevation={2}>
          <Card.Content>
            <Title style={styles.recommendationTitle}>🌾 Top Crop Recommendations / शीर्ष फसल सिफारिशें</Title>
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
  recommendButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
    textAlign: 'center',
  },
  recoItem: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  recoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recoRating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recoDetail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
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
