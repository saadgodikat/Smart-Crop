# Quick Start Guide - Fix Connection Error

## The Problem
The app shows `ERR_CONNECTION_REFUSED` because the backend server is not running.

## Solution (3 Simple Steps)

### Step 1: Start the Backend Server
```bash
cd backend
npm start
```

**Expected Output:**
```
Database initialization completed
Server running on http://localhost:3000
API endpoints available:
- POST /api/login
- POST /api/signup
...
```

### Step 2: Verify Server is Running
Open browser and go to: `http://localhost:3000/api/health`

**Expected Response:**
```json
{"status":"OK","message":"Smart Crop Advisory API is running"}
```

### Step 3: Start the Frontend
```bash
cd frontend
expo start
```

## Alternative: Use the Server Starter
```bash
cd backend
node start-server.js
```

## Troubleshooting

### If MySQL Connection Fails:
1. Install MySQL: https://dev.mysql.com/downloads/installer/
2. Start MySQL service
3. Update `backend/config.js` with your MySQL credentials

### If Port 3000 is Busy:
1. Kill process: `netstat -ano | findstr :3000`
2. Or change port in `backend/config.js`

### For Mobile Device Testing:
1. Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Update `frontend/src/services/api.js` line 1:
   ```javascript
   let API_BASE_URL = 'http://YOUR_IP_ADDRESS:3000/api';
   ```

## Quick Test Commands

**Test Backend:**
```bash
curl http://localhost:3000/api/health
```

**Test Login:**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210","password":"password123"}'
```

## Common Issues

1. **MySQL not installed** → Install MySQL
2. **Port 3000 busy** → Change port or kill process
3. **Firewall blocking** → Allow Node.js through firewall
4. **Wrong IP address** → Use `ipconfig` to find correct IP

---

**Need Help?** Check the console logs for specific error messages.