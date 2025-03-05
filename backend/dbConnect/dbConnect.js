const mongoose = require("mongoose");

const connectDB = (url) => {
  try {
    console.log("Connecting to ", url);
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
