/*
 * Erstellt bei: Mahdi Amouri (940504)
 * Datum: 13.11.2024
 * Dieses Skript wird vor dem Ausführen der Tests ausgeführt, um eine Verbindung zur Datenbank herzustellen. Bitte nicht ändern!
 */

const mongoose = require("mongoose");

beforeAll(async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MongoDB URI not set, please fix globalSetup.");
  }
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

afterEach(async () => {
  const collections = Object.values(mongoose.connection.collections);
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});
