import mongoose from "mongoose";
import data from "./data";
import { Subscriber } from "./model/subscriber.model";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

//connect to database
//const DATABASE_URL = "mongodb://127.0.0.1:27017/subscribers";

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database
    await mongoose.connect(`${process.env.DATABASE_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful. Database created...");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

// Refresh data in subscribers collection

const refreshData = async () => {
  try {
    console.log("Deleted all subscribers");
    await Subscriber.deleteMany({});
    const newSubscribers = await Subscriber.insertMany(data);
    console.log(`Added ${newSubscribers.length} new subscribers`);
  } catch (error) {
    console.log("Error refreshing data", err);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from database");
  }
};

connectToDatabase();
refreshData();

export { connectDB, refreshData };
