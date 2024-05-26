import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./route/subscriber.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./swagger.js";

//load environment variables
dotenv.config();

// Initialize express application
const app = express();

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);

//Parse JSON bodies that API clients send. using middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use router for subscribers endpoint
app.use("/subscribers", router);

// Serve the Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
(async () => {
  await connectDB();
})();

// Get the port from environment variables or use 8000 as a default
const port = process.env.PORT || 8000;

// Start Server
app.listen(port, () => console.log(`server listening on port ${port}!`));

export default app;
