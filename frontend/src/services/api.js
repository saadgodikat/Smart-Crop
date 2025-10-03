// Default API URL - will be updated dynamically
let API_BASE_URL = 'http://localhost:3000/api';

// Function to update API URL
const updateAPIURL = (newURL) => {
  API_BASE_URL = newURL;
  console.log('📡 API URL updated to:', API_BASE_URL);
};

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.error || 'Something went wrong');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      
      // Provide more specific error messages
      if (error.message.includes('Failed to fetch') || error.message.includes('Network request failed')) {
        throw new Error('Cannot connect to server. Please ensure the backend is running on port 3000.');
      }
      
      throw error;
    }
  }

  // Authentication
  async login(phone, password) {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    });
  }

  async signup(userData) {
    return this.request('/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Crop Advisory
  async getAdvisory(soilType, lastCrop) {
    return this.request('/advisory', {
      method: 'POST',
      body: JSON.stringify({ soil_type: soilType, last_crop: lastCrop }),
    });
  }

  // Soil Health
  async getSoilHealth(soilType = null) {
    const query = soilType ? `?soil_type=${encodeURIComponent(soilType)}` : '';
    return this.request(`/soil${query}`);
  }

  // Weather
  async getWeather(location = null) {
    const query = location ? `?location=${encodeURIComponent(location)}` : '';
    return this.request(`/weather${query}`);
  }

  // Market Prices
  async getMarketPrices(location = null, crop = null) {
    let query = '';
    const params = [];
    
    if (location) params.push(`location=${encodeURIComponent(location)}`);
    if (crop) params.push(`crop=${encodeURIComponent(crop)}`);
    
    if (params.length > 0) {
      query = '?' + params.join('&');
    }
    
    return this.request(`/market${query}`);
  }

  // Profile
  async getProfile(userId) {
    return this.request(`/profile/${userId}`);
  }

  // Feedback
  async submitFeedback(userId, feedbackText) {
    return this.request('/feedback', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, feedback_text: feedbackText }),
    });
  }

  // Health Check
  async healthCheck() {
    return this.request('/health');
  }
}

export { API_BASE_URL, updateAPIURL };
export default new ApiService();
