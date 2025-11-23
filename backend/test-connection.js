const mongoose = require("mongoose");
require("dotenv").config();

const testConnection = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    console.log("📍 URI:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully!");
    console.log("📊 Database:", mongoose.connection.name);
    console.log("🖥️  Host:", mongoose.connection.host);
    console.log("🔢 Port:", mongoose.connection.port);

    // Test creating a simple document
    const TestSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model("Test", TestSchema);

    await TestModel.create({ test: "Connection works!" });
    console.log("✅ Test document created successfully!");

    // Clean up
    await TestModel.deleteMany({});
    console.log("✅ Test document deleted!");

    await mongoose.connection.close();
    console.log("👋 Connection closed!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

testConnection();
