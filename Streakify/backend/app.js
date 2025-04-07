const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const loginRoute = require("./routes/LoginRoute");
const registerRoute = require("./routes/RegisterRoute");
const userRoute = require("./routes/UserRoute"); // Keine doppelte Registrierung
const habitRoute = require("./routes/HabitRoute");
const friendRequestRoute = require('./routes/FriendRequestRoute');
const missionRoute = require("./routes/MissionRoute");
const userMissionRoute = require("./routes/UserMissionRoute");

const app = express();
const friendRoute = require("./routes/FriendRoute");
const messageRoute = require("./routes/MessageRoute");
const shopRoute = require("./routes/ShopRoute");

// Middleware
app.use(cors());
app.use(morgan("dev")); // Logging
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Statische Dateien bereitstellen

// Routen
app.use("/uploads", express.static("uploads"));
app.use("/api/login", loginRoute); // Alle Anfragen, die mit /api/login beginnen, werden an loginRoute weitergeleitet
app.use("/api/register", registerRoute); // Alle Anfragen, die mit /api/register beginnen, werden an registerRoute weitergeleitet
app.use("/api/users", userRoute); // Alle Anfragen, die mit /api/users beginnen, werden an userRouter weitergeleitet
app.use("/api/habits", habitRoute); // Alle Anfragen, die mit /api/habits beginnen, werden an habitRouter weitergeleitet
app.use('/api/friend-requests', friendRequestRoute);
app.use("/api/missions", missionRoute);
app.use("/api/user-missions", userMissionRoute);
app.use('/api/friends', friendRoute);
app.use('/api/messages', messageRoute);
app.use('/api/shop', shopRoute);
// Fehlerbehandlung
app.use((req, res, next) => {
  const error = new Error("Route nicht gefunden");
  error.status = 404;
  next(error);
});

// Globale Fehlerbehandlung
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message || "Interner Serverfehler";
  const stack = process.env.NODE_ENV === "production" ? null : error.stack;

  res.status(statusCode).json({
    error: {
      message,
      stack,
    },
  });
});

module.exports = app;
