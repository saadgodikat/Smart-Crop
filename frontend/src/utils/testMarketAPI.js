// Quick test to validate market API and get working cities
const API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';

export const testAndGetWorkingCities = async () => {
  const testStates = ['Maharashtra', 'Punjab', 'Gujarat', 'Karnataka', 'Tamil Nadu'];
  const workingCities = {};
  
  for (const state of testStates) {
    try {
      const stateFilter = encodeURIComponent(state);
      const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[state]=${stateFilter}&limit=30`;
      
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        const records = data.records || [];
        
        const markets = new Set();
        records.forEach(record => {
          if (record.market && record.market.trim().length > 2) {
            markets.add(record.market.trim());
          }
          if (record.district && record.district.trim().length > 2) {
            markets.add(record.district.trim());
          }
        });
        
        workingCities[state] = Array.from(markets).slice(0, 6);
        console.log(`✅ ${state}: ${workingCities[state].length} working cities`);
      }
    } catch (error) {
      console.error(`❌ ${state}: ${error.message}`);
      workingCities[state] = [];
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return workingCities;
};

// Test specific commodity availability
export const testCommodities = async () => {
  const commodities = ['Potato', 'Onion', 'Tomato', 'Rice', 'Wheat'];
  const results = {};
  
  for (const commodity of commodities) {
    try {
      const commodityFilter = encodeURIComponent(commodity);
      const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[commodity]=${commodityFilter}&limit=5`;
      
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        results[commodity] = {
          available: data.records?.length > 0,
          count: data.records?.length || 0
        };
      }
    } catch (error) {
      results[commodity] = { available: false, error: error.message };
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
};