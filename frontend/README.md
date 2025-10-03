# Smart Crop Advisory - Frontend

React Native mobile app built with Expo for the Smart Crop Advisory system.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- Mobile device or Android/iOS simulator

### Installation
```bash
cd frontend
npm install
```

### Start Development Server
```bash
expo start
```

### Run on Device
- Install Expo Go app on your mobile device
- Scan the QR code from the terminal
- Or use Android/iOS simulator

## 📱 App Structure

```
frontend/
├── App.js                 # Main app component with navigation
├── src/
│   ├── screens/          # All app screens
│   │   ├── LoginScreen.js
│   │   ├── SignupScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── AdvisoryScreen.js
│   │   ├── SoilHealthScreen.js
│   │   ├── WeatherScreen.js
│   │   ├── MarketPricesScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── FeedbackScreen.js
│   │   └── HelpScreen.js
│   ├── services/
│   │   └── api.js        # API service layer
│   └── theme/
│       └── theme.js      # App theme configuration
├── package.json
└── app.json             # Expo configuration
```

## 🎨 Features

### Authentication
- Login with phone number and password
- User registration with farming details
- Demo credentials provided for testing

### Main Screens
- **Dashboard**: Central hub with navigation to all features
- **Crop Advisory**: Get personalized crop recommendations
- **Soil Health**: Monitor soil parameters and get suggestions
- **Weather**: Current weather conditions and farming advice
- **Market Prices**: Track crop prices and market trends
- **Profile**: User profile management
- **Feedback**: Submit feedback and get support
- **Help**: Comprehensive help and support information

### UI/UX Features
- Material Design components using React Native Paper
- Bilingual interface (English + Hindi)
- Bottom tab navigation for easy access
- Color-coded information for better readability
- Loading states and error handling
- Responsive design for different screen sizes

## 🛠️ Development

### Available Scripts
```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run on web browser
```

### Configuration

#### API Configuration
Update the API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

For physical device testing, replace `localhost` with your computer's IP address.

#### Theme Customization
Modify `src/theme/theme.js` to customize colors, fonts, and styling.

### Navigation Structure
- **Stack Navigator**: Handles authentication flow
- **Tab Navigator**: Bottom tabs for main app screens
- **Screen Props**: User data passed through navigation

## 📱 Screen Details

### Login/Signup Screens
- Form validation
- Demo credentials display
- Error handling and user feedback

### Dashboard Screen
- Welcome message with user name
- Grid layout of main features
- User profile summary
- Farming tips section

### Crop Advisory Screen
- Soil type and crop selection
- Interactive chip-based selection
- Detailed recommendation display
- Advisory tips

### Soil Health Screen
- Filter by soil type
- pH level indicators with color coding
- Organic content assessment
- Improvement suggestions

### Weather Screen
- Location-based weather data
- Temperature, rainfall, humidity metrics
- Farming advice based on conditions
- Temperature guide reference

### Market Prices Screen
- Filter by location and crop
- Market summary statistics
- Price analysis indicators
- Price range guide

### Profile Screen
- User information display
- Farming statistics
- Quick action buttons
- App information

### Feedback Screen
- Feedback form with character count
- Feedback categories
- Guidelines and contact information
- Recent updates

### Help Screen
- Comprehensive FAQ section
- Feature guides
- Troubleshooting tips
- Contact information

## 🎨 UI Components

### Design System
- **Primary Color**: #4CAF50 (Green)
- **Secondary Colors**: Various shades for different features
- **Typography**: System fonts with weight variations
- **Spacing**: Consistent margins and padding
- **Elevation**: Material Design elevation system

### Component Library
- React Native Paper components
- Custom styled components
- Vector icons (Ionicons)
- Loading indicators
- Error states

## 🔧 Customization

### Adding New Screens
1. Create screen component in `src/screens/`
2. Add navigation route in `App.js`
3. Update tab navigation if needed
4. Add API endpoints in `src/services/api.js`

### Modifying API Calls
Update `src/services/api.js` to add new API endpoints or modify existing ones.

### Styling Changes
- Modify `src/theme/theme.js` for global theme changes
- Update individual screen styles for specific changes

## 🐛 Troubleshooting

### Common Issues

#### Metro Bundler Issues
```bash
expo start --clear
```

#### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

#### API Connection Issues
- Ensure backend server is running
- Check API URL configuration
- For mobile device, use IP address instead of localhost

#### Expo Go Issues
- Update Expo Go app to latest version
- Clear Expo Go cache
- Restart Metro bundler

### Development Tips
- Use React Native Debugger for debugging
- Enable remote debugging in Expo Go
- Check console logs for API errors
- Test on both iOS and Android devices

## 📦 Dependencies

### Core Dependencies
- **expo**: Expo SDK
- **react**: React library
- **react-native**: React Native framework

### Navigation
- **@react-navigation/native**: Navigation library
- **@react-navigation/bottom-tabs**: Bottom tab navigation
- **@react-navigation/stack**: Stack navigation

### UI Components
- **react-native-paper**: Material Design components
- **@expo/vector-icons**: Icon library
- **react-native-vector-icons**: Additional icons

### Development
- **expo-constants**: App constants
- **expo-linking**: Deep linking support
- **expo-splash-screen**: Splash screen
- **expo-status-bar**: Status bar control

## 🚀 Building for Production

### Android Build
```bash
expo build:android
```

### iOS Build
```bash
expo build:ios
```

### Web Build
```bash
expo build:web
```

## 📱 Device Testing

### Physical Device
1. Install Expo Go from app store
2. Scan QR code from terminal
3. Ensure both devices are on same network

### Simulator/Emulator
1. Start Android Studio emulator or iOS simulator
2. Run `expo run:android` or `expo run:ios`

## 🔍 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] All navigation flows
- [ ] API data loading
- [ ] Form validations
- [ ] Error handling
- [ ] Different screen sizes
- [ ] Both iOS and Android platforms

### Test Scenarios
1. **Authentication Flow**
   - Register new user
   - Login with demo credentials
   - Logout functionality

2. **Data Screens**
   - Load advisory recommendations
   - Filter soil health data
   - Check weather information
   - View market prices

3. **User Interactions**
   - Submit feedback
   - Update profile information
   - Navigate between screens

## 📄 Configuration Files

### app.json
Expo configuration including:
- App name and slug
- Platform-specific settings
- Icons and splash screens
- Permissions

### package.json
Project dependencies and scripts:
- React Native and Expo versions
- Navigation libraries
- UI component libraries
- Development tools

---

**React Native Frontend for Smart Crop Advisory Mobile App**
