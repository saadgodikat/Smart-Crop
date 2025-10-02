module.exports = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'SaadGodikat@0101',
    database: process.env.DB_NAME || 'smart_crop_advisory'
  },
  port: process.env.PORT || 3000
};
