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

export default function SoilHealthScreen({ user }) {
  const [soilHealth, setSoilHealth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSoilType, setSelectedSoilType] = useState(user?.soil_type || '');

  const soilTypes = ['black', 'sandy', 'clay', 'loamy', 'red'];

  useEffect(() => {
    loadSoilHealth();
  }, []);

  const loadSoilHealth = async (soilType = null) => {
    setLoading(true);
    try {
      const response = await ApiService.getSoilHealth(soilType);
      setSoilHealth(response);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSoilTypeSelect = (soilType) => {
    setSelectedSoilType(soilType);
    loadSoilHealth(soilType);
  };

  const getPHColor = (ph) => {
    if (ph < 6.0) return '#F44336'; // Acidic - Red
    if (ph < 6.5) return '#FF9800'; // Slightly Acidic - Orange
    if (ph <= 7.5) return '#4CAF50'; // Neutral - Green
    if (ph <= 8.0) return '#FF9800'; // Slightly Alkaline - Orange
    return '#F44336'; // Alkaline - Red
  };

  const getPHStatus = (ph) => {
    if (ph < 6.0) return 'Acidic';
    if (ph < 6.5) return 'Slightly Acidic';
    if (ph <= 7.5) return 'Optimal';
    if (ph <= 8.0) return 'Slightly Alkaline';
    return 'Alkaline';
  };

  const getOrganicContentColor = (content) => {
    switch (content.toLowerCase()) {
      case 'high': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'low': return '#F44336';
      default: return '#666';
    }
  };

  const renderSoilHealthCard = (soil) => (
    <Card key={soil.id} style={styles.soilCard} elevation={3}>
      <Card.Content>
        <View style={styles.soilHeader}>
          <Surface style={[styles.soilTypeBadge, { backgroundColor: '#4CAF50' + '20' }]} elevation={1}>
            <Text style={styles.soilTypeText}>{soil.soil_type.toUpperCase()}</Text>
          </Surface>
        </View>

        <View style={styles.metricsContainer}>
          {/* pH Level */}
          <Surface style={styles.metricCard} elevation={2}>
            <View style={styles.metricHeader}>
              <Ionicons name="flask" size={20} color={getPHColor(soil.ph)} />
              <Text style={styles.metricTitle}>pH Level</Text>
            </View>
            <Text style={[styles.metricValue, { color: getPHColor(soil.ph) }]}>
              {soil.ph}
            </Text>
            <Text style={[styles.metricStatus, { color: getPHColor(soil.ph) }]}>
              {getPHStatus(soil.ph)}
            </Text>
          </Surface>

          {/* Organic Content */}
          <Surface style={styles.metricCard} elevation={2}>
            <View style={styles.metricHeader}>
              <Ionicons name="leaf" size={20} color={getOrganicContentColor(soil.organic_content)} />
              <Text style={styles.metricTitle}>Organic Content</Text>
            </View>
            <Text style={[styles.metricValue, { color: getOrganicContentColor(soil.organic_content) }]}>
              {soil.organic_content}
            </Text>
          </Surface>
        </View>

        {/* Suggestions */}
        <Surface style={styles.suggestionCard} elevation={1}>
          <View style={styles.suggestionHeader}>
            <Ionicons name="bulb" size={20} color="#FF9800" />
            <Text style={styles.suggestionTitle}>Recommendations</Text>
          </View>
          <Text style={styles.suggestionText}>{soil.suggestion}</Text>
        </Surface>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Surface style={styles.headerCard} elevation={2}>
        <View style={styles.headerContent}>
          <Ionicons name="earth" size={40} color="#8BC34A" />
          <View style={styles.headerText}>
            <Title style={styles.headerTitle}>Soil Health</Title>
            <Title style={styles.headerTitleHindi}>मिट्टी स्वास्थ्य</Title>
            <Paragraph style={styles.headerSubtitle}>
              Monitor soil health and get improvement suggestions
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Soil Type Filter */}
      <Card style={styles.filterCard} elevation={2}>
        <Card.Content>
          <Title style={styles.filterTitle}>Filter by Soil Type / मिट्टी के प्रकार से फ़िल्टर करें</Title>
          <View style={styles.chipContainer}>
            <Chip
              selected={selectedSoilType === ''}
              onPress={() => {
                setSelectedSoilType('');
                loadSoilHealth();
              }}
              style={[
                styles.chip,
                selectedSoilType === '' && styles.selectedChip
              ]}
              textStyle={selectedSoilType === '' && styles.selectedChipText}
            >
              All Types
            </Chip>
            {soilTypes.map((type) => (
              <Chip
                key={type}
                selected={selectedSoilType === type}
                onPress={() => handleSoilTypeSelect(type)}
                style={[
                  styles.chip,
                  selectedSoilType === type && styles.selectedChip
                ]}
                textStyle={selectedSoilType === type && styles.selectedChipText}
              >
                {type}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Loading State */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading soil health data...</Text>
        </View>
      )}

      {/* Soil Health Cards */}
      {!loading && soilHealth.map(renderSoilHealthCard)}

      {/* General Tips */}
      <Card style={styles.tipsCard} elevation={2}>
        <Card.Content>
          <Title style={styles.tipsTitle}>🌱 Soil Health Tips / मिट्टी स्वास्थ्य सुझाव</Title>
          <Paragraph style={styles.tipText}>
            • Test soil pH every 2-3 years
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Add organic matter to improve soil structure
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Use crop rotation to maintain soil fertility
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Avoid over-tilling to preserve soil microorganisms
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Apply lime to acidic soils, sulfur to alkaline soils
          </Paragraph>
        </Card.Content>
      </Card>

      {/* pH Scale Reference */}
      <Card style={styles.phScaleCard} elevation={2}>
        <Card.Content>
          <Title style={styles.phScaleTitle}>pH Scale Reference / pH स्केल संदर्भ</Title>
          <View style={styles.phScaleContainer}>
            <View style={styles.phScaleBar}>
              <View style={[styles.phRange, { backgroundColor: '#F44336', left: '0%', width: '20%' }]}>
                <Text style={styles.phRangeText}>4-6</Text>
              </View>
              <View style={[styles.phRange, { backgroundColor: '#FF9800', left: '20%', width: '15%' }]}>
                <Text style={styles.phRangeText}>6-6.5</Text>
              </View>
              <View style={[styles.phRange, { backgroundColor: '#4CAF50', left: '35%', width: '30%' }]}>
                <Text style={styles.phRangeText}>6.5-7.5</Text>
              </View>
              <View style={[styles.phRange, { backgroundColor: '#FF9800', left: '65%', width: '15%' }]}>
                <Text style={styles.phRangeText}>7.5-8</Text>
              </View>
              <View style={[styles.phRange, { backgroundColor: '#F44336', left: '80%', width: '20%' }]}>
                <Text style={styles.phRangeText}>8-9</Text>
              </View>
            </View>
            <Text style={styles.phScaleNote}>Optimal range for most crops: 6.5-7.5</Text>
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
    color: '#8BC34A',
    marginBottom: 2,
  },
  headerTitleHindi: {
    fontSize: 16,
    color: '#8BC34A',
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
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#E0E0E0',
  },
  selectedChip: {
    backgroundColor: '#8BC34A',
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
  soilCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  soilHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  soilTypeBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  soilTypeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8BC34A',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  metricCard: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 5,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  metricStatus: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  suggestionCard: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF3E0',
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
    marginLeft: 5,
  },
  suggestionText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  tipsCard: {
    margin: 15,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    lineHeight: 16,
  },
  phScaleCard: {
    margin: 15,
    marginBottom: 30,
    borderRadius: 12,
  },
  phScaleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  phScaleContainer: {
    alignItems: 'center',
  },
  phScaleBar: {
    height: 30,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
  },
  phRange: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phRangeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  phScaleNote: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});
