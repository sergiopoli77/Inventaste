const dotenv = require("dotenv");

// Memuat variabel lingkungan dari file .env
dotenv.config();

module.exports = {
  mongoUrl: process.env.MONGO_URL,  // Mengambil nilai MONGO_URL dari file .env
};