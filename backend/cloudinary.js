// cloudinary.js
const cloudinary = require('cloudinary').v2;
// import { v2 as cloudinary } from 'cloudinary';
require('dotenv').config(); // to read .env inside this file too if needed

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports = cloudinary;
