import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Surface,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

export default function SoilKitPurchaseScreen({ navigation, user, language = 'en' }) {
  const amazonUrl = 'https://www.amazon.in/HASTHIP%C2%AE-Fertility-Moisture-Precison-Agriculture/dp/B0F66WZY3V/ref=pd_sbs_d_sccl_1_4/262-6989169-6832119';

  const openAmazonLink = () => {
    Linking.openURL(amazonUrl);
  };

  const proceedToSoilHealth = () => {
    navigation.navigate('Soil');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Surface style={styles.headerCard} elevation={2}>
        <View style={styles.headerContent}>
          <Ionicons name="hardware-chip" size={40} color="#4CAF50" />
          <View style={styles.headerText}>
            <Title style={styles.headerTitle}>Soil Testing Kit</Title>
            <Title style={styles.headerTitleHindi}>मिट्टी परीक्षण किट</Title>
            <Paragraph style={styles.headerSubtitle}>
              Purchase professional soil testing kit
            </Paragraph>
          </View>
        </View>
      </Surface>

      {/* Kit Information */}
      <Card style={styles.kitCard}>
        <Card.Content>
          <Title style={styles.kitTitle}>🧪 HASTHIP® Soil Testing Kit</Title>
          <Paragraph style={styles.kitDescription}>
            Professional 4-in-1 soil fertility testing kit for pH, Nitrogen, Phosphorus, and Potassium measurement with precision agriculture tools.
          </Paragraph>
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Paragraph style={styles.featureText}>pH Level Testing</Paragraph>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Paragraph style={styles.featureText}>Nitrogen (N) Analysis</Paragraph>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Paragraph style={styles.featureText}>Phosphorus (P) Testing</Paragraph>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Paragraph style={styles.featureText}>Potassium (K) Measurement</Paragraph>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Paragraph style={styles.featureText}>Moisture Content Analysis</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Sampling Instructions */}
      <Card style={styles.instructionsCard}>
        <Card.Content>
          <Title style={styles.instructionsTitle}>📋 How to Take Soil Sample</Title>
          <Title style={styles.instructionsTitleHindi}>मिट्टी का नमूना कैसे लें</Title>
          
          <View style={styles.stepContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Paragraph style={styles.stepNumberText}>1</Paragraph>
              </View>
              <View style={styles.stepContent}>
                <Paragraph style={styles.stepText}>
                  Select 5-6 different spots in your field randomly
                </Paragraph>
                <Paragraph style={styles.stepTextHindi}>
                  अपने खेत में यादृच्छिक रूप से 5-6 अलग स्थान चुनें
                </Paragraph>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Paragraph style={styles.stepNumberText}>2</Paragraph>
              </View>
              <View style={styles.stepContent}>
                <Paragraph style={styles.stepText}>
                  Dig 6-8 inches deep and collect soil from each spot
                </Paragraph>
                <Paragraph style={styles.stepTextHindi}>
                  6-8 इंच गहरी खुदाई करें और प्रत्येक स्थान से मिट्टी एकत्र करें
                </Paragraph>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Paragraph style={styles.stepNumberText}>3</Paragraph>
              </View>
              <View style={styles.stepContent}>
                <Paragraph style={styles.stepText}>
                  Mix all soil samples thoroughly in a clean container
                </Paragraph>
                <Paragraph style={styles.stepTextHindi}>
                  सभी मिट्टी के नमूनों को एक साफ कंटेनर में अच्छी तरह मिलाएं
                </Paragraph>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Paragraph style={styles.stepNumberText}>4</Paragraph>
              </View>
              <View style={styles.stepContent}>
                <Paragraph style={styles.stepText}>
                  Remove stones, roots, and debris from the sample
                </Paragraph>
                <Paragraph style={styles.stepTextHindi}>
                  नमूने से पत्थर, जड़ें और मलबा हटा दें
                </Paragraph>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Paragraph style={styles.stepNumberText}>5</Paragraph>
              </View>
              <View style={styles.stepContent}>
                <Paragraph style={styles.stepText}>
                  Use the testing kit as per instructions to analyze
                </Paragraph>
                <Paragraph style={styles.stepTextHindi}>
                  विश्लेषण के लिए निर्देशों के अनुसार परीक्षण किट का उपयोग करें
                </Paragraph>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={openAmazonLink}
          style={styles.amazonButton}
          contentStyle={styles.buttonContent}
          icon="cart"
        >
          Buy on Amazon
        </Button>
        
        <Button
          mode="outlined"
          onPress={proceedToSoilHealth}
          style={styles.nextButton}
          contentStyle={styles.buttonContent}
          icon="arrow-right"
        >
          Next - Enter Soil Data
        </Button>
      </View>

      {/* Tips */}
      <Card style={styles.tipsCard}>
        <Card.Content>
          <Title style={styles.tipsTitle}>💡 Tips</Title>
          <Paragraph style={styles.tipText}>
            • Best time to collect soil: After harvest, before planting
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Avoid collecting soil immediately after rain or irrigation
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Store soil sample in clean, dry container
          </Paragraph>
          <Paragraph style={styles.tipText}>
            • Test soil every 2-3 years for optimal crop management
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
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  kitCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
  },
  kitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  kitDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 15,
  },
  featuresContainer: {
    marginTop: 10,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 8,
  },
  instructionsCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 5,
  },
  instructionsTitleHindi: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 15,
  },
  stepContainer: {
    marginTop: 10,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepContent: {
    flex: 1,
  },
  stepText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 16,
    marginBottom: 2,
  },
  stepTextHindi: {
    fontSize: 11,
    color: '#666',
    lineHeight: 15,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  amazonButton: {
    backgroundColor: '#FF9800',
    marginBottom: 10,
  },
  nextButton: {
    borderColor: '#4CAF50',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  tipsCard: {
    margin: 15,
    marginBottom: 30,
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
});