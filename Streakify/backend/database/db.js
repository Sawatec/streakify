/*
 * Erstellt bei: Mahdi Amouri (940504)
 * 10.11.2024
 * Diese Datei ist für die Verbindung zur Datenbank verantwortlich.
 */
require('dotenv').config();
const mongoose = require("mongoose");

const connectionString = process.env.DB_CONNECTION_STRING;

let connectionOptions;
try {
  connectionOptions = process.env.DB_CONNECTION_OPTIONS ? JSON.parse(process.env.DB_CONNECTION_OPTIONS) : {};
} catch (error) {
  console.error("Error parsing DB_CONNECTION_OPTIONS:", error);
  connectionOptions = {};
}

async function initDb() {
  if (!connectionString) {
    console.error("Database connection string is not defined");
    process.exit(1);
  }

  try {
    await mongoose.connect(connectionString, connectionOptions);
    console.log("Database connected successfully");

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from DB");
    });

    // Graceful shutdown
    process.on("SIGINT", closeDb).on("SIGTERM", closeDb);
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
}

function closeDb() {
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed due to app termination");
    process.exit(0);
  });
}

module.exports = { initDb, closeDb };