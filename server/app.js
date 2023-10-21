const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');

const authRoute = require("./src/routes/userRoutes");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//Home route
app.get('/', (req, res) => {
  res.send('Welcome to Quiz Builder Application!')
})

// Health API End-Point
app.get("/health", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

  res.status(200).json({
    server: "Running Successfully",
    database: dbStatus,
  });
});

// Authentication Route - Register & Login ---- /api/auth/register && /api/auth/login
app.use("/api/auth", authRoute);


// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Something went wrong! Please try again later." });
});

module.exports = app;