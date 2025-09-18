const mongoose = require('mongoose');
require('dotenv').config();
const ConnectDB=async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");
    
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}
module.exports=ConnectDB;