// cloudinary.js
const cloudinary = require('cloudinary').v2;
// import { v2 as cloudinary } from 'cloudinary';
require('dotenv').config(); // to read .env inside this file too if needed

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const uploadToCloudinary = (filePath) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
};

module.exports = {cloudinary, uploadToCloudinary };
