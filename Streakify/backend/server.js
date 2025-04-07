const express = require("express");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const config = require("config");
const { initDb } = require("./database/db");
const loginRoute = require("./routes/LoginRoute");
const {
  registerRouter,
  verifyCodeRouter,
  resendVerificationCodeRouter,
} = require("../backend/routes/RegisterRoute");
const habitRoute = require("./routes/HabitRoute");
const verifyRoute = require("./routes/verifyRoute");
const userRoute = require("./routes/UserRoute");
const friendRequestRoute = require('./routes/FriendRequestRoute');
const shopRoute = require("./routes/ShopRoute"); 
const missionRoute = require("./routes/MissionRoute");
const userMissionRoutes = require("./routes/UserMissionRoute");
const googleRoute = require("./routes/googleRoute");
const friendRoute = require("./routes/FriendRoute");
const messageRoute = require("./routes/MessageRoute");
const app = express();

app.use(cors());

app.use(express.json());

const sessionConfig = config.get("session");
app.use(
  session({
    secret: sessionConfig.secret,
    resave: false,
    saveUninitialized: true,
    // Ändere zu true, wenn HTTPS aktiv ist
    cookie: { secure: false },
  })
);

initDb()
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Nur testen
/*
app.get("/", (req, res) => {
  res.send("<a href = '/auth/google'>Login with Google</a>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful login, redirect the user to the dashboard
    res.redirect("https://localhost:3000/dashboard");
  }
);
*/
app.use("/api/login", loginRoute);
app.use("/api/register", registerRouter);
app.use("/api/verify-email", verifyCodeRouter);
app.use("/", googleRoute);
app.use("/api/resend-verification-code", resendVerificationCodeRouter);
app.use("/api/habits", habitRoute);
app.use("/api/verify", verifyRoute);
app.use("/api/users", userRoute);
app.use('/api/friend-requests', friendRequestRoute);
app.use("/api/shop", shopRoute); 
app.use("/api/missions", missionRoute);
app.use("/api/user-missions", userMissionRoutes);
app.use("/api/friends", friendRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
