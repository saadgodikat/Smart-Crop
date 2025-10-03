import React, { useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl, Alert } from 'react-native';
import { Card, Title, Paragraph, Chip, Button, Badge, Text } from 'react-native-paper';
import { API_BASE_URL } from '../services/api';

const AlertsScreen = ({ route }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({ total_alerts: 0, unread_alerts: 0, critical_alerts: 0 });

  // Get user ID from navigation params or storage
  const userId = route.params?.userId || 1; // Default to user 1 for demo

  useEffect(() => {
    fetchAlerts();
    fetchStats();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/alerts/user/${userId}`);
      const data = await response.json();
      
      if (response.ok) {
        setAlerts(data);
      } else {
        console.error('Failed to fetch alerts:', data.error);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/alerts/stats/${userId}`);
      const data = await response.json();
      
      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching alert stats:', error);
    }
  };

  const markAsRead = async (alertId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/alerts/mark-read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          alertId,
        }),
      });

      if (response.ok) {
        // Update local state
        setAlerts(alerts.map(alert => 
          alert.id === alertId 
            ? { ...alert, is_read: true, read_at: new Date().toISOString() }
            : alert
        ));
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchAlerts();
    fetchStats();
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#f44336';
      case 'high': return '#ff9800';
      case 'medium': return '#2196f3';
      case 'low': return '#4caf50';
      default: return '#757575';
    }
  };

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case 'weather': return '🌦️';
      case 'pest': return '🐛';
      case 'market': return '💰';
      case 'government': return '🏛️';
      default: return '📢';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: '#f5f5f5' }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Stats Cards */}
      <View style={{ flexDirection: 'row', padding: 16, justifyContent: 'space-between' }}>
        <Card style={{ flex: 1, marginRight: 8 }}>
          <Card.Content style={{ alignItems: 'center', padding: 12 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2196f3' }}>
              {stats.total_alerts}
            </Text>
            <Text style={{ fontSize: 12, color: '#666' }}>Total Alerts</Text>
          </Card.Content>
        </Card>
        
        <Card style={{ flex: 1, marginHorizontal: 4 }}>
          <Card.Content style={{ alignItems: 'center', padding: 12 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ff9800' }}>
              {stats.unread_alerts}
            </Text>
            <Text style={{ fontSize: 12, color: '#666' }}>Unread</Text>
          </Card.Content>
        </Card>
        
        <Card style={{ flex: 1, marginLeft: 8 }}>
          <Card.Content style={{ alignItems: 'center', padding: 12 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#f44336' }}>
              {stats.critical_alerts}
            </Text>
            <Text style={{ fontSize: 12, color: '#666' }}>Critical</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Alerts List */}
      <View style={{ padding: 16 }}>
        {alerts.length === 0 ? (
          <Card>
            <Card.Content style={{ alignItems: 'center', padding: 32 }}>
              <Text style={{ fontSize: 18, color: '#666' }}>No alerts available</Text>
              <Text style={{ color: '#999', marginTop: 8 }}>
                You'll receive notifications here when there are important updates
              </Text>
            </Card.Content>
          </Card>
        ) : (
          alerts.map((alert) => (
            <Card 
              key={alert.id} 
              style={{ 
                marginBottom: 12,
                borderLeftWidth: 4,
                borderLeftColor: getSeverityColor(alert.severity),
                opacity: alert.is_read ? 0.7 : 1
              }}
            >
              <Card.Content>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <Text style={{ fontSize: 20, marginRight: 8 }}>
                        {getAlertTypeIcon(alert.alert_type)}
                      </Text>
                      <Title style={{ flex: 1, fontSize: 16 }}>{alert.title}</Title>
                      {!alert.is_read && (
                        <Badge style={{ backgroundColor: '#f44336' }}>New</Badge>
                      )}
                    </View>
                    
                    <Paragraph style={{ marginBottom: 12 }}>{alert.message}</Paragraph>
                    
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
                      <Chip 
                        mode="outlined" 
                        style={{ 
                          marginRight: 8, 
                          marginBottom: 4,
                          borderColor: getSeverityColor(alert.severity)
                        }}
                        textStyle={{ color: getSeverityColor(alert.severity) }}
                      >
                        {alert.severity.toUpperCase()}
                      </Chip>
                      
                      <Chip mode="outlined" style={{ marginRight: 8, marginBottom: 4 }}>
                        {alert.alert_type.charAt(0).toUpperCase() + alert.alert_type.slice(1)}
                      </Chip>
                      
                      {alert.location && (
                        <Chip mode="outlined" style={{ marginRight: 8, marginBottom: 4 }}>
                          📍 {alert.location}
                        </Chip>
                      )}
                      
                      {alert.crop_type && (
                        <Chip mode="outlined" style={{ marginBottom: 4 }}>
                          🌾 {alert.crop_type}
                        </Chip>
                      )}
                    </View>
                    
                    <Text style={{ fontSize: 12, color: '#666' }}>
                      {formatDate(alert.created_at)}
                      {alert.read_at && ` • Read: ${formatDate(alert.read_at)}`}
                    </Text>
                  </View>
                </View>
                
                {!alert.is_read && (
                  <Button 
                    mode="outlined" 
                    onPress={() => markAsRead(alert.id)}
                    style={{ marginTop: 12 }}
                  >
                    Mark as Read
                  </Button>
                )}
              </Card.Content>
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default AlertsScreen;