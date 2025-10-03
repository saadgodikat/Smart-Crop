# Smart Crop Advisory - Mobile App

A full-stack prototype mobile application for farmers in India to get crop advisory, soil health information, weather data, and market prices.

## 🌾 Features

- **Soil Health Analysis**: Comprehensive soil testing with pH, nutrients, and health scoring
- **Smart Crop Advisory**: AI-powered crop recommendations based on soil health data
- **Real-time Market Prices**: Live crop prices from Government of India API
- **Weather Information**: Location-based weather data and farming advice
- **User Profile Management**: Streamlined profile with essential information
- **Feedback System**: Submit feedback and get support
- **Bilingual Support**: English and Hindi interface

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MySQL** database
- **RESTful API** endpoints
- **CORS** enabled for mobile app

### Frontend
- **React Native** with Expo
- **React Navigation** for screen navigation
- **React Native Paper** for Material Design UI
- **Government API Integration** for market prices
- **Global State Management** for data sharing

## 📱 Screens & Workflow

1. **Login/Signup** - User authentication
2. **Dashboard** - Main navigation hub
3. **Soil Health** - Comprehensive soil analysis (REQUIRED FIRST)
4. **Crop Advisory** - Smart recommendations based on soil data
5. **Market Prices** - Real-time prices with state/city filters
6. **Weather** - Weather data and farming advice
7. **Profile** - Streamlined user profile
8. **Feedback** - Submit feedback and support
9. **Help** - Help and support information

### 🔄 **New Workflow**
**Step 1**: Check Soil Health → Enter soil parameters → Get analysis → Data saved
**Step 2**: Get Crop Advisory → System uses saved soil data → Enter region → Get recommendations

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Mobile device** or **Android/iOS simulator**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-crop-advisory
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Database**
   - Install MySQL on your system
   - Create a database named `smart_crop_advisory`
   - Update database credentials in `backend/config.js` if needed

4. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The backend will start on `http://localhost:3000`

5. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

6. **Start Frontend**
   ```bash
   cd frontend
   expo start
   ```

7. **Run on Device**
   - Install Expo Go app on your mobile device
   - Scan the QR code from the terminal
   - Or use Android/iOS simulator

## 🗄️ Database Schema

The app uses the following MySQL tables:

- **users** - User accounts and profile information
- **advisory** - Crop advisory recommendations
- **soil_health** - Soil health information
- **weather** - Weather data by location
- **market** - Crop prices by location
- **feedback** - User feedback submissions

### Demo Data

The database is automatically seeded with demo data including:
- Sample users with different soil types and crops
- Advisory recommendations for various soil-crop combinations
- Weather data for major Indian cities
- Market prices for common crops
- Soil health information

## 🔑 Demo Credentials

Use these credentials to test the app:

```
Phone: 9876543210
Password: password123
```

Or create a new account using the signup screen.

## 📡 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/signup` - User registration

### Internal APIs
- `GET /api/weather` - Get weather data
- `GET /api/profile/:userId` - Get user profile
- `POST /api/feedback` - Submit feedback
- `GET /api/health` - Health check

### External APIs
- **Government of India Data API** - Real-time market prices
- **API Key**: `579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b`
- **Endpoint**: `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070`

## 🎨 UI Features

- **Material Design** components using React Native Paper
- **Bilingual Interface** (English + Hindi)
- **Bottom Tab Navigation** for easy access
- **Color-coded Health Indicators** with progress bars
- **Cascading Dropdowns** for state/city selection
- **Real-time Loading States** and comprehensive error handling
- **Responsive Design** for different screen sizes

## 📊 Key Features

### Soil Health Analysis
- **6 Parameters**: pH, Nitrogen, Phosphorus, Potassium, Organic Matter, Moisture
- **Smart Scoring**: 0-100% health score for each parameter
- **Visual Indicators**: Color-coded progress bars (Red/Orange/Green)
- **Overall Health**: Calculated average of all parameters
- **Session Storage**: Data saved until app refresh

### Smart Crop Recommendations
- **pH-based Algorithm**: Crops scored by soil pH compatibility
- **Comprehensive Data**: Fertilizer needs, water requirements, seasons
- **Rating System**: Excellent/Good/Fair/Poor ratings
- **10 Crop Database**: Wheat, Rice, Maize, Cotton, Sorghum, etc.

### Market Prices Integration
- **20 States**: Complete coverage of major Indian states
- **150+ Cities**: 6-8 cities per state for precise location
- **Live Data**: Real-time prices from Government API
- **Price Range**: Modal, minimum, and maximum prices
- **50+ Commodities**: Vegetables, fruits, grains, spices

### Weather Information
- **Location-based**: Weather data for major Indian cities
- **Farming Advice**: Weather-specific agricultural recommendations
- **Key Metrics**: Temperature, rainfall, humidity

## 🔧 Configuration

### Backend Configuration
Update `backend/config.js` for database settings:
```javascript
module.exports = {
  database: {
    host: 'localhost',
    user: 'root',
    password: '', // Your MySQL password
    database: 'smart_crop_advisory'
  },
  port: 3000
};
```

### Frontend Configuration
Update API URL in `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

### Market Prices API Configuration
The app uses Government of India Open Data API:
```javascript
const API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
const API_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';
```

For physical device testing, replace `localhost` with your computer's IP address.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Check database credentials in config.js
   - Verify database exists

2. **API Connection Error**
   - Check if backend server is running on port 3000
   - For mobile device, use IP address instead of localhost
   - Ensure both devices are on same network

3. **Market Prices Not Loading**
   - Check internet connection
   - Verify Government API is accessible
   - Try different commodity names (exact spelling matters)

4. **Crop Advisory Shows 'No Soil Data'**
   - Complete soil health analysis first
   - Ensure all soil parameters are entered
   - Check if app was refreshed (data clears on refresh)

5. **Expo App Issues**
   - Clear Expo cache: `expo start --clear`
   - Restart Metro bundler
   - Check Expo Go app version

6. **Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again
   - Check Node.js version compatibility

## 📱 Testing

### Test Scenarios

1. **User Registration**
   - Create new account with phone/password
   - Test validation for required fields

2. **Soil Health Analysis**
   - Enter soil parameters (pH: 6.8, N: 25, P: 20, K: 150, OM: 3.5, Moisture: 25)
   - Verify color-coded results and overall health score
   - Check data persistence until app refresh

3. **Crop Advisory Workflow**
   - Try without soil data (should show error)
   - Complete soil health first, then get recommendations
   - Test different regions for varied results

4. **Market Prices**
   - Test state/city cascading dropdowns
   - Search for vegetables: Tomato, Onion, Potato
   - Verify real-time price data display

5. **Profile Management**
   - Check streamlined profile (name, phone, location only)
   - Test logout functionality

6. **Data Persistence**
   - Verify soil data clears on app refresh
   - Test cross-screen data sharing

## 🚀 Deployment

### Backend Deployment
1. Deploy to cloud platform (AWS, Heroku, DigitalOcean)
2. Update database configuration for production
3. Set environment variables for production settings

### Frontend Deployment
1. Build for production: `expo build:android` or `expo build:ios`
2. Submit to app stores (Google Play Store, Apple App Store)
3. Configure push notifications if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: support@smartcropadvisory.com
- Phone: +91 98765 43210
- Website: https://smartcropadvisory.com

## 🔮 Future Enhancements

- **AI/ML Integration**: Advanced crop prediction algorithms
- **IoT Sensor Integration**: Real-time soil monitoring
- **Persistent Storage**: User preference for data retention
- **Push Notifications**: Weather alerts and farming reminders
- **Offline Mode**: Core features without internet
- **Multi-language Support**: Regional Indian languages
- **Advanced Analytics**: Farming performance dashboard
- **Community Features**: Farmer networking and knowledge sharing
- **Government Schemes**: Integration with agricultural subsidies
- **Crop Disease Detection**: Image-based disease identification

---

**Built with ❤️ for Indian Farmers**
