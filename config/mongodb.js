const mongoose = require("mongoose");


// mongodb connection function
const mongodbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB is connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

module.exports = mongodbConnection;
