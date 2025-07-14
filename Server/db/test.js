const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://saniya_arora:shaina@cluster0.7s8htei.mongodb.net/jobtracker?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Failed to connect:", err.message);
    process.exit(1);
  });
