const express = require("express");
const passport = require("passport");
const router = express.Router();

require("../middleware/authGoogle");

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful login, redirect the user to the dashboard
    res.redirect("https://localhost:3000/dashboard");
  }
);

module.exports = router;
