/*
 * Erstellt bei: Mahdi Amouri (940504)
 * Datum: 13.11.2024
 * Dieses Skript wird vor dem Ausführen der Tests ausgeführt, um eine Verbindung zur Datenbank herzustellen. Bitte nicht ändern!
 */
const mongoose = require("mongoose");

module.exports = async function globalTeardown() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log("Error while disconnecting from MongoDB:", error);
  }
};
