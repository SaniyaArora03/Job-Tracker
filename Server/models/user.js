//user schema for authentication
const mongoose=require('mongoose');
//user email
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,          // normalize email
         trim: true     
    }
    });
  
    module.exports = mongoose.model("User", userSchema);