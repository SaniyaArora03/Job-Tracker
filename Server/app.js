//acquire express
const express = require('express');
const app = express();
const path=require('path');
require("dotenv").config(); 
const mongoURI = process.env.MONGO_URL;


//acquire database
const connectDB = require('../Server/db/connect');


//port
const port=process.env.PORT || 5000;

const cors = require('cors');
app.use(cors()); // allows frontend to talk to backend
app.use(express.json()); // allows parsing JSON bodies

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));


//acquire routes
const jobRoutes = require('../Server/routers/jobRouters');
app.use('/api/jobs', jobRoutes);

//authentication routes
const authRoutes = require('../Server/routers/auth');
app.use('/api/auth', authRoutes);



//listening to server
const start=async()=>{
    try{
        //database
        await connectDB();
        await app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`);
        });

    }catch(error){
        console.log(error);
    }
}
start();