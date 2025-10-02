# Smart Crop Advisory - Backend API

Node.js/Express.js backend API for the Smart Crop Advisory mobile app.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Installation
```bash
cd backend
npm install
```

### Database Setup
1. Install MySQL on your system
2. Create a database named `smart_crop_advisory`
3. Update database credentials in `config.js` if needed

### Start Server
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/signup` - User registration

### Data Services
- `POST /api/advisory` - Get crop advisory recommendations
- `GET /api/soil` - Get soil health data
- `GET /api/weather` - Get weather information
- `GET /api/market` - Get market prices
- `GET /api/profile/:userId` - Get user profile
- `POST /api/feedback` - Submit feedback
- `GET /api/health` - Health check

## 🗄️ Database Schema

The application automatically creates the following tables:

- **users** - User accounts and profile information
- **advisory** - Crop advisory recommendations
- **soil_health** - Soil health information
- **weather** - Weather data by location
- **market** - Crop prices by location
- **feedback** - User feedback submissions

## 📊 Demo Data

The database is automatically seeded with sample data including:
- 3 demo users with different profiles
- 5 crop advisory recommendations
- 5 soil health records
- 5 weather data entries
- 7 market price records

## 🔧 Configuration

Update `config.js` for your environment:

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

## 🛠️ Development

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 📝 API Documentation

### Login
```bash
POST /api/login
Content-Type: application/json

{
  "phone": "9876543210",
  "password": "password123"
}
```

### Signup
```bash
POST /api/signup
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "9876543210",
  "password": "password123",
  "location": "Pune",
  "soil_type": "black",
  "last_crop": "cotton"
}
```

### Get Advisory
```bash
POST /api/advisory
Content-Type: application/json

{
  "soil_type": "black",
  "last_crop": "cotton"
}
```

### Get Soil Health
```bash
GET /api/soil
GET /api/soil?soil_type=black
```

### Get Weather
```bash
GET /api/weather
GET /api/weather?location=Pune
```

### Get Market Prices
```bash
GET /api/market
GET /api/market?location=Pune&crop=wheat
```

### Submit Feedback
```bash
POST /api/feedback
Content-Type: application/json

{
  "user_id": 1,
  "feedback_text": "Great app!"
}
```

## 🔍 Testing

Test the API endpoints using tools like Postman or curl:

```bash
# Health check
curl http://localhost:3000/api/health

# Login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210","password":"password123"}'
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check database credentials
- Verify database exists

### Port Already in Use
- Change port in config.js
- Kill existing process: `lsof -ti:3000 | xargs kill -9`

### Module Not Found
- Run `npm install` again
- Check Node.js version compatibility

## 📦 Dependencies

- **express** - Web framework
- **mysql2** - MySQL database driver
- **cors** - Cross-origin resource sharing
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables

## 🚀 Deployment

### Environment Variables
Create a `.env` file:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=smart_crop_advisory
PORT=3000
```

### Production Deployment
1. Set up production database
2. Configure environment variables
3. Use PM2 or similar for process management
4. Set up reverse proxy (nginx)
5. Enable HTTPS

---

**Backend API for Smart Crop Advisory Mobile App**
