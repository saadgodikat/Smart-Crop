// Market API utilities for testing and validation
const API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';

// Quick API health check
export const quickAPITest = async () => {
  try {
    const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=1`;
    const response = await fetch(apiUrl);
    return response.ok;
  } catch {
    return false;
  }
};

// Test API for specific state to get real market data
export const testStateMarkets = async (stateName) => {
  try {
    const stateFilter = encodeURIComponent(stateName);
    const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[state]=${stateFilter}&limit=50`;
    
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      const records = data.records || [];
      
      const markets = new Set();
      const commodities = new Set();
      
      records.forEach(record => {
        if (record.market && record.market.trim().length > 2) {
          markets.add(record.market.trim());
        }
        if (record.commodity && record.commodity.trim().length > 2) {
          commodities.add(record.commodity.trim());
        }
      });
      
      return {
        success: true,
        markets: Array.from(markets).slice(0, 6),
        commodities: Array.from(commodities).slice(0, 10),
        totalRecords: records.length
      };
    }
    
    return { success: false, error: `HTTP ${response.status}` };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Validated cities based on actual API data availability
export const getValidCitiesByState = () => {
  return {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore'],
    'Assam': ['Guwahati', 'Silchar', 'Dibrugarh'],
    'Bihar': ['Patna', 'Gaya', 'Muzaffarpur'],
    'Chhattisgarh': ['Raipur', 'Bilaspur'],
    'Delhi': ['New Delhi', 'Delhi'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    'Haryana': ['Gurgaon', 'Faridabad', 'Panipat'],
    'Himachal Pradesh': ['Shimla', 'Solan'],
    'Jharkhand': ['Ranchi', 'Jamshedpur'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    'Odisha': ['Bhubaneswar', 'Cuttack'],
    'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
    'Telangana': ['Hyderabad', 'Warangal'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra'],
    'West Bengal': ['Kolkata', 'Howrah']
  };
};

// Get verified commodities that work with the API
export const getVerifiedCommodities = () => {
  return [
    'Potato', 'Onion', 'Tomato', 'Rice', 'Wheat', 'Maize', 
    'Cotton', 'Groundnut', 'Soyabean', 'Chilli'
  ];
};