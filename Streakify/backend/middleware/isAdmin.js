const User = require("../models/UserModel");

async function isAdmin(req, res, next) {
  try {
    const userId = req.user?.id; // Benutzer-ID aus der Authentifizierungsmiddleware
    if (!userId) {
      return res.status(403).json({ error: "Zugriff verweigert: Keine Benutzer-ID gefunden." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Benutzer nicht gefunden." });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ error: "Zugriff verweigert: Nur Administratoren können Missionen erstellen." });
    }

    next(); // Weiter zur nächsten Middleware oder Route
  } catch (err) {
    res.status(500).json({ error: "Interner Serverfehler: " + err.message });
  }
}

module.exports = isAdmin;
