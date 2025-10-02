# Smart Crop Advisory - Mobile App

A full-stack prototype mobile application for farmers in India to get crop advisory, soil health information, weather data, and market prices.

## 🌾 Features

- **Crop Advisory**: Get personalized crop recommendations based on soil type and previous crops
- **Soil Health**: Monitor soil health parameters and get improvement suggestions
- **Weather Information**: Access current weather conditions and farming advice
- **Market Prices**: Track latest crop prices in your area
- **User Profile**: Manage your farming profile and preferences
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
- **React Native Paper** for UI components
- **Vector Icons** for icons

## 📱 Screens

1. **Login/Signup** - User authentication
2. **Dashboard** - Main navigation hub
3. **Crop Advisory** - Get crop recommendations
4. **Soil Health** - Soil information and suggestions
5. **Weather** - Weather data and farming advice
6. **Market Prices** - Crop price information
7. **Profile** - User profile management
8. **Feedback** - Submit feedback and support
9. **Help** - Help and support information

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

### Data
- `POST /api/advisory` - Get crop advisory
- `GET /api/soil` - Get soil health data
- `GET /api/weather` - Get weather data
- `GET /api/market` - Get market prices
- `GET /api/profile/:userId` - Get user profile
- `POST /api/feedback` - Submit feedback
- `GET /api/health` - Health check

## 🎨 UI Features

- **Material Design** components using React Native Paper
- **Bilingual Interface** (English + Hindi)
- **Bottom Tab Navigation** for easy access
- **Color-coded Information** for better readability
- **Responsive Design** for different screen sizes
- **Loading States** and error handling

## 📊 Sample Data

### Crop Advisory Examples
- **Black soil + Cotton** → Chickpea recommendation
- **Sandy soil + Wheat** → Groundnut recommendation
- **Clay soil + Rice** → Maize recommendation

### Soil Health Data
- **pH levels** with color-coded indicators
- **Organic content** assessments
- **Improvement suggestions** for each soil type

### Weather Information
- **Temperature, rainfall, humidity** data
- **Farming advice** based on weather conditions
- **Location-based** weather information

### Market Prices
- **Real-time crop prices** from different locations
- **Price analysis** and trends
- **Location-wise** price comparisons

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

3. **Expo App Issues**
   - Clear Expo cache: `expo start --clear`
   - Restart Metro bundler
   - Check Expo Go app version

4. **Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again
   - Check Node.js version compatibility

## 📱 Testing

### Test Scenarios

1. **User Registration**
   - Create new account with different soil types
   - Test validation for required fields

2. **Crop Advisory**
   - Test different soil type and crop combinations
   - Verify recommendations are returned

3. **Data Screens**
   - Check soil health, weather, and market price data
   - Test filtering and search functionality

4. **Profile Management**
   - Update profile information
   - Test logout functionality

5. **Feedback System**
   - Submit feedback and verify it's saved

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

- AI/ML integration for better predictions
- Push notifications for weather alerts
- Offline mode support
- Multi-language support (more Indian languages)
- Integration with IoT sensors
- Advanced analytics dashboard
- Farmer community features
- Government scheme integration

---

**Built with ❤️ for Indian Farmers**
