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
  TextInput,
  Button,
  Text,
  Surface,
  ActivityIndicator,
  Chip,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../services/api';
import { getTranslation } from '../utils/translations';

export default function AdvisoryScreen({ user, language = 'en' }) {
  const t = (key) => getTranslation(language, key);
  const [region, setRegion] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [soilHealthData, setSoilHealthData] = useState(null);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    loadSoilHealthData();
  }, []);

  const loadSoilHealthData = () => {
    if (global.soilHealthData) {
      setSoilHealthData(global.soilHealthData);
    }
  };

  // Local recommendation generator based on soil health data and region
  const generateRecommendations = () => {
    if (!soilHealthData) {
      Alert.alert('No Soil Data', 'Please check your soil health first to get crop recommendations.');
      return [];
    }
    
    const ph = soilHealthData.ph;

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
    if (!soilHealthData) {
      Alert.alert('No Soil Data', 'Please check your soil health first to get crop recommendations.');
      return;
    }
    setLoading(true);
    const result = generateRecommendations();
    setRecommendations(result);
    setLoading(false);
  };



  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Surface style={styles.headerCard} elevation={2}>
        <View style={styles.headerContent}>
          <Ionicons name="leaf" size={40} color="#4CAF50" />
          <View style={styles.headerText}>
            <Title style={styles.headerTitle}>{t('cropAdvisory')}</Title>
            <Paragraph style={styles.headerSubtitle}>
              {language === 'hi' ? 'अपनी मिट्टी और पिछली फसलों के आधार पर व्यक्तिगत फसल सिफारिशें प्राप्त करें' : 'Get personalized crop recommendations based on your soil and previous crops'}
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Soil Health Status */}
      <Card style={styles.statusCard} elevation={2}>
        <Card.Content>
          <Title style={styles.statusTitle}>{language === 'hi' ? 'मिट्टी स्वास्थ्य स्थिति' : 'Soil Health Status'}</Title>
          {soilHealthData ? (
            <View style={styles.statusContent}>
              <Text style={styles.statusText}>{language === 'hi' ? '✅ मिट्टी स्वास्थ्य डेटा उपलब्ध' : '✅ Soil health data available'}</Text>
              <Text style={styles.statusDetail}>pH: {soilHealthData.ph}</Text>
              <Text style={styles.statusDetail}>Overall Health: {soilHealthData.analysis.overallHealth}%</Text>
              <Text style={styles.statusDetail}>Last checked: {new Date(soilHealthData.timestamp).toLocaleDateString()}</Text>
            </View>
          ) : (
            <View style={styles.statusContent}>
              <Text style={styles.noDataText}>{language === 'hi' ? '❌ मिट्टी स्वास्थ्य डेटा नहीं मिला' : '❌ No soil health data found'}</Text>
              <Text style={styles.noDataDetail}>{language === 'hi' ? 'सिफारिशें प्राप्त करने के लिए पहले अपनी मिट्टी का स्वास्थ्य जांचें' : 'Please check your soil health first to get recommendations'}</Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Input Form */}
      <Card style={styles.formCard} elevation={2}>
        <Card.Content>
          <Title style={styles.formTitle}>{language === 'hi' ? 'अपना क्षेत्र दर्ज करें' : 'Enter Your Region'}</Title>
          
          <TextInput
            label={t('region')}
            value={region}
            onChangeText={setRegion}
            mode="outlined"
            style={{ marginBottom: 12 }}
            placeholder={t('enterRegion')}
            left={<TextInput.Icon icon="map-marker" />}
          />

          <Button
            mode="contained"
            onPress={handleRecommend}
            style={styles.recommendButton}
            contentStyle={styles.buttonContent}
            disabled={!soilHealthData || loading}
          >
            {loading ? (language === 'hi' ? 'सिफारिशें प्राप्त कर रहे हैं...' : 'Getting Recommendations...') : t('getCropRecommendations')}
          </Button>
        </Card.Content>
      </Card>

      {/* Recommendation Results */}
      {recommendations.length > 0 && (
        <Card style={styles.advisoryCard} elevation={2}>
          <Card.Content>
            <Title style={styles.recommendationTitle}>🌾 {t('topCropRecommendations')}</Title>
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
          <Title style={styles.tipsTitle}>💡 Advisory Tips</Title>
          <Paragraph style={styles.tipText}>
            {language === 'hi' ? '• बुआई से पहले स्थानीय मौसम की स्थिति पर विचार करें' : '• Consider local weather conditions before planting'}
          </Paragraph>
          <Paragraph style={styles.tipText}>
            {language === 'hi' ? '• मिट्टी का pH और पोषक तत्वों का नियमित परीक्षण करें' : '• Test soil pH and nutrient levels regularly'}
          </Paragraph>
          <Paragraph style={styles.tipText}>
            {language === 'hi' ? '• सुझाई गई उर्वरक दरों का पालन करें' : '• Follow recommended fertilizer application rates'}
          </Paragraph>
          <Paragraph style={styles.tipText}>
            {language === 'hi' ? '• बेहतर समय के लिए बाजार मूल्यों की निगरानी करें' : '• Monitor market prices for better timing'}
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
  statusCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
    backgroundColor: '#F0F8FF',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statusContent: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  statusDetail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  noDataText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F44336',
    marginBottom: 8,
  },
  noDataDetail: {
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
