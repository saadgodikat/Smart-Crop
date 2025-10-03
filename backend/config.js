require('dotenv').config();

module.exports = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Amanatar@@12',
    database: process.env.DB_NAME || 'smart_crop_advisory'
  },
  port: process.env.PORT || 3000,
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key',
    model: 'gpt-3.5-turbo'
  }
};
