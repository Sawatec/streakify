const express = require("express");
const Bcrypt = require("bcryptjs");
const upload = require("../middleware/uploadMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const Habit = require("../models/HabitModel");
const User = require("../models/UserModel");
const { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUserById, 
  deleteUserByID, 
  getAllUsernames, 
  getCurrentUser
} = require("../services/UserService");
const { authMiddlewareToken } = require("../middleware/authMiddlewareToken");
const mongoose = require("mongoose");
const ShopItem = require("../models/ShopItemModel");
const userRoute = express.Router();


userRoute.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Fehler beim Abrufen der Benutzer." });
  }
});

userRoute.get("/usernames", async (req, res) => {
  try {
    const usernames = await getAllUsernames();
    res.status(200).json(usernames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Fehler beim Abrufen der Benutzernamen." });
  }
});



userRoute.post("/", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({ error: "Fehler beim Erstellen des Benutzers." });
  }
});

userRoute.put("/", authMiddlewareToken, async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = Bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await updateUserById(req.user.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({ error: "Fehler beim Aktualisieren des Benutzers." });
  }
});

userRoute.delete("/:email", async (req, res) => {
  try {
    const deletedUser = await deleteUserByID(req.params.email);
    res.status(204).json(deletedUser);
  } catch (err) {
    console.error("Error:", err);
    res.status(404).json({ error: "Benutzer nicht gefunden." });
  }
});

userRoute.get("/inventory", authMiddlewareToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Benutzer abrufen und Inventory mit den vollständigen Daten populieren
    const user = await User.findById(userId).populate({
      path: "inventory.itemId",
      select: "name imageUrl", // Lade nur die benötigten Felder
    });

    if (!user) {
      return res.status(404).json({ error: "Benutzer nicht gefunden." });
    }

    console.log("Inventory des Benutzers:", user.inventory); // Debugging
    res.status(200).json({ inventory: user.inventory });
  } catch (error) {
    console.error("Fehler beim Abrufen des Inventars:", error.message);
    res.status(500).json({ error: "Interner Serverfehler." });
  }
});


// GET: Punkte des eingeloggten Users abrufen
userRoute.get("/points", authMiddlewareToken, async (req, res) => {
  console.log(JSON.stringify(ShopItem));
  console.log("GET /points wurde aufgerufen."); // Debug

  try {
    const userId = req.user.id;
    console.log("User ID:", userId); // Debug

    const user = await User.findById(userId);
    if (!user) {
      console.error("Benutzer nicht gefunden:", userId);
      return res.status(404).json({ message: "Benutzer nicht gefunden." });
    }

    console.log("Punkte des Benutzers:", user.points); // Debug
    res.status(200).json({ points: user.points });
  } catch (error) {
    console.error("Fehler beim Abrufen der Punkte:", error.message);
    res.status(500).json({ message: "Interner Serverfehler", error: error.message });
  }
});

userRoute.post("/points", authMiddlewareToken, async (req, res) => {
  try {
    const userId = req.user.id; // User-ID aus dem Token
    const { points } = req.body;

    if (typeof points !== "number") {
      return res.status(400).json({ message: "Points must be a number" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Punkte aktualisieren
    user.points = points;
    await user.save();

    res.status(200).json({ message: "Points updated successfully", points: user.points });
  } catch (error) {
    console.error("Error updating points:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// **Profilbild hochladen**
userRoute.put(
  "/upload-profile-picture/:userName",
  authMiddlewareToken,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Kein Bild hochgeladen." });
      }
      const userName = req.params.userName;
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(404).json({ error: "Benutzer nicht gefunden." });
      }
      const publicId = `user_${user.userName}`;
      cloudinary.uploader.upload_stream(
        { folder: "uploads", public_id: publicId, resource_type: "image" },
        async (error, result) => {
          if (error) {
            console.error("Fehler beim Cloudinary-Upload:", error);
            return res.status(500).json({ error: "Fehler beim Hochladen des Profilbilds." });
          }
          user.profilePicture = result.secure_url;
          await user.save();
          res.status(200).json({
            message: "Profilbild erfolgreich hochgeladen.",
            profilePictureUrl: result.secure_url,
            user,
          });
        }
      ).end(req.file.buffer);
    } catch (err) {
      console.error("Fehler beim Hochladen des Profilbilds:", err);
      res.status(500).json({ error: "Fehler beim Hochladen des Profilbilds." });
    }
  }
);

userRoute.post("/inventory", authMiddlewareToken, async (req, res) => {
  try {
    const userId = req.user.id; // User-ID aus dem Token
    const { itemId } = req.body; // Item-ID aus der Anfrage

    // Validiere die Item-ID
    if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Ungültige oder fehlende Item-ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    // Prüfen, ob das Inventory im User existiert und initialisieren, falls nicht vorhanden
    if (!Array.isArray(user.inventory)) {
      user.inventory = [];
    }

    // Prüfen, ob das Item bereits im Inventar ist
    const itemExists = user.inventory.some((inventoryItem) => 
      inventoryItem?.itemId?.toString() === itemId
    );
    if (itemExists) {
      return res.status(400).json({ message: "Item befindet sich bereits im Inventar" });
    }

    // Item zum Inventar hinzufügen
    user.inventory.push({ itemId });
    await user.save();

    res.status(201).json({ message: "Item erfolgreich zum Inventar hinzugefügt", inventory: user.inventory });
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Items zum Inventar:", error.message);
    res.status(500).json({ message: "Interner Serverfehler", error: error.message });
  }
});


userRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id); 
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

module.exports = userRoute;