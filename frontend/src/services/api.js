const API_BASE_URL = 'http://localhost:3000/api';

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
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
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

export default new ApiService();
