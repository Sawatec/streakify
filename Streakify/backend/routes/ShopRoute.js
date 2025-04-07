const express = require("express");
const { getShopItems, buyShopItem } = require("../services/ShopService");
const { authMiddlewareToken } = require("../middleware/authMiddlewareToken");
const shopRouter = express.Router();
const ShopItem = require("../models/ShopItemModel");
const ShopService = require('../services/ShopService');

// Middleware
shopRouter.use(authMiddlewareToken);

// Route: Alle verfügbaren Shop-Items abrufen
shopRouter.get("/", async (req, res) => {
  try {
    const userId = req.user.id; // Aktueller Benutzer

    console.log(`GET /api/shop wurde von User ${userId} aufgerufen`);

    // Shop-Items abrufen
    const items = await ShopService.getShopItems(userId);

    res.status(200).json(items);
  } catch (error) {
    console.error("Fehler beim Abrufen der Shop-Items:", error.message);
    res.status(500).json({ message: "Fehler beim Abrufen der Shop-Items." });
  }
});

// Route: Item kaufen
shopRouter.post("/buy", async (req, res) => {
  const { itemId } = req.body; // itemId wird benötigt
  const userId = req.user.id; // userId wird aus authMiddlewareToken extrahiert

  if (!itemId) {
    return res.status(400).json({ message: "itemId ist erforderlich." });
  }

  try {
    const result = await buyShopItem(userId, itemId);
    console.log(`User ${userId} hat Item ${itemId} erfolgreich gekauft.`);
    res.status(200).json(result);
  } catch (error) {
    console.error("Fehler beim Kauf eines Items:", error.message);
    res.status(400).json({ message: error.message });
  }
});

shopRouter.post('/purchase', async (req, res) => {
  const userId = req.user.id; // Benutzer-ID aus JWT
  const { itemId } = req.body;

  console.log("Empfangene Daten:", { userId, itemId }); // Logge die eingehenden Werte

  if (!itemId) {
    return res.status(400).json({ message: "itemId ist erforderlich." });
  }

  try {
    const { updatedPoints, updatedInventory } = await ShopService.buyShopItem(userId, itemId);
    console.log("Kauf erfolgreich:", { updatedPoints, updatedInventory }); // Logge die erfolgreichen Ergebnisse
    res.json({ updatedPoints, updatedInventory });
  } catch (error) {
    console.error("Fehler beim Kauf eines Shop-Items:", error);
    res.status(400).json({ message: error.message });
  }
});


// POST: Neues Item erstellen
shopRouter.post("/", authMiddlewareToken, async (req, res) => {
  const { name, price, imageUrl, description } = req.body;

  try {
    const newItem = await ShopItem.create({
      name,
      type: "companion", // Typ wird automatisch gesetzt
      price,
      imageUrl,
      description,
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Fehler beim Erstellen des Companions:", error);
    res.status(400).json({ message: "Fehler beim Erstellen des Companions." });
  }
});


module.exports = shopRouter;
