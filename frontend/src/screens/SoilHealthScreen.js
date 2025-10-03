import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Dimensions,
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
import { WebView } from 'react-native-webview';
import { getTranslation } from '../utils/translations';

const { width } = Dimensions.get('window');

export default function SoilHealthScreen({ user, language = 'en' }) {
  const t = (key) => getTranslation(language, key);
  const [ph, setPh] = useState('');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [organicMatter, setOrganicMatter] = useState('');
  const [moisture, setMoisture] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [showReferences, setShowReferences] = useState({
    ph: false,
    nitrogen: false,
    phosphorus: false,
    potassium: false,
    organicMatter: false,
    moisture: false
  });

  const toggleReference = (param) => {
    setShowReferences(prev => ({
      ...prev,
      [param]: !prev[param]
    }));
  };

  const referenceData = {
    ph: [
      { range: '< 4.5', level: t('extremelyAcidic'), color: '#B71C1C', crops: 'Blueberries, Cranberries' },
      { range: '4.5-5.5', level: t('veryAcidic'), color: '#F44336', crops: 'Potatoes, Sweet Potatoes' },
      { range: '5.5-6.0', level: t('acidic'), color: '#FF5722', crops: 'Carrots, Radishes' },
      { range: '6.0-6.5', level: t('slightlyAcidic'), color: '#FF9800', crops: 'Corn, Soybeans' },
      { range: '6.5-7.5', level: t('optimal'), color: '#4CAF50', crops: 'Most vegetables, Wheat' },
      { range: '7.5-8.0', level: t('slightlyAlkaline'), color: '#FF9800', crops: 'Asparagus, Spinach' },
      { range: '8.0-8.5', level: t('alkaline'), color: '#FF5722', crops: 'Limited crops' },
      { range: '> 8.5', level: t('veryAlkaline'), color: '#F44336', crops: 'Very few crops' }
    ],
    nitrogen: [
      { range: '< 10', level: t('veryLow'), color: '#F44336', status: 'Critical deficiency' },
      { range: '10-20', level: t('low'), color: '#FF9800', status: 'Needs fertilizer' },
      { range: '20-40', level: t('moderate'), color: '#4CAF50', status: 'Good for most crops' },
      { range: '40-60', level: t('high'), color: '#4CAF50', status: 'Excellent' },
      { range: '> 60', level: t('veryHigh'), color: '#FF9800', status: 'May cause burning' }
    ],
    phosphorus: [
      { range: '< 8', level: t('veryLow'), color: '#F44336', status: 'Critical deficiency' },
      { range: '8-15', level: t('low'), color: '#FF9800', status: 'Needs fertilizer' },
      { range: '15-30', level: t('moderate'), color: '#4CAF50', status: 'Good for most crops' },
      { range: '30-50', level: t('high'), color: '#4CAF50', status: 'Excellent' },
      { range: '> 50', level: t('veryHigh'), color: '#FF9800', status: 'Excess levels' }
    ],
    potassium: [
      { range: '< 50', level: t('veryLow'), color: '#F44336', status: 'Critical deficiency' },
      { range: '50-100', level: t('low'), color: '#FF9800', status: 'Needs fertilizer' },
      { range: '100-200', level: t('moderate'), color: '#4CAF50', status: 'Good for most crops' },
      { range: '200-300', level: t('high'), color: '#4CAF50', status: 'Excellent' },
      { range: '> 300', level: t('veryHigh'), color: '#FF9800', status: 'Excess levels' }
    ],
    organicMatter: [
      { range: '< 1%', level: t('veryLow'), color: '#F44336', status: 'Poor soil structure' },
      { range: '1-2%', level: t('low'), color: '#FF9800', status: 'Needs organic matter' },
      { range: '2-4%', level: t('moderate'), color: '#4CAF50', status: 'Good soil health' },
      { range: '4-6%', level: t('high'), color: '#4CAF50', status: 'Excellent fertility' },
      { range: '> 6%', level: t('veryHigh'), color: '#4CAF50', status: 'Very rich soil' }
    ],
    moisture: [
      { range: '< 10%', level: t('veryDry'), color: '#F44336', status: 'Drought stress' },
      { range: '10-20%', level: t('dry'), color: '#FF9800', status: 'Needs irrigation' },
      { range: '20-40%', level: t('optimal'), color: '#4CAF50', status: 'Perfect for crops' },
      { range: '40-60%', level: t('moist'), color: '#4CAF50', status: 'Good moisture' },
      { range: '> 60%', level: t('waterlogged'), color: '#FF5722', status: 'Poor drainage' }
    ]
  };

  const analyzeSoil = () => {
    const phVal = parseFloat(ph);
    const nVal = parseFloat(nitrogen);
    const pVal = parseFloat(phosphorus);
    const kVal = parseFloat(potassium);
    const omVal = parseFloat(organicMatter);
    const moistVal = parseFloat(moisture);

    if (!phVal || !nVal || !pVal || !kVal || !omVal || !moistVal) {
      Alert.alert(t('errorTitle'), t('enterAllValues'));
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
    
    Alert.alert(t('successTitle'), t('soilDataSaved'));
    
    setAnalysis(results);
  };

  const analyzePH = (value) => {
    if (value < 5.5) return { level: t('veryAcidic'), score: 30, color: '#F44336', percentage: 30 };
    if (value < 6.0) return { level: t('acidic'), score: 50, color: '#FF5722', percentage: 50 };
    if (value < 6.5) return { level: t('slightlyAcidic'), score: 75, color: '#FF9800', percentage: 75 };
    if (value <= 7.5) return { level: t('optimal'), score: 95, color: '#4CAF50', percentage: 95 };
    if (value <= 8.0) return { level: t('slightlyAlkaline'), score: 75, color: '#FF9800', percentage: 75 };
    if (value <= 8.5) return { level: t('alkaline'), score: 50, color: '#FF5722', percentage: 50 };
    return { level: t('veryAlkaline'), score: 30, color: '#F44336', percentage: 30 };
  };

  const analyzeNutrient = (value, type) => {
    const ranges = {
      nitrogen: { low: 20, optimal: 40, high: 60 },
      phosphorus: { low: 15, optimal: 30, high: 50 },
      potassium: { low: 100, optimal: 200, high: 300 }
    };
    
    const range = ranges[type];
    if (value < range.low * 0.5) return { level: t('veryLow'), score: 25, color: '#F44336', percentage: 25 };
    if (value < range.low) return { level: t('low'), score: 50, color: '#FF9800', percentage: 50 };
    if (value <= range.optimal) return { level: t('moderate'), score: 80, color: '#4CAF50', percentage: 80 };
    if (value <= range.high) return { level: t('high'), score: 90, color: '#4CAF50', percentage: 90 };
    return { level: t('veryHigh'), score: 70, color: '#FF9800', percentage: 70 };
  };

  const analyzeOrganicMatter = (value) => {
    if (value < 1) return { level: t('veryLow'), score: 30, color: '#F44336', percentage: 30 };
    if (value < 2) return { level: t('low'), score: 50, color: '#FF9800', percentage: 50 };
    if (value <= 4) return { level: t('moderate'), score: 80, color: '#4CAF50', percentage: 80 };
    if (value <= 6) return { level: t('high'), score: 95, color: '#4CAF50', percentage: 95 };
    return { level: t('veryHigh'), score: 85, color: '#4CAF50', percentage: 85 };
  };

  const analyzeMoisture = (value) => {
    if (value < 10) return { level: t('veryDry'), score: 25, color: '#F44336', percentage: 25 };
    if (value < 20) return { level: t('dry'), score: 50, color: '#FF9800', percentage: 50 };
    if (value <= 40) return { level: t('optimal'), score: 90, color: '#4CAF50', percentage: 90 };
    if (value <= 60) return { level: t('moist'), score: 80, color: '#4CAF50', percentage: 80 };
    return { level: t('waterlogged'), score: 40, color: '#FF5722', percentage: 40 };
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
              {t('soilParametersSubtitle')}
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Input Form */}
      <Card style={styles.formCard} elevation={2}>
        <Card.Content>
          <Title style={styles.formTitle}>{t('soilParameters')}</Title>
          
          <View>
            <TextInput
              label={t('phLabel')}
              value={ph}
              onChangeText={setPh}
              mode="outlined"
              keyboardType="decimal-pad"
              style={styles.input}
              placeholder={t('phPlaceholder')}
              left={<TextInput.Icon icon="flask" />}
              right={<TextInput.Icon icon={showReferences.ph ? "chevron-up" : "chevron-down"} onPress={() => toggleReference('ph')} />}
            />
            {showReferences.ph && (
              <Surface style={styles.referenceCard} elevation={1}>
                <Text style={styles.referenceTitle}>pH Reference Scale</Text>
                {referenceData.ph.map((item, index) => (
                  <View key={index} style={styles.referenceRow}>
                    <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                    <View style={styles.referenceContent}>
                      <Text style={styles.referenceRange}>{item.range}</Text>
                      <Text style={styles.referenceLevel}>{item.level}</Text>
                      <Text style={styles.referenceCrops}>{item.crops}</Text>
                    </View>
                  </View>
                ))}
              </Surface>
            )}
          </View>
          
          <View>
            <TextInput
              label={t('nitrogenLabel')}
              value={nitrogen}
              onChangeText={setNitrogen}
              mode="outlined"
              keyboardType="decimal-pad"
              style={styles.input}
              placeholder={t('nitrogenPlaceholder')}
              left={<TextInput.Icon icon="leaf" />}
              right={<TextInput.Icon icon={showReferences.nitrogen ? "chevron-up" : "chevron-down"} onPress={() => toggleReference('nitrogen')} />}
            />
            {showReferences.nitrogen && (
              <Surface style={styles.referenceCard} elevation={1}>
                <Text style={styles.referenceTitle}>Nitrogen Reference (mg/kg)</Text>
                {referenceData.nitrogen.map((item, index) => (
                  <View key={index} style={styles.referenceRow}>
                    <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                    <View style={styles.referenceContent}>
                      <Text style={styles.referenceRange}>{item.range}</Text>
                      <Text style={styles.referenceLevel}>{item.level}</Text>
                      <Text style={styles.referenceCrops}>{item.status}</Text>
                    </View>
                  </View>
                ))}
              </Surface>
            )}
          </View>
          
          <View>
            <TextInput
              label={t('phosphorusLabel')}
              value={phosphorus}
              onChangeText={setPhosphorus}
              mode="outlined"
              keyboardType="decimal-pad"
              style={styles.input}
              placeholder={t('phosphorusPlaceholder')}
              left={<TextInput.Icon icon="leaf" />}
              right={<TextInput.Icon icon={showReferences.phosphorus ? "chevron-up" : "chevron-down"} onPress={() => toggleReference('phosphorus')} />}
            />
            {showReferences.phosphorus && (
              <Surface style={styles.referenceCard} elevation={1}>
                <Text style={styles.referenceTitle}>Phosphorus Reference (mg/kg)</Text>
                {referenceData.phosphorus.map((item, index) => (
                  <View key={index} style={styles.referenceRow}>
                    <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                    <View style={styles.referenceContent}>
                      <Text style={styles.referenceRange}>{item.range}</Text>
                      <Text style={styles.referenceLevel}>{item.level}</Text>
                      <Text style={styles.referenceCrops}>{item.status}</Text>
                    </View>
                  </View>
                ))}
              </Surface>
            )}
          </View>
          
          <View>
            <TextInput
              label={t('potassiumLabel')}
              value={potassium}
              onChangeText={setPotassium}
              mode="outlined"
              keyboardType="decimal-pad"
              style={styles.input}
              placeholder={t('potassiumPlaceholder')}
              left={<TextInput.Icon icon="leaf" />}
              right={<TextInput.Icon icon={showReferences.potassium ? "chevron-up" : "chevron-down"} onPress={() => toggleReference('potassium')} />}
            />
            {showReferences.potassium && (
              <Surface style={styles.referenceCard} elevation={1}>
                <Text style={styles.referenceTitle}>Potassium Reference (mg/kg)</Text>
                {referenceData.potassium.map((item, index) => (
                  <View key={index} style={styles.referenceRow}>
                    <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                    <View style={styles.referenceContent}>
                      <Text style={styles.referenceRange}>{item.range}</Text>
                      <Text style={styles.referenceLevel}>{item.level}</Text>
                      <Text style={styles.referenceCrops}>{item.status}</Text>
                    </View>
                  </View>
                ))}
              </Surface>
            )}
          </View>
          
          <View>
            <TextInput
              label={t('organicMatterLabel')}
              value={organicMatter}
              onChangeText={setOrganicMatter}
              mode="outlined"
              keyboardType="decimal-pad"
              style={styles.input}
              placeholder={t('organicMatterPlaceholder')}
              left={<TextInput.Icon icon="compost" />}
              right={<TextInput.Icon icon={showReferences.organicMatter ? "chevron-up" : "chevron-down"} onPress={() => toggleReference('organicMatter')} />}
            />
            {showReferences.organicMatter && (
              <Surface style={styles.referenceCard} elevation={1}>
                <Text style={styles.referenceTitle}>Organic Matter Reference (%)</Text>
                {referenceData.organicMatter.map((item, index) => (
                  <View key={index} style={styles.referenceRow}>
                    <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                    <View style={styles.referenceContent}>
                      <Text style={styles.referenceRange}>{item.range}</Text>
                      <Text style={styles.referenceLevel}>{item.level}</Text>
                      <Text style={styles.referenceCrops}>{item.status}</Text>
                    </View>
                  </View>
                ))}
              </Surface>
            )}
          </View>
          
          <View>
            <TextInput
              label={t('moistureLabel')}
              value={moisture}
              onChangeText={setMoisture}
              mode="outlined"
              keyboardType="decimal-pad"
              style={styles.input}
              placeholder={t('moisturePlaceholder')}
              left={<TextInput.Icon icon="water" />}
              right={<TextInput.Icon icon={showReferences.moisture ? "chevron-up" : "chevron-down"} onPress={() => toggleReference('moisture')} />}
            />
            {showReferences.moisture && (
              <Surface style={styles.referenceCard} elevation={1}>
                <Text style={styles.referenceTitle}>Moisture Reference (%)</Text>
                {referenceData.moisture.map((item, index) => (
                  <View key={index} style={styles.referenceRow}>
                    <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                    <View style={styles.referenceContent}>
                      <Text style={styles.referenceRange}>{item.range}</Text>
                      <Text style={styles.referenceLevel}>{item.level}</Text>
                      <Text style={styles.referenceCrops}>{item.status}</Text>
                    </View>
                  </View>
                ))}
              </Surface>
            )}
          </View>
          
          <Button
            mode="contained"
            onPress={analyzeSoil}
            style={styles.analyzeButton}
            contentStyle={styles.buttonContent}
          >
            {t('analyzeSoilButton')}
          </Button>
        </Card.Content>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <Card style={styles.resultsCard} elevation={3}>
          <Card.Content>
            <View style={styles.overallHealth}>
              <Title style={styles.overallTitle}>{t('overallSoilHealth')}</Title>
              <Text style={[styles.overallScore, { color: analysis.overallHealth > 70 ? '#4CAF50' : analysis.overallHealth > 50 ? '#FF9800' : '#F44336' }]}>
                {analysis.overallHealth}%
              </Text>
            </View>
            
            {renderAnalysisCard(t('phLevel'), analysis.ph)}
            {renderAnalysisCard(t('nitrogenLabel'), analysis.nitrogen, 'mg/kg')}
            {renderAnalysisCard(t('phosphorusLabel'), analysis.phosphorus, 'mg/kg')}
            {renderAnalysisCard(t('potassiumLabel'), analysis.potassium, 'mg/kg')}
            {renderAnalysisCard(t('organicMatterLabel'), analysis.organicMatter, '%')}
            {renderAnalysisCard(t('moistureLabel'), analysis.moisture, '%')}
          </Card.Content>
        </Card>
      )}


      {/* General Tips */}
      <Card style={styles.tipsCard} elevation={2}>
        <Card.Content>
          <Title style={styles.tipsTitle}>🌱 {t('soilHealthTips')}</Title>
          <Paragraph style={styles.tipText}>
            {t('tip1')}
          </Paragraph>
          <Paragraph style={styles.tipText}>
            {t('tip2')}
          </Paragraph>
          <Paragraph style={styles.tipText}>
            {t('tip3')}
          </Paragraph>
          <Paragraph style={styles.tipText}>
            {t('tip4')}
          </Paragraph>
          <Paragraph style={styles.tipText}>
            {t('tip5')}
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Video Tutorial */}
      <Card style={styles.videoCard} elevation={2}>
        <Card.Content>
          <Title style={styles.videoTitle}>📹 Soil Testing Tutorial</Title>
          <Title style={styles.videoTitleHindi}>मिट्टी परीक्षण ट्यूटोरियल</Title>
          <Paragraph style={styles.videoDescription}>
            Learn how to properly test your soil using testing kits
          </Paragraph>
          <View style={styles.videoContainer}>
            <WebView
              style={styles.webView}
              source={{
                uri: 'https://www.youtube.com/embed/X-k4LALwCPA?rel=0&showinfo=0&controls=1'
              }}
              allowsFullscreenVideo={true}
              mediaPlaybackRequiresUserAction={true}
            />
          </View>
        </Card.Content>
      </Card>

      {/* pH Scale Reference */}
      <Card style={styles.phScaleCard} elevation={2}>
        <Card.Content>
          <Title style={styles.phScaleTitle}>{t('phScaleReference')}</Title>
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
            <Text style={styles.phScaleNote}>{t('phOptimalRange')}</Text>
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
  videoCard: {
    margin: 15,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 2,
  },
  videoTitleHindi: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 8,
  },
  videoDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  videoContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
    borderRadius: 8,
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
  referenceCard: {
    marginTop: 5,
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  referenceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  referenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  referenceContent: {
    flex: 1,
  },
  referenceRange: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  referenceLevel: {
    fontSize: 11,
    color: '#666',
    marginTop: 1,
  },
  referenceCrops: {
    fontSize: 10,
    color: '#888',
    marginTop: 1,
    fontStyle: 'italic',
  },
});
