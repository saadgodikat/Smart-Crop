const express = require('express');
const router = express.Router();
const config = require('../config');

router.post('/chat', async (req, res) => {
  try {
    const { message, userId, language } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const aiResponse = await generateAIResponse(message, language);

    res.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

async function generateAIResponse(message, language = 'en') {
  const isHindi = language === 'hi';
  const lowerMessage = message.toLowerCase();
  
  const responses = {
    weather: isHindi ? 
      'वर्तमान स्थितियों के आधार पर, लगभग 25°C तापमान के साथ धूप वाला मौसम अपेक्षित है। अधिकांश फसलों के लिए अच्छा है।' :
      'Based on current conditions, expect sunny weather with temperatures around 25°C. Good for most crops.',
    soil: isHindi ?
      'स्वस्थ मिट्टी के लिए, उचित pH स्तर (6.0-7.0) सुनिश्चित करें और नियमित रूप से जैविक पदार्थ मिलाएं।' :
      'For healthy soil, ensure proper pH levels (6.0-7.0) and add organic matter regularly.',
    pest: isHindi ?
      'इस मौसम में सामान्य कीट एफिड्स और कैटरपिलर हैं। जैविक उपचार के रूप में नीम का तेल उपयोग करें।' :
      'Common pests this season include aphids and caterpillars. Use neem oil as organic treatment.',
    crop: isHindi ?
      'अपनी मिट्टी के प्रकार और जलवायु के आधार पर इस मौसम में गेहूं या जौ लगाने पर विचार करें।' :
      'Consider planting wheat or barley this season based on your soil type and climate.',
    default: isHindi ?
      'मैं कृषि सलाह, मौसम की जानकारी, मिट्टी स्वास्थ्य, कीट नियंत्रण और फसल सिफारिशों में आपकी मदद कर सकता हूं। आप क्या जानना चाहते हैं?' :
      'I can help you with farming advice, weather information, soil health, pest control, and crop recommendations. What would you like to know?'
  };
  
  if (lowerMessage.includes('weather') || lowerMessage.includes('मौसम')) return responses.weather;
  if (lowerMessage.includes('soil') || lowerMessage.includes('मिट्टी')) return responses.soil;
  if (lowerMessage.includes('pest') || lowerMessage.includes('कीट')) return responses.pest;
  if (lowerMessage.includes('crop') || lowerMessage.includes('फसल')) return responses.crop;
  
  return responses.default;
}

module.exports = router;