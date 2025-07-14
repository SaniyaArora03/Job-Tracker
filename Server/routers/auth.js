const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
  const { email } = req.body;
  console.log("📨 Email received from frontend:", email);

  if (!email) {
    return res.status(400).json({ message: 'Email not provided' });
  }

  try {
    let user = await User.findOne({ email });
    console.log("🔍 Found user in DB:", user);

    if (!user) {
      console.log("➕ Creating new user...");
      user = await User.create({ email });
    }

    console.log("✅ Returning user:", user);
    res.status(200).json({ userId: user._id, email: user.email });

  } catch (err) {
    console.error("❌ Login server error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
