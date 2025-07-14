//acquire mongoose
const mongoose = require('mongoose');

const connectDB=async()=>{
    try{
       await mongoose.connect("mongodb+srv://saniya_arora:shaina@cluster0.7s8htei.mongodb.net/jobtracker?retryWrites=true&w=majority&appName=Cluster0");
        console.log("✅ Connected to MongoDB");
    }catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
    }
}
module.exports=connectDB;