const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

// michtelure2003_db_user
// qo7i0U2EWTgmh1Xz

// mongodb+srv://michtelure2003_db_user:qo7i0U2EWTgmh1Xz@noteplus-cluster.qqmynui.mongodb.net/?appName=Noteplus-Cluster

// Helloworld2003