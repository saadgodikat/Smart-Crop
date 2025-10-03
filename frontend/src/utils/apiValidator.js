// API Validator to test actual data availability
const API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';

export const validateMarketData = async () => {
  console.log('🔍 Validating Market API data availability...');
  
  const testCommodities = [
    'Potato', 'Onion', 'Tomato', 'Rice', 'Wheat', 'Maize', 'Cotton',
    'Groundnut', 'Soyabean', 'Sugarcane', 'Chilli', 'Turmeric'
  ];
  
  const testStates = ['Maharashtra', 'Punjab', 'Gujarat', 'Karnataka', 'Tamil Nadu'];
  
  const results = {
    workingCommodities: [],
    workingStates: {},
    totalRecords: 0
  };
  
  // Test commodities
  for (const commodity of testCommodities) {
    try {
      const commodityFilter = encodeURIComponent(commodity);
      const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[commodity]=${commodityFilter}&limit=10`;
      
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        if (data.records && data.records.length > 0) {
          results.workingCommodities.push(commodity);
          console.log(`✅ ${commodity}: ${data.records.length} records found`);
        } else {
          console.log(`❌ ${commodity}: No records found`);
        }
      }
    } catch (error) {
      console.log(`❌ ${commodity}: Error - ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Test states and get their markets
  for (const state of testStates) {
    try {
      const stateFilter = encodeURIComponent(state);
      const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[state]=${stateFilter}&limit=50`;
      
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        if (data.records && data.records.length > 0) {
          const markets = new Set();
          data.records.forEach(record => {
            if (record.market) markets.add(record.market.trim());
            if (record.district) markets.add(record.district.trim());
          });
          
          results.workingStates[state] = Array.from(markets).slice(0, 6);
          results.totalRecords += data.records.length;
          console.log(`✅ ${state}: ${data.records.length} records, ${markets.size} unique markets`);
        }
      }
    } catch (error) {
      console.log(`❌ ${state}: Error - ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log('📊 Validation Results:', results);
  return results;
};

// Quick API health check
export const checkAPIHealth = async () => {
  try {
    const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=1`;
    const response = await fetch(apiUrl);
    
    if (response.ok) {
      const data = await response.json();
      return {
        status: 'healthy',
        recordsAvailable: data.total || 0,
        sampleRecord: data.records?.[0] || null
      };
    } else {
      return {
        status: 'error',
        error: `HTTP ${response.status}: ${response.statusText}`
      };
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.message
    };
  }
};