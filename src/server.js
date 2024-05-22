import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./route/subscriber.route.js";

//load environment variables
dotenv.config();

// Initialize express application
const app = express();

//Parse JSON bodies that API clients send. using middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/subscribers", router);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
(async () => {
  connectDB();
})();

// Get the port from environment variables or use 8000 as a default
const port = process.env.PORT || 8000;

// Start Server
app.listen(port, () => console.log(`server listening on port ${port}!`));
