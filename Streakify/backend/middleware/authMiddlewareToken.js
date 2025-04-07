const jwt = require("jsonwebtoken");
const config = require("config");

const authMiddlewareToken = (req, res, next) => {
  console.log("Middleware gestartet."); // Debug

  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader); // Debug

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("Authorization header fehlt oder ist ungültig");
      return res.status(401).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    console.log("JWT-Token:", token); // Debug

    const decoded = jwt.verify(token, config.get("session.tokenKey"));
    console.log("Decoded Token:", decoded); // Debug

    req.user = decoded.user; // Dekodierte User-Daten setzen
    next();
  } catch (err) {
    console.error("Token-Fehler:", err.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};


module.exports = { authMiddlewareToken }; 
