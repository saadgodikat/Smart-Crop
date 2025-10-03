import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Card, Title, Button, Text, Paragraph } from 'react-native-paper';
import { testBackendConnection } from '../services/testConnection';

const DebugScreen = () => {
  const [connectionStatus, setConnectionStatus] = useState('Not tested');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setConnectionStatus('Testing...');
    
    const result = await testBackendConnection();
    
    if (result.success) {
      setConnectionStatus('✅ Connected successfully');
      Alert.alert('Success', 'Backend connection working!');
    } else {
      setConnectionStatus(`❌ Failed: ${result.error}`);
      Alert.alert('Connection Failed', result.error);
    }
    
    setLoading(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 16 }}>
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Title>Backend Connection Test</Title>
          <Paragraph style={{ marginVertical: 16 }}>
            Backend URL: http://10.152.249.233:3000/api
          </Paragraph>
          
          <Text style={{ marginBottom: 16 }}>
            Status: {connectionStatus}
          </Text>
          
          <Button 
            mode="contained" 
            onPress={testConnection}
            loading={loading}
            disabled={loading}
          >
            Test Connection
          </Button>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Title>Troubleshooting Steps</Title>
          <Text style={{ marginTop: 8 }}>
            1. Make sure backend server is running on port 3000
          </Text>
          <Text style={{ marginTop: 4 }}>
            2. Check if your phone and computer are on same WiFi
          </Text>
          <Text style={{ marginTop: 4 }}>
            3. Disable Windows Firewall temporarily
          </Text>
          <Text style={{ marginTop: 4 }}>
            4. Try opening http://10.152.249.233:3000/api/health in phone browser
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default DebugScreen;