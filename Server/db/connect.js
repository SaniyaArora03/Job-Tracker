//acquire mongoose
const mongoose = require('mongoose');
require("dotenv").config();
const mongoURI = process.env.MONGO_URL;


const connectDB=async()=>{
    try{
       await mongoose.connect(mongoURI);
        console.log("✅ Connected to MongoDB");
    }catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
    }
}
module.exports=connectDB;