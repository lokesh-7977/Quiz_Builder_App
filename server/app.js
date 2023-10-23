const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');

const authRoute = require("./src/routes/userRoutes");
const quizRoutes = require("./src/routes/quizRoutes")
const quizResults = require("./src/routes/quizResultsRoutes")

const app = express();
// ----------------------------------------------------------------------------

// Express Body-Parser MiddleWares 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// ------------------------------------------------------------------------------

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


// ----------------------------------------------------------------------------------------
// ROUTES


// Authentication Routes   - Register & Login ---- /api/auth/register && /api/auth/login
app.use("/api/auth", authRoute);


// Quiz Routes -   Create,Read,Update,Delete ---- /quiz/create && /quiz/list && /quiz/:quizId
app.use("/quiz",quizRoutes)

// Quiz Results Routes - results/:quizId && /results/:resultId && /results/user/:userId
app.use("/results",quizResults)

// ----------------------------------------------------------------------------------------------

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Something went wrong! Please try again later." });
});

module.exports = app;