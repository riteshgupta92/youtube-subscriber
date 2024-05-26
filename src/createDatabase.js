import mongoose from "mongoose";
import dotenv from "dotenv";
import { Subscriber } from "./model/subscriber.model.js";
import data from "./data.js";
// Load environment variables
dotenv.config();

//connect to database
const DATABASE_URI = process.env.DATABASE_URI;

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database
    await mongoose.connect(DATABASE_URI);
    console.log("Database connection successful. Database created...");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

// Refresh data in subscribers collection

const refreshData = async () => {
  try {
    await Subscriber.deleteMany({}, { wtimeout: 30000 });
    console.log("Deleted all subscribers");

    const newSubscribers = await Subscriber.insertMany(data);
    console.log(`Added ${newSubscribers.length} new subscribers`);
  } catch (error) {
    console.log("Error refreshing data", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from database");
  }
};
(async () => {
  await connectDB();
  await refreshData();
})();

export { connectDB, refreshData };
