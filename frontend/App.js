import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// Removed bottom tabs in favor of stack-only navigation
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Import screens
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';
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

const Stack = createStackNavigator();

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
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

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={theme.colors.primary} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!selectedLanguage ? (
            <Stack.Screen name="LanguageSelection">
              {(props) => <LanguageSelectionScreen {...props} onLanguageSelect={handleLanguageSelect} />}
            </Stack.Screen>
          ) :
          !isLoggedIn ? (
            <>
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} onLogin={handleLogin} language={selectedLanguage} />}
              </Stack.Screen>
              <Stack.Screen name="Signup">
                {(props) => <SignupScreen {...props} onLogin={handleLogin} language={selectedLanguage} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              {/* Stack-only navigation, no bottom tabs */}
              <Stack.Screen name="Dashboard">
                {(props) => (
                  <DashboardScreen
                    {...props}
                    user={user}
                    language={selectedLanguage}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Advisory"
                options={{
                  title: 'Crop Advisory / फसल सलाह',
                  headerShown: true,
                  headerStyle: { backgroundColor: theme.colors.primary },
                  headerTintColor: '#fff',
                }}
              >
                {(props) => <AdvisoryScreen {...props} user={user} language={selectedLanguage} />}
              </Stack.Screen>
              <Stack.Screen
                name="Soil"
                options={{
                  title: 'Soil Health / मिट्टी स्वास्थ्य',
                  headerShown: true,
                  headerStyle: { backgroundColor: theme.colors.primary },
                  headerTintColor: '#fff',
                }}
              >
                {(props) => <SoilHealthScreen {...props} user={user} language={selectedLanguage} />}
              </Stack.Screen>
              <Stack.Screen
                name="Weather"
                options={{
                  title: 'Weather / मौसम',
                  headerShown: true,
                  headerStyle: { backgroundColor: theme.colors.primary },
                  headerTintColor: '#fff',
                }}
              >
                {(props) => <WeatherScreen {...props} user={user} language={selectedLanguage} />}
              </Stack.Screen>
              <Stack.Screen
                name="Market"
                options={{
                  title: 'Market Prices / बाजार मूल्य',
                  headerShown: true,
                  headerStyle: { backgroundColor: theme.colors.primary },
                  headerTintColor: '#fff',
                }}
              >
                {(props) => <MarketPricesScreen {...props} user={user} language={selectedLanguage} />}
              </Stack.Screen>
              <Stack.Screen
                name="Profile"
                options={{
                  title: 'Profile / प्रोफाइल',
                  headerShown: true,
                  headerStyle: { backgroundColor: theme.colors.primary },
                  headerTintColor: '#fff',
                }}
              >
                {(props) => <ProfileScreen {...props} user={user} language={selectedLanguage} />}
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
                {(props) => <FeedbackScreen {...props} user={user} language={selectedLanguage} />}
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
          )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
