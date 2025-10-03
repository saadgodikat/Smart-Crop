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
  Text,
  Surface,
  TextInput,
  Button,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { getTranslation } from '../utils/translations';

export default function SoilHealthScreen({ user, language = 'en' }) {
  const t = (key) => getTranslation(language, key);
  const [ph, setPh] = useState('');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [organicMatter, setOrganicMatter] = useState('');
  const [moisture, setMoisture] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyzeSoil = () => {
    const phVal = parseFloat(ph);
    const nVal = parseFloat(nitrogen);
    const pVal = parseFloat(phosphorus);
    const kVal = parseFloat(potassium);
    const omVal = parseFloat(organicMatter);
    const moistVal = parseFloat(moisture);

    if (!phVal || !nVal || !pVal || !kVal || !omVal || !moistVal) {
      Alert.alert('Error', 'Please enter all values');
      return;
    }

    const results = {
      ph: analyzePH(phVal),
      nitrogen: analyzeNutrient(nVal, 'nitrogen'),
      phosphorus: analyzeNutrient(pVal, 'phosphorus'),
      potassium: analyzeNutrient(kVal, 'potassium'),
      organicMatter: analyzeOrganicMatter(omVal),
      moisture: analyzeMoisture(moistVal),
      overallHealth: 0
    };

    // Calculate overall health percentage
    const scores = [results.ph.score, results.nitrogen.score, results.phosphorus.score, 
                   results.potassium.score, results.organicMatter.score, results.moisture.score];
    results.overallHealth = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    
    // Save soil health data globally (clears on app refresh)
    global.soilHealthData = {
      ph: phVal,
      nitrogen: nVal,
      phosphorus: pVal,
      potassium: kVal,
      organicMatter: omVal,
      moisture: moistVal,
      analysis: results,
      timestamp: new Date().toISOString()
    };
    
    Alert.alert('Success', 'Soil health data saved! You can now get crop recommendations.');
    
    setAnalysis(results);
  };

  const analyzePH = (value) => {
    if (value < 5.5) return { level: 'Very Acidic', score: 30, color: '#F44336', percentage: 30 };
    if (value < 6.0) return { level: 'Acidic', score: 50, color: '#FF5722', percentage: 50 };
    if (value < 6.5) return { level: 'Slightly Acidic', score: 75, color: '#FF9800', percentage: 75 };
    if (value <= 7.5) return { level: 'Optimal', score: 95, color: '#4CAF50', percentage: 95 };
    if (value <= 8.0) return { level: 'Slightly Alkaline', score: 75, color: '#FF9800', percentage: 75 };
    if (value <= 8.5) return { level: 'Alkaline', score: 50, color: '#FF5722', percentage: 50 };
    return { level: 'Very Alkaline', score: 30, color: '#F44336', percentage: 30 };
  };

  const analyzeNutrient = (value, type) => {
    const ranges = {
      nitrogen: { low: 20, optimal: 40, high: 60 },
      phosphorus: { low: 15, optimal: 30, high: 50 },
      potassium: { low: 100, optimal: 200, high: 300 }
    };
    
    const range = ranges[type];
    if (value < range.low * 0.5) return { level: 'Very Low', score: 25, color: '#F44336', percentage: 25 };
    if (value < range.low) return { level: 'Low', score: 50, color: '#FF9800', percentage: 50 };
    if (value <= range.optimal) return { level: 'Moderate', score: 80, color: '#4CAF50', percentage: 80 };
    if (value <= range.high) return { level: 'High', score: 90, color: '#4CAF50', percentage: 90 };
    return { level: 'Very High', score: 70, color: '#FF9800', percentage: 70 };
  };

  const analyzeOrganicMatter = (value) => {
    if (value < 1) return { level: 'Very Low', score: 30, color: '#F44336', percentage: 30 };
    if (value < 2) return { level: 'Low', score: 50, color: '#FF9800', percentage: 50 };
    if (value <= 4) return { level: 'Moderate', score: 80, color: '#4CAF50', percentage: 80 };
    if (value <= 6) return { level: 'High', score: 95, color: '#4CAF50', percentage: 95 };
    return { level: 'Very High', score: 85, color: '#4CAF50', percentage: 85 };
  };

  const analyzeMoisture = (value) => {
    if (value < 10) return { level: 'Very Dry', score: 25, color: '#F44336', percentage: 25 };
    if (value < 20) return { level: 'Dry', score: 50, color: '#FF9800', percentage: 50 };
    if (value <= 40) return { level: 'Optimal', score: 90, color: '#4CAF50', percentage: 90 };
    if (value <= 60) return { level: 'Moist', score: 80, color: '#4CAF50', percentage: 80 };
    return { level: 'Waterlogged', score: 40, color: '#FF5722', percentage: 40 };
  };

  const renderAnalysisCard = (title, data, unit = '') => (
    <Surface style={styles.analysisCard} elevation={2}>
      <View style={styles.analysisHeader}>
        <Text style={styles.analysisTitle}>{title}</Text>
        <Text style={[styles.analysisPercentage, { color: data.color }]}>{data.percentage}%</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${data.percentage}%`, backgroundColor: data.color }]} />
      </View>
      <Text style={[styles.analysisLevel, { color: data.color }]}>{data.level}</Text>
    </Surface>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Surface style={styles.headerCard} elevation={2}>
        <View style={styles.headerContent}>
          <Ionicons name="earth" size={40} color="#8BC34A" />
          <View style={styles.headerText}>
            <Title style={styles.headerTitle}>{t('soilHealth')}</Title>
            <Paragraph style={styles.headerSubtitle}>
              Enter soil parameters for detailed analysis
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Input Form */}
      <Card style={styles.formCard} elevation={2}>
        <Card.Content>
          <Title style={styles.formTitle}>Soil Parameters</Title>
          
          <TextInput
            label="pH Value (4.0 - 9.0)"
            value={ph}
            onChangeText={setPh}
            mode="outlined"
            keyboardType="decimal-pad"
            style={styles.input}
            placeholder="e.g., 6.8"
            left={<TextInput.Icon icon="flask" />}
          />
          
          <TextInput
            label="Nitrogen (N) - mg/kg"
            value={nitrogen}
            onChangeText={setNitrogen}
            mode="outlined"
            keyboardType="decimal-pad"
            style={styles.input}
            placeholder="e.g., 25"
            left={<TextInput.Icon icon="leaf" />}
          />
          
          <TextInput
            label="Phosphorus (P) - mg/kg"
            value={phosphorus}
            onChangeText={setPhosphorus}
            mode="outlined"
            keyboardType="decimal-pad"
            style={styles.input}
            placeholder="e.g., 20"
            left={<TextInput.Icon icon="leaf" />}
          />
          
          <TextInput
            label="Potassium (K) - mg/kg"
            value={potassium}
            onChangeText={setPotassium}
            mode="outlined"
            keyboardType="decimal-pad"
            style={styles.input}
            placeholder="e.g., 150"
            left={<TextInput.Icon icon="leaf" />}
          />
          
          <TextInput
            label="Organic Matter - %"
            value={organicMatter}
            onChangeText={setOrganicMatter}
            mode="outlined"
            keyboardType="decimal-pad"
            style={styles.input}
            placeholder="e.g., 3.5"
            left={<TextInput.Icon icon="compost" />}
          />
          
          <TextInput
            label="Moisture Content - %"
            value={moisture}
            onChangeText={setMoisture}
            mode="outlined"
            keyboardType="decimal-pad"
            style={styles.input}
            placeholder="e.g., 25"
            left={<TextInput.Icon icon="water" />}
          />
          
          <Button
            mode="contained"
            onPress={analyzeSoil}
            style={styles.analyzeButton}
            contentStyle={styles.buttonContent}
          >
            Analyze Soil Health
          </Button>
        </Card.Content>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <Card style={styles.resultsCard} elevation={3}>
          <Card.Content>
            <View style={styles.overallHealth}>
              <Title style={styles.overallTitle}>Overall Soil Health</Title>
              <Text style={[styles.overallScore, { color: analysis.overallHealth > 70 ? '#4CAF50' : analysis.overallHealth > 50 ? '#FF9800' : '#F44336' }]}>
                {analysis.overallHealth}%
              </Text>
            </View>
            
            {renderAnalysisCard('pH Level', analysis.ph)}
            {renderAnalysisCard('Nitrogen (N)', analysis.nitrogen, 'mg/kg')}
            {renderAnalysisCard('Phosphorus (P)', analysis.phosphorus, 'mg/kg')}
            {renderAnalysisCard('Potassium (K)', analysis.potassium, 'mg/kg')}
            {renderAnalysisCard('Organic Matter', analysis.organicMatter, '%')}
            {renderAnalysisCard('Moisture Content', analysis.moisture, '%')}
          </Card.Content>
        </Card>
      )}


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
  input: {
    marginBottom: 12,
  },
  analyzeButton: {
    marginTop: 10,
    backgroundColor: '#8BC34A',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  resultsCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  overallHealth: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  overallTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  overallScore: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  analysisCard: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  analysisTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  analysisPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  analysisLevel: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
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
