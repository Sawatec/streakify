/*
 * Erstellt bei: Mahdi Amouri (940504)
 * Datum: 13.11.2024
 * Dieses Skript wird vor dem Ausführen der Tests ausgeführt, um eine Verbindung zur Datenbank herzustellen.Bitte nicht ändern!
 */
const mongoose = require("mongoose");

module.exports = async function globalSetup() {
  const uri = "mongodb://127.0.0.1/Streakify";
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB Database");
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf("/"));
};
