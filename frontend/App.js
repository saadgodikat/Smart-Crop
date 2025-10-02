import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AdvisoryScreen from './src/screens/AdvisoryScreen';
import SoilHealthScreen from './src/screens/SoilHealthScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import MarketPricesScreen from './src/screens/MarketPricesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import HelpScreen from './src/screens/HelpScreen';

// Theme
import theme from './src/theme/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Advisory') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          } else if (route.name === 'Soil') {
            iconName = focused ? 'earth' : 'earth-outline';
          } else if (route.name === 'Weather') {
            iconName = focused ? 'cloud' : 'cloud-outline';
          } else if (route.name === 'Market') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ title: 'Dashboard / डैशबोर्ड' }}
      />
      <Tab.Screen 
        name="Advisory" 
        component={AdvisoryScreen}
        options={{ title: 'Crop Advisory / फसल सलाह' }}
      />
      <Tab.Screen 
        name="Soil" 
        component={SoilHealthScreen}
        options={{ title: 'Soil Health / मिट्टी स्वास्थ्य' }}
      />
      <Tab.Screen 
        name="Weather" 
        component={WeatherScreen}
        options={{ title: 'Weather / मौसम' }}
      />
      <Tab.Screen 
        name="Market" 
        component={MarketPricesScreen}
        options={{ title: 'Market Prices / बाजार मूल्य' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile / प्रोफाइल' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (from AsyncStorage in a real app)
    // For demo purposes, we'll start with login screen
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={theme.colors.primary} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <>
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
              </Stack.Screen>
              <Stack.Screen name="Signup">
                {(props) => <SignupScreen {...props} onLogin={handleLogin} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="MainTabs">
                {(props) => <MainTabs {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen 
                name="Feedback" 
                options={{ 
                  title: 'Feedback / प्रतिक्रिया',
                  headerShown: true,
                  headerStyle: { backgroundColor: theme.colors.primary },
                  headerTintColor: '#fff'
                }}
              >
                {(props) => <FeedbackScreen {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen 
                name="Help" 
                component={HelpScreen}
                options={{ 
                  title: 'Help / सहायता',
                  headerShown: true,
                  headerStyle: { backgroundColor: theme.colors.primary },
                  headerTintColor: '#fff'
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
